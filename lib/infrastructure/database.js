'use strict';

const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const ROOT_PATH = process.cwd();

const config = require(ROOT_PATH + '/lib/infrastructure/config');

const dbConfig = config.get('db');
const db = new JsonDB(new Config(dbConfig.name, dbConfig.saveOnPush, dbConfig.humanReadable, dbConfig.separator));

function findInList (itemsList, itemID) {
    return itemsList &&
            itemsList[itemID] ? itemsList[itemID] : null;
};

function getItemsListData() {
    return db.getData("/").itemsList;
}

function getSchedulesListData() {
    return db.getData("/").scheduleList;
}

const findAssetByID = (itemID) => {
    const itemsList = getItemsListData();

    return findInList(itemsList, itemID);
};

const addAsset = (itemID, asset) => {
    db.push(`/itemsList/${itemID}`, asset);
};

const deleteAsset = (itemID) => {
    db.delete(`/itemsList/${itemID}`);
};

const findScheduleByID = (itemID) => {
    const itemsList = getSchedulesListData();

    return findInList(itemsList, itemID);
};

const addSchedule = (itemID, schedule) => {
    db.push(`/scheduleList/${itemID}`, schedule);
};

const deleteSchedule = (itemID) => {
    db.delete(`/scheduleList/${itemID}`);
};

function getStandardsFromGNA() {
    return db.getData("/").standardsGNAList;
}

function getStandardsFromCA() {
    return db.getData("/").standardsCAList;
}

function updateStandardGNA(itemID, rule) {
    db.push(`/standardsGNAList/${itemID}`, rule);
}

function updateStandardAC(itemID, rule) {
    db.push(`/standardsCAList/${itemID}`, rule);
}

module.exports =
{
    findInList,
    getItemsListData,
    findAssetByID,
    addAsset,
    deleteAsset,
    findScheduleByID,
    addSchedule,
    deleteSchedule,
    getSchedulesListData,
    getStandardsFromGNA,
    getStandardsFromCA,
    updateStandardGNA,
    updateStandardAC
};
