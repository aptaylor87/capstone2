"use strict";

const db = require("../db.js");
const {BadRequestError, NotFoundError} = require("../expressError");
const Character = require("./character.js");
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
  const newCharacter = {
    id: 100,
    name: "New",
    description: "New Description",
    imageURL: "http://new.img",
    imageType: "jpeg",
  };

  test("works", async function () {
    let character = await Character.create(newCharacter);
    expect(character).toEqual(newCharacter);

    const result = await db.query(
      `SELECT id, name, description, image_url, image_type
             FROM characters
             WHERE id = '100'`
    );
    expect(result.rows).toEqual([
      {
        id: 100,
        name: "New",
        description: "New Description",
        image_url: "http://new.img",
        image_type: "jpeg",
      },
    ]);
  });

  test("bad request with dupe", async function () {
    try {
      await Character.create(newCharacter);
      await Character.create(newCharacter);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: all", async function () {
      let characters = await Character.findAll();
      expect(characters).toEqual([
        {
            id: 1,
            name: "C1",
            description: "Desc1",
            imageURL: "http://c1.img",
            imageType: "jpeg",
        },
        {
            id: 2,
            name: "C2",
            description: "Desc2",
            imageURL: "http://c2.img",
            imageType: "jpeg",
        },
        {
            id: 3,
            name: "C3",
            description: "Desc3",
            imageURL: "http://c3.img",
            imageType: "jpeg",
        },
      ]);
    });
  });

/************************************** get */

describe("get", function () {
    test("works", async function () {
      let character = await Character.get(1);
      expect(character).toEqual(
        {
            id: 1,
            name: "C1",
            description: "Desc1",
            imageURL: "http://c1.img",
            imageType: "jpeg",
        },
      );
    });
  
    test("not found if no such character", async function () {
      try {
        await Character.get(0);
        fail();
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
      }
    });
  });
