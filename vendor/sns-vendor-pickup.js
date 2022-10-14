'use strict';

const Chance = require('chance');
const chance = new Chance();

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const sns = new AWS.SNS();