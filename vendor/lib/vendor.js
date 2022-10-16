'use strict';

const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });
const sns = new AWS.SNS();
    console.log(process.env.SNS_ARN);

class Vendor {
  constructor(vendorName) {
    this.vendorName = vendorName;
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
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
}

module.exports = Vendor;