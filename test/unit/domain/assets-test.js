'use strict';

const assert = require('chai').assert;
const rewire = require('rewire');

const BASE_LIB = ('../../../lib/');
const asset = rewire(BASE_LIB + 'domain/assets');

describe('Unit assets tests', () => {
    const ASSET_ID = '123';
    let MOCK_ADD_ASSET_CALLED;
    let MOCK_DELETE_ASSET_CALLED;
    let MOCK_FIND_ASSET_CALLED;
    let MOCK_GET_LIST_CALLED;

    beforeEach(() => {
        MOCK_ADD_ASSET_CALLED = false;
        MOCK_DELETE_ASSET_CALLED = false;
        MOCK_FIND_ASSET_CALLED = false;
        MOCK_GET_LIST_CALLED = false;
        const mock = {
            addAsset: function (itemID, asset) {
                MOCK_ADD_ASSET_CALLED = true;
                return (ASSET_ID === itemID) ? ASSET_ID : null;
            },
            deleteAsset: function (itemID) {
                MOCK_DELETE_ASSET_CALLED = true;
                return (ASSET_ID === itemID) ? ASSET_ID : null;
            },
            findAssetByID: function (itemID) {
                MOCK_FIND_ASSET_CALLED = true;
                return (ASSET_ID === itemID) ? ASSET_ID : null;
            },
            getItemsListData: function () {
                MOCK_GET_LIST_CALLED = true;
            }
        };
        asset.__set__("database", mock);
    });

    describe('find asset', () => {
        it('returns if asset exists', () => {
            const result = asset.existsAsset("1");
            assert.isFalse(result);
        });

        it('returns assets list', () => {
            assert.isFalse(MOCK_GET_LIST_CALLED);

            asset.getAssets();

            assert.isTrue(MOCK_GET_LIST_CALLED);
        });

        it('returns asset by id', () => {
            const result = asset.getAsset("123");
            assert.isTrue(MOCK_FIND_ASSET_CALLED);
            assert.equal(ASSET_ID, result);
        });
    });

    describe('add asset', () => {
        it('returns asset id when asset is not in list ', () => {
            const result = asset.addAsset("1", {});
            assert.isTrue(MOCK_FIND_ASSET_CALLED);
            assert.isTrue(MOCK_ADD_ASSET_CALLED);
        });

        it('returns error when try insert duplicate asset', () => {
            try {
                asset.addAsset(ASSET_ID, {});
            } catch (err) {
                assert.equal("Asset duplicated", err.message);
                return;
            }
            assert.fail();
        });
    });

    describe('update asset', () => {
        it('calls update asset in database', () => {
            assert.isFalse(MOCK_ADD_ASSET_CALLED);

            asset.updateAsset(ASSET_ID, {});

            assert.isTrue(MOCK_ADD_ASSET_CALLED);
        });

        it('returns error when try update unfounded asset', () => {
            try {
                asset.updateAsset("1", {});
            } catch (err) {
                assert.equal("Asset not exists", err.message);
                return;
            }
            assert.fail();
        });
    });

    describe('delete asset', () => {
        it('calls delete asset in database', () => {
            assert.isFalse(MOCK_DELETE_ASSET_CALLED);

            asset.deleteAsset(ASSET_ID);

            assert.isTrue(MOCK_DELETE_ASSET_CALLED);
        });

        it('returns error when try remove an asset not found', () => {
            try {
                asset.deleteAsset("1");
            } catch (err) {
                assert.equal("Asset not found", err.message);
                return;
            }
            assert.fail();
        });
    });
});