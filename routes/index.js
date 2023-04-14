const express = require('express'),
    router = express.Router(),
    userRouter = require('./user'),
    emailRouter = require('./email')

router.use('/user', userRouter);
router.use('/email', emailRouter);

module.exports = router
