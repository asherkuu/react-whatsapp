const router = require("express").Router();

let User = require("../models/user.model");

// create
router.route("/new").post((req, res) => {
    const userInfo = req.body;

    User.create(userInfo, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

// select
router.route("/").get((req, res) => {
    User.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;
