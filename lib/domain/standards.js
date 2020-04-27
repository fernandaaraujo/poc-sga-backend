'use strict';

const ROOT_PATH = process.cwd();

const database = require(ROOT_PATH + '/lib/infrastructure/database');
const logger = require(ROOT_PATH + '/lib/infrastructure/logger');

function getStandardsGNA() {
    return database.getStandardsFromGNA();
}

function getStandardsCA() {
    return database.getStandardsFromCA();
}

function updateStandardGNA(itemID, rule) {
    database.updateStandardGNA(itemID, rule);
}

function updateStandardAC(itemID, rule) {
    database.updateStandardAC(itemID, rule);
}

module.exports = {
    getStandardsGNA,
    getStandardsCA,
    updateStandardGNA,
    updateStandardAC,
};