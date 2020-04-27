'use strict';

const ROOT_PATH = process.cwd();

const uuidv4 = require('uuid/v4');

const logger = require(ROOT_PATH + '/lib/infrastructure/logger');
const assets = require(ROOT_PATH + '/lib/domain/assets');

const get = (req, res) => {
  if (req.params.assetId) {
    const itemID = req.params.assetId;
    const result = assets.getAsset(itemID);

    logger.info("Return asset.");

    res.status(200).send(result);
  } else {
    const result = assets.getAssets();

    logger.info("Return assets list.");

    res.status(200).send(result);
  }
};

const post = (req, res) => {
  try {
    const data = req.body;
    const result = assets.addAsset(uuidv4(), data);

    logger.info(`Received a asset to include in items list. Asset: ${data}.`);

    res.status(201).send(result);
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
};

const put = (req, res) => {
  try {
    const data = req.body;
    const itemID = req.params.assetId;

    const result = assets.updateAsset(itemID, data);

    logger.info(`Received a asset to update in items list. Asset ID: ${itemID}.`);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const del = (req, res) => {
  try {
    const itemID = req.params.assetId;
    const result = assets.deleteAsset(itemID);

    logger.info(`Deleted asset from the list. Asset ID: ${itemID}.`);

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