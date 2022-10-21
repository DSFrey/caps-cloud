'use strict';

const Vendor = require("./lib/vendor");

let jcNickels = new Vendor('jc-nickels');

setInterval(() => jcNickels.createOrder(), 10000);
