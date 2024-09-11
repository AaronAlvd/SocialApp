const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get('/restore-user', (req, res) => { res.json(req.user)});


module.exports = router;