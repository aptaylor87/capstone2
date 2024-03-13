"use strict";

const db = require("../db.js");
const Character = require("../models/character");
const Comic = require("../models/comic");
const User = require("../models/user");
const {createToken} = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM characters");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM comics");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await Character.create({
    id: 1,
    name: "C1",
    description: "Desc1",
    imageURL: "http://c1.img",
    imageType: "jpeg",
  });
  await Character.create({
    id: 2,
    name: "C2",
    description: "Desc2",
    imageURL: "http://c2.img",
    imageType: "jpeg",
  });
  await Character.create({
    id: 3,
    name: "C3",
    description: "Desc3",
    imageURL: "http://c3.img",
    imageType: "jpeg",
  });

  await Comic.create({
    id: 1,
    name: "C1",
    description: "Desc1",
    imageURL: "http://c1.img",
    imageType: "jpeg",
    marvelURL: "http://c1.com",
  });

  await Comic.create({
    id: 2,
    name: "C2",
    description: "Desc2",
    imageURL: "http://c2.img",
    imageType: "jpeg",
    marvelURL: "http://c2.com",
  });

  await Comic.create({
    id: 3,
    name: "C3",
    description: "Desc3",
    imageURL: "http://c3.img",
    imageType: "jpeg",
    marvelURL: "http://c3.com",
  });

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  await User.addToReadingList("u1", 1);
  await User.addToReadingList("u2", 2);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({username: "u1"});
const u2Token = createToken({username: "u2"});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
