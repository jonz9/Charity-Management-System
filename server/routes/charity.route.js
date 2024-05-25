const express = require('express');
const router = express.Router();
const (getCharity) = require('../controllers');

router.get('/', getCharity);