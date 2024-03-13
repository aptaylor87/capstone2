"use strict";

/** Routes for companies. */

const express = require("express");

const Character = require("../models/character");
const router = new express.Router();

/** GET /  =>
 *   { characters: [ { id, name, description, imageURL, imageType  }, ...] }
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
    try {
        const characters = await Character.findAll();
        return res.json({ characters });
      } catch (err) {
        return next(err);
      }
});

/** GET /[id]  =>  { character }
 *
 *  Character is { id, name, description, imageURL, imageType }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const character = await Character.get(req.params.id);
    return res.json({ character });
  } catch (err) {
    return next(err);
  }
});




module.exports = router;
