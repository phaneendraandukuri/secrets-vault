const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const { addNewSecret, getAllSecretsByUser, getSecretById, updateSecretById, deleteSecretById } = require('../controllers/secrets.js');

router.post('/', addNewSecret);

router.get('/', getAllSecretsByUser);

router.get("/:id", validateObjectId, getSecretById);

router.put('/:id', validateObjectId, updateSecretById);

router.delete('/:id', validateObjectId, deleteSecretById);

module.exports = router;