"use strict";

const db = require("../db.js");
const {BadRequestError, NotFoundError} = require("../expressError");
const Comic = require("./comic.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** create */

describe("create", function () {
    const newComic = {
      id: 100,
      name: "New",
      description: "New Description",
      imageURL: "http://new.img",
      imageType: "jpeg",
      marvelURL: "http://new.com"
    };
  
    test("works", async function () {
      let comic = await Comic.create(newComic);
      expect(comic).toEqual(newComic);
  
      const result = await db.query(
        `SELECT id, name, description, image_url, image_type, marvel_url
               FROM comics
               WHERE id = '100'`
      );
      expect(result.rows).toEqual([
        {
          id: 100,
          name: "New",
          description: "New Description",
          image_url: "http://new.img",
          image_type: "jpeg",
          marvel_url: "http://new.com"
        },
      ]);
    });
  
    test("bad request with dupe", async function () {
      try {
        await Comic.create(newComic);
        await Comic.create(newComic);
        fail();
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy();
      }
    });
  });

/************************************** getComics */

describe("get", function () {
    test("works", async function () {
      let comic = await Comic.getComics('u1');
      expect(comic).toEqual(
        [{
            id: 1,
            name: "C1",
            description: "Desc1",
            imageURL: "http://c1.img",
            imageType: "jpeg",
            marvelURL: "http://c1.com",
            dateRead: null
          }],
      );
    });
  
    test("not found if no such user", async function () {
      try {
        await Comic.getComics('nope');
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
