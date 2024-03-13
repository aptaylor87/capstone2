"use strict";

/** Routes for users. */

const express = require("express");
const {ensureCorrectUser} = require("../middleware/auth");
const User = require("../models/user");

const router = express.Router();


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, email, comics }
 *   where comics is { id }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get(
  "/:username",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({user});
    } catch (err) {
      return next(err);
    }
  }
);


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

router.delete(
  "/:username",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({deleted: req.params.username});
    } catch (err) {
      return next(err);
    }
  }
);

/** POST /[username]/comics/[id]  { state } => { readingList }
 *
 * Returns {"added": ComicId}
 *
 * Authorization required: same-user-as-:username
 * */

router.post(
  "/:username/comics/:id",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const comicID = +req.params.id;
      await User.addToReadingList(req.params.username, comicID);
      return res.json({added: comicID});
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
