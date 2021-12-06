const { Router } = require('express');
const path = require('path');
const { unlink } = require('fs-extra');
const fs = require('fs-extra');
const router = Router();
const { isAuthenticated } = require("../helpers/auth");



// Models
const User = require("../models/User");
const { link } = require('fs');
const { url } = require('inspector');
const cloudinary = require('cloudinary');

router.get('/', isAuthenticated, async (req, res) => {
    res.render('index');
});

router.get('/about', isAuthenticated, (req, res) => {
    res.render('about');
});

module.exports = router;