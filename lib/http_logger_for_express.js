// © 2016-2017 Resurface Labs LLC

const HttpLogger = require('./http_logger');

/**
 * Express middleware for HTTP usage logging.
 */
class HttpLoggerForExpress {

    static add(app, options = {}) {
        new HttpLoggerForExpress(app, options);
    }

    constructor(app, options = {}) {
        this._logger = new HttpLogger(options);
        Object.defineProperty(this, '_logger', {configurable: false, writable: false});
        app.use(this.handle.bind(this));
    }

    handle(request, response, next) {
        let body = undefined;
        const original_send = response.send;
        response.send = function sendAndLog(response_body) {
            original_send.call(this, response_body);
            body = response_body;
        };

        next();

        const status = response.statusCode;
        if (status < 300 || status === 302) {
            const headers = ('headers' in response) ? response.headers : response._headers;
            if (typeof headers !== 'undefined') {
                if (HttpLogger.isStringContentType(headers['content-type'])) {
                    if (body instanceof Buffer) {
                        this._logger.log(request, undefined, response, body.toString());
                    } else {
                        this._logger.log(request, undefined, response, JSON.stringify(body));
                    }
                }
            }
        }
    };

}

module.exports = HttpLoggerForExpress;