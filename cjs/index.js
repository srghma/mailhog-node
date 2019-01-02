"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mkClient;

var _requestPromiseNative = _interopRequireDefault(require("request-promise-native"));

var _getContentPart = _interopRequireDefault(require("./getContentPart"));

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
function mkClient() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var baseUrl = options.baseUrl;
  return {
    // Sends a search request to the MailHog API.
    // Returns a promise that resolves with a list of email objects.
    // * query is the search query string.
    // * kind can be from|to|containing, defaults to "containing"
    // * start defines the start index of the search (default: 0)
    // * limit defines the max number of results (default: 50)
    search: function search(query, kind, start, limit) {
      var query_ = encodeURIComponent(query);
      var kind_ = kind || 'containing';
      var url = "".concat(baseUrl, "/api/v2/search?kind=").concat(kind_, "&query=").concat(query_);
      if (start) url += "&start=".concat(start);
      if (limit) url += "&limit=".concat(limit);
      return (0, _requestPromiseNative.default)(url, {
        json: true
      });
    },
    // Returns the text content part of the given email object.
    // * mail is an object returned by MailHog for an email message
    getText: function getText(mail) {
      return (0, _getContentPart.default)(mail, /^text\/plain($|;)/i);
    },
    // Returns the HTML content part of the given email object.
    // * mail is an object returned by MailHog for an email message
    getHTML: function getHTML(mail) {
      return (0, _getContentPart.default)(mail, /^text\/html($|;)/i);
    },
    // Retrieves the latest message content for the given query.
    // Returns a promise that resolves with the email content as result.
    // * query is the search query string
    // * plainText (boolean) defines if text (true) or HTML (false) is returned
    // * kind can be from|to|containing, defaults to "to"
    // Returns HTML unless plainText is true or there is no HTML content
    getLatest: function getLatest(query, plainText, kind) {
      var _this = this;

      var kind_ = kind || 'to';
      return this.search(query, kind_, 0, 1).then(function (response) {
        if (!response.count) {
          return undefined;
        }

        var mail = response.items[0];

        if (plainText) {
          return _this.getText(mail);
        }

        return _this.getHTML(mail) || _this.getText(mail);
      });
    },
    // Deletes all emails
    deleteAll: function deleteAll() {
      var url = "".concat(baseUrl, "/api/v1/messages");
      return _requestPromiseNative.default.delete(url, {
        json: true
      });
    },
    // Gets all emails
    getAll: function getAll() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9999;
      var url = "".concat(baseUrl, "/api/v2/messages?start=").concat(start, "&limit=").concat(limit);
      return (0, _requestPromiseNative.default)(url, {
        json: true
      });
    }
  };
}