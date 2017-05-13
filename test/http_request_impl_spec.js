// © 2016-2017 Resurface Labs LLC

const chai = require('chai');
chai.use(require('chai-as-promised'));
chai.use(require('chai-string'));
const expect = chai.expect;

const HttpRequestImpl = require('../lib/all').HttpRequestImpl;

/**
 * Tests against mock request implementation.
 */
describe('HttpRequestImpl', () => {

    it('uses headers', () => {
        const key = '2345';
        const key2 = 'fish';
        const val = 'u-turn';
        const val2 = 'swell';

        const r = new HttpRequestImpl();
        expect(Object.keys(r.headers).length).to.equal(0);
        expect(r.headers[key]).not.to.exist;

        r.headers[key] = val;
        expect(Object.keys(r.headers).length).to.equal(1);
        expect(r.headers[key]).to.equal(val);

        r.headers[key] = val2;
        expect(Object.keys(r.headers).length).to.equal(1);
        expect(r.headers[key]).to.equal(val2);

        r.add_header(key, val);
        expect(Object.keys(r.headers).length).to.equal(1);
        expect(r.headers[key]).to.equal(`${val2}, ${val}`);

        r.headers[key2] = val2;
        expect(Object.keys(r.headers).length).to.equal(2);
        expect(r.headers[key2]).to.equal(val2);
        expect(r.headers[key2.toUpperCase()]).not.to.exist;
    });

    it('uses hostname', () => {
        const val = '!HOSTNAME!';
        const r = new HttpRequestImpl();
        r.hostname = val;
        expect(r.hostname).to.equal(val);
    });

    it('uses method', () => {
        const val = '!METHOD!';
        const r = new HttpRequestImpl();
        r.method = val;
        expect(r.method).to.equal(val);
    });

    it('uses protocol', () => {
        const val = '!PROTOCOL!';
        const r = new HttpRequestImpl();
        r.protocol = val;
        expect(r.protocol).to.equal(val);
    });

    it('uses url', () => {
        const val = '/index.html?boo=yah';
        const r = new HttpRequestImpl();
        r.url = val;
        expect(r.url).to.equal(val);
    });

});
