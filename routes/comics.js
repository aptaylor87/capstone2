"use strict";

/** Routes for jobs. */

const express = require("express");
const Comic = require("../models/comic");
const { searchForComics } = require("../helpers/marvelAPI");


const router = new express.Router();



/** GET /[username] =>
 *   { comics: [ { id, name, description, imageURL, imageType, marvelURL, date_read  }, ...] }
 *
 * Authorization required: none
 */

router.get("/:username", async function (req, res, next) {
    try {
        const comics = await Comic.getComics(req.params.username);
        return res.json({ comics });
      } catch (err) {
        return next(err);
      }
});

/** GET /search/:charOneId/:charTwoId/:offset/:total => { comics }
 *
 * Returns { total: total, comics: [ { id, name, description, imageURL, imageType, marvelURL, date_read  }, ...] }
 *   
 *  This route makes a request to the Marvel API, it does not pull any data from the application's database.
 *
 * Authorization required: none
 */

router.get("/search/:charOneId/:charTwoId/:offset", async function (req, res, next) {
  try {
    const response = await searchForComics(req.params.charOneId, req.params.charTwoId, req.params.offset);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
});





module.exports = router;
