"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = decode;

var _libqp = _interopRequireDefault(require("libqp"));

var _charsetDecode = _interopRequireDefault(require("./charsetDecode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * NodeJS library to interact with the MailHog API.
 * https://github.com/blueimp/mailhog-node
 *
 * Copyright 2016, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */
// Decodes the given string using the given encoding.
// encoding can be base64|quoted-printable|7bit|8bit|binary
// 7bit|8bit|binary will be returned as is.
function decode(str, encoding, charset) {
  switch ((encoding || '').toLowerCase()) {
    case 'base64':
      return (0, _charsetDecode.default)(Buffer.from(str, 'base64'), charset);

    case 'quoted-printable':
      return (0, _charsetDecode.default)(_libqp.default.decode(str), charset);

    default:
      return str;
  }
}