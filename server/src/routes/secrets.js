const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const { addNewSecret, getAllSecretsByUser, getSecretById, updateSecretById, deleteSecretById } = require('../controllers/secrets.js');

router.get('/', getAllSecretsByUser);
router.get("/:id", validateObjectId, getSecretById);

router.post('/', addNewSecret);

router.put('/:id', validateObjectId, updateSecretById);

router.delete('/:id', validateObjectId, deleteSecretById);

module.exports = router;