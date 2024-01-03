const express = require("express");
// const Joi = require("joi");
const { get, erase, add } = require("../db/generyFunction");

const commentRoute = express.Router();

commentRoute.get("/:postId", async (req, res) => {
    try {
        let postId = req.params.postId;
        const comments = await get.comments(parseInt(postId));
        console.log("try get comment route");
        console.log(comments);
        res.json(comments);
    } catch (error) {
        console.log("catch");
        console.log(error);
        res.status(500).send();
    }
});
commentRoute.get("/", async (req, res) => {
    try {
        const comment = await get.comment();
        console.log("try get comment route");
        console.log(comment);
        res.json(comment);
    } catch (error) {
        console.log("catch");
        console.log(error);
        res.status(500).send();
    }
});

commentRoute.delete("/:id", async (req, res) => {
    try {
        const comment = await erase.comment(req.params.id);
        if (comment) {
            res.json(comment);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
});

commentRoute.post("/", async (req, res) => {
    try {
        const { name, content, mail, postId } = req.body
        const comment = await add.comment(name, content, mail, postId);
        console.log(name, content, mail);
        if (comment) {
            res.status(201).json(comment);
            return;
        }
        res.status(400).send();
    } catch (error) {
        res.status(500).send();
    }
});

commentRoute.put("/:id", async (req, res) => {
    try {
        const todos = await edit.todos(req.params.id);
        if (todos) {
            res.json(todos);
            return;
        }
        res.status(404).send();
    } catch (error) {
        res.status(500).send();
    }
}
);
module.exports = commentRoute;
