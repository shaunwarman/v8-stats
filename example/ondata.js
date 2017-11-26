const V8 = require('..');

const v8 = new V8();

v8.on('data', data => {
  console.log(data);
});

v8.pause();

setTimeout(() => {
  v8.resume();
}, 5000);
