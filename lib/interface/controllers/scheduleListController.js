'use strict';

const ROOT_PATH = process.cwd();

const uuidv4 = require('uuid/v4');

const logger = require(ROOT_PATH + '/lib/infrastructure/logger');
const schedule = require(ROOT_PATH + '/lib/domain/schedule');

const get = (req, res) => {
  if (req.params.scheduleId) {
    const itemID = req.params.scheduleId;
    const result = schedule.getSchedule(itemID);

    logger.info("Return schedule.");

    res.status(200).send(result);
  } else {
    const result = schedule.getSchedules();

    logger.info("Return schedule list.");

    res.status(200).send(result);
  }
};

const post = (req, res) => {
  try {
    const data = req.body;
    const result = schedule.addSchedule(uuidv4(), data);

    logger.info(`Received a schedule to include in list. Schedule: ${data}.`);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const put = (req, res) => {
  try {
    const data = req.body;
    const itemID = req.params.scheduleId;

    const result = schedule.updateSchedule(itemID, data);

    logger.info(`Received a schedule to update in list. Schedule ID: ${itemID}.`);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const del = (req, res) => {
  try {
    const itemID = req.params.scheduleId;
    const result = schedule.deleteSchedule(itemID);

    logger.info(`Deleted schedule from the list. Schedule ID: ${itemID}.`);

    res.status(200).send(result);
  } catch (err) {
    res.status(403).send();
  }
};

module.exports = {
  get,
  post,
  put,
  del
};