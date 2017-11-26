const {Readable} = require('stream');

const v8 = require('v8');

class V8 extends Readable {
  constructor() {
    super({objectMode: true});
  }

  _read() {
    const stats = v8.getHeapSpaceStatistics();
    this.push(stats);
  }
}

module.exports = V8;
