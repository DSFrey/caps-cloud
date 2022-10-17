'use strict';

require('dotenv').config();
const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const app = Consumer.create({
  queueUrl: `${process.env.SQS_URL}/driver-queue.fifo`,
  handleMessage: async (data) => {
    let order = JSON.parse(JSON.parse(data.Body).Message);
    console.log(order);

    let payload = {
      id: order.orderID,
      body: JSON.stringify(`Order delivered for ${order.customer}`),
    }

    const producer = Producer.create({
      queueUrl: `${process.env.SQS_URL}/${order.vendorID}`,
      region: 'us-east-2',
    });

    let response = await producer.send(payload);
    console.log(response);
  }
});

app.start();
