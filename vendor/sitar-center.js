'use strict';

const Vendor = require("./lib/vendor");

let sitarCenter = new Vendor('sitar-center');

setInterval(() => sitarCenter.createOrder(), 10000);
