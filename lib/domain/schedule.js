'use strict';

const ROOT_PATH = process.cwd();

const database = require(ROOT_PATH + '/lib/infrastructure/database');
const logger = require(ROOT_PATH + '/lib/infrastructure/logger');

function existsSchedule(itemID) {
    return !!database.findScheduleByID(itemID);
}

function getSchedules() {
    return database.getSchedulesListData();
}

function getSchedule(itemID) {
    return database.findScheduleByID(itemID);
}

function addSchedule(itemID, schedule) {
    if(!!database.findScheduleByID(itemID)){
        logger.warn(`Was trying to include a duplicated schedule. Schedule ID: ${itemID}`);

        throw new Error("Schedule duplicated");
    }
    database.addSchedule(itemID, schedule);
}

function updateSchedule(itemID, schedule) {
    if(!database.findScheduleByID(itemID)){
        logger.warn("Was trying to edit an inexistent schedule.");

        throw new Error("Schedule not exists");
    }
    database.addSchedule(itemID, schedule);
}

function deleteSchedule(itemID) {
    if(!database.findScheduleByID(itemID)){
        logger.warn(`Was trying to delete schedule not found. Schedule ID: ${itemID}`);

        throw new Error("Schedule not found");
    }
    database.deleteSchedule(itemID);
}

module.exports = {
    existsSchedule,
    getSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getSchedule
};
