const express = require("express");
const router = express.Router();

const config = require("../config");
const documentStorage = require("../storage/documentStorage");

router.post("/", (request, response) => {
    const text = request.body;
    console.log("Received post to create new document: " + text);

    response.setHeader("Content-Type", "application/json");

    const maxLength = config.document.maxLength;
    if(text.length < maxLength) {
        const key = documentStorage.save(text);
        response.status(201).send(JSON.stringify({key}));
    } else
        response.status(406).send(JSON.stringify({message: `Text to long (max. ${maxLength})`}));
});

router.get("/:key", (request, response) => {
    const key = request.params.key;
    console.log("Received post to get document: " + key);

    response.setHeader("Content-Type", "application/json");

    const text = documentStorage.load(key);

    if(text == null)
        response.status(404).send(JSON.stringify({message: "No document found"}));
    else
        response.send(JSON.stringify({text}));
});

module.exports = router;