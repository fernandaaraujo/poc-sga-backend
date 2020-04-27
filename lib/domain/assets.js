'use strict';

const ROOT_PATH = process.cwd();

const database = require(ROOT_PATH + '/lib/infrastructure/database');
const logger = require(ROOT_PATH + '/lib/infrastructure/logger');

function existsAsset(itemID) {
    return !!database.findAssetByID(itemID);
}

function getAssets() {
    return database.getItemsListData();
}

function getAsset(itemID) {
    return database.findAssetByID(itemID);
}

function addAsset(itemID, asset) {
    if(!!database.findAssetByID(itemID)){
        logger.warn(`Was trying to include a duplicated asset. Asset ID: ${itemID}`);

        throw new Error("Asset duplicated");
    }
    database.addAsset(itemID, asset);
}

function updateAsset(itemID, asset) {
    if(!database.findAssetByID(itemID)){
        logger.warn("Was trying to edit an inexistent asset.");

        throw new Error("Asset not exists");
    }
    database.addAsset(itemID, asset);
}

function deleteAsset(itemID) {
    if(!database.findAssetByID(itemID)){
        logger.warn(`Was trying to delete asset not found. Asset ID: ${itemID}`);

        throw new Error("Asset not found");
    }
    database.deleteAsset(itemID);
}

module.exports = {
    existsAsset,
    addAsset,
    updateAsset,
    deleteAsset,
    getAssets,
    getAsset
};
