"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = charsetDecode;

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

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
// Decode the given buffer with the given charset to a JavaScript string.
// If no charset is given, decodes using an utf8 charset.
function charsetDecode(buffer, charset) {
  if (!charset || /utf-?8/i.test(charset)) {
    return buffer.toString();
  }

  return _iconvLite.default.decode(buffer, charset);
}