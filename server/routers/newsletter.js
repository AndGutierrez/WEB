const express = require('express');
const NewsletterController = require('../controllers/newsletter');

const api = express.Router();

api.post("/subscribe-newsletter", NewsletterController.suscribeNewsletter);

module.exports = api;