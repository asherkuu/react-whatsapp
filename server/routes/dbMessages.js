const router = require("express").Router();

let MessageContent = require("../models/dbMessages.model");

// create
router.route("/new").post((req, res) => {
    const dbMessage = req.body;

    MessageContent.create(dbMessage, (err, data) => {
        if (err) res.status(500).send(err);
        else res.status(201).send(data);
    });
});

// read
router.route("/sync").get((req, res) => {
    MessageContent.find()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error : " + err));
});

// delete all
router.route("/").delete((req, res) => {
    MessageContent.deleteMany().then(() => res.send("All deleted"));
});

module.exports = router;
