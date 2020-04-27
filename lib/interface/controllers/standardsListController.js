'use strict';

const ROOT_PATH = process.cwd();

const logger = require(ROOT_PATH + '/lib/infrastructure/logger');
const standards = require(ROOT_PATH + '/lib/domain/standards');

const get = (req, res) => {
  if (req.url === '/standards/gna') {
    const result = standards.getStandardsGNA();

    logger.info("Return GNA list.");

    res.status(200).send(result);
  } else {
    const result = standards.getStandardsCA();

    logger.info("Return AC list.");

    res.status(200).send(result);
  }
};

const put = (req, res) => {
  try {
    if (req.url === '/standards/gna') {
      const data = req.body;
      const itemID = req.params.ruleId;

      const result = standards.updateStandardGNA(itemID, data);

      logger.info(`Received a standard to update in GNA list. Rule ID: ${itemID}.`);

      res.status(201).send(result);
    } else {
      const data = req.body;
      const itemID = req.params.ruleId;

      const result = standards.updateStandardAC(itemID, data);

      logger.info(`Received a standard to update in AC list. Rule ID: ${itemID}.`);

      res.status(201).send(result);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  get,
  put
};