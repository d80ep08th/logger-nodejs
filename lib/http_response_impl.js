// © 2016-2017 Resurface Labs LLC

/**
 * Mock response implementation.
 */
class HttpResponseImpl {

    constructor() {
        this._headers = {};
        Object.defineProperty(this, '_headers', {configurable: false, writable: false});
    }

    add_header(key, value) {
        if (typeof value !== 'undefined') {
            const existing = this._headers[key];
            if (typeof existing === 'undefined') {
                this._headers[key] = value;
            } else {
                this._headers[key] = `${existing},${value}`;
            }
        }
    }

    get headers() {
        return this._headers;
    }

    get statusCode() {
        return this._statusCode;
    }

    set statusCode(value) {
        this._statusCode = value;
    }

}

module.exports = HttpResponseImpl;