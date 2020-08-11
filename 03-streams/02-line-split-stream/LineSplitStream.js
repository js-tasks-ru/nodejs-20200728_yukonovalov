const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.storage = '';
  }

  _transform(chunk, encoding, callback) {
    const string = this.storage + chunk.toString()
    const index = string.indexOf(os.EOL);

    if (index !== -1) {
      this.push(string.slice(0, index))

      this.storage = string.slice(index + 1);
    } else {
      this.storage = string;
    }

    callback();
  }

  _flush(callback) {
    this.storage
      .split(os.EOL)
      .forEach((line) => {
        this.push(line);
      });

    callback();
  }
}

module.exports = LineSplitStream;
