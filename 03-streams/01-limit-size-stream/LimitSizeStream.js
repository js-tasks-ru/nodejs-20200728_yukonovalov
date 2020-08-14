const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.transfered = 0;
  }

  _transform(chunk, encoding, callback) {
    if (this.transfered + chunk.length > this.limit) {
      this.destroy(new LimitExceededError);
    } else {
      this.push(chunk);

      this.transfered += chunk.length;
    }

    callback();
  }
}

module.exports = LimitSizeStream;
