const express = require('express');
const { clubController } = require('../../controllers/club.controller');
const { clubMiddleware } = require('../../middlewares/club.middleware');


const router = express.Router();

router.route('/:lat/:lng').get(clubMiddleware, clubController);

module.exports = router;
