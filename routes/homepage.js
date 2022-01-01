const { Router } = require("express");
const router = Router();

const { check } = require('express-validator');
const { validateInput } = require('../middleware/validate-input');

const { getUsage, getUsers, addNote } = require("../controllers/homepage");

router.get("/usage/", getUsage);
router.get("/users/", getUsers);

router.post('/note',[
    check('userId', 'User Id is required').isString(),
    check('note', 'Note is required').not().isEmpty(),
    validateInput
], addNote);

module.exports = router;
