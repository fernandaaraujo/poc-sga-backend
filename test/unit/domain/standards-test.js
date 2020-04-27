'use strict';

const assert = require('chai').assert;
const rewire = require('rewire');

const BASE_LIB = ('../../../lib/');
const standards = rewire(BASE_LIB + 'domain/standards');

describe('Unit standards tests', () => {
    const STANDARD_SGA_ID = '123';
    const STANDARD_CA_ID = '456';
    let MOCK_UPDATE_STANDARD_SGA_CALLED;
    let MOCK_UPDATE_STANDARD_CA_CALLED;

    beforeEach(() => {
        MOCK_UPDATE_STANDARD_SGA_CALLED = false;
        MOCK_UPDATE_STANDARD_CA_CALLED = false;
        const mock = {
            updateStandardGNA: function (itemID, rule) {
                MOCK_UPDATE_STANDARD_SGA_CALLED = true;
            },
            updateStandardAC: function (itemID, rule) {
                MOCK_UPDATE_STANDARD_CA_CALLED = true;
            }
        };
        standards.__set__("database", mock);
    });

    describe('update SGA standard', () => {
        it('calls fupdate sga rule in database', () => {
            assert.isFalse(MOCK_UPDATE_STANDARD_SGA_CALLED);

            standards.updateStandardGNA(STANDARD_SGA_ID, {});

            assert.isTrue(MOCK_UPDATE_STANDARD_SGA_CALLED);
        });
    });

    describe('update CA standard', () => {
        it('calls update cs rule in database', () => {
            assert.isFalse(MOCK_UPDATE_STANDARD_CA_CALLED);

            standards.updateStandardAC(STANDARD_CA_ID, {});

            assert.isTrue(MOCK_UPDATE_STANDARD_CA_CALLED);
        });
    });
});