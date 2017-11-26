const V8 = require('..');

const v8 = new V8();

setInterval(() => {
  console.log(v8.read());
}, 1000);
