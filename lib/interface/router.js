'use strict';

const express = require('express');
const router = new express.Router();

const assetController = require('./controllers/assetsListController');
const scheduleController = require('./controllers/scheduleListController');
const standardsController = require('./controllers/standardsListController');

router.get('/assets/:assetId?', assetController.get);
router.post('/assets', assetController.post);
router.put('/assets/:assetId', assetController.put);
router.delete('/assets/:assetId', assetController.del);

router.get('/schedule/:scheduleId?', scheduleController.get);
router.post('/schedule', scheduleController.post);
router.put('/schedule/:scheduleId', scheduleController.put);
router.delete('/schedule/:scheduleId', scheduleController.del);

router.get('/standards/gna', standardsController.get);
router.get('/standards/ac', standardsController.get);
router.put('/standards/gna/:ruleId', standardsController.put);
router.put('/standards/ac/:ruleId', standardsController.put);

module.exports = router;
