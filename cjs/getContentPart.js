"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContentPart;

var _decode = _interopRequireDefault(require("./decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Returns the content part matching the given content-type.
// * mail is an object returned by MailHog for an email message
// * typeRegExp is a regular expression matched against the parts' content-type
// Returns an object with type (content-type) and content (decoded) properties.
function getContentPart(mail, typeRegExp) {
  var parts = mail.MIME ? [mail.Content].concat(_toConsumableArray(mail.MIME.Parts)) : [mail.Content];
  var matchingPart = parts.find(function (part) {
    var type = (part.Headers['Content-Type'] || '').toString();
    return typeRegExp.test(type);
  });

  if (!matchingPart) {
    return undefined;
  }

  var type = (matchingPart.Headers['Content-Type'] || '').toString();
  var matches = /\bcharset=([\w_-]+)(?:;|$)/.exec(type);
  var charset = matches ? matches[1] : undefined;
  var content = (0, _decode.default)(matchingPart.Body, (matchingPart.Headers['Content-Transfer-Encoding'] || '').toString(), charset);
  return {
    type: type,
    content: content
  };
}