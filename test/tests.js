const assert = require('assert').strict;

const ms2kw = require('../ms2kw.js')
const kw2ms = require('../kw2ms.js')

describe('周数与时间戳的互相转换', function () {

    let years = Array.from(new Array(100), (v, k) => (k + 2000).toString())
    let kws = ['KW01/1', 'KW52/5']

    years.forEach(year => {
        kws.forEach(kw => {
            it(`${year}-${kw}`, function () {
                assert.deepEqual(
                    ms2kw(kw2ms(year, kw)),
                    kw
                );
            })
        })
    })
})