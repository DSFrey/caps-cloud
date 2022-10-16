'use strict';

const Vendor = require("./lib/vendor");

let sitarCenter = new Vendor('Sitar Center');

setInterval(() => sitarCenter.createOrder(), 10000);
