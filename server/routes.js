const express = require('express');
const router = express.Router();
const { Category, Problem } = require("../models");

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;