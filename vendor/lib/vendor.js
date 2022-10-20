'use strict';

const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const sns = new AWS.SNS();
const { Consumer } = require('sqs-consumer');


class Vendor {
  constructor(vendorName) {
    this.vendorName = vendorName;
    const sqs = Consumer.create({
      queueUrl: `${process.env.SQS_URL}/${vendorName}`,
      handleMessage: async (data) => console.log(JSON.parse(data.Body)),
    });
    sqs.start();
  }
  createOrder() {
    let order = {
      orderID: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
      vendorID: this.vendorName,
    }
    let payload = {
      Message: JSON.stringify(order),
      TopicArn: `${process.env.SNS_ARN}:pickup.fifo`,
      MessageGroupId: 'pickup',
      MessageDeduplicationId: chance.guid(),
    }
    sns.publish(payload).promise()
    .then(data => console.log(order.customer, data))
    .catch(error => console.log(error))
  }
}

module.exports = Vendor;