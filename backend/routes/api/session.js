const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const htmlPage = path.join(__dirname, '../../../frontend/html/login.html');

  res.sendFile(htmlPage);
});

module.exports = router;