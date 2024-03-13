"use strict";

const request = require("supertest");

const app = require("../app");

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


/************************************** GET /characters */

describe("GET /characters", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/characters");
    expect(resp.body).toEqual({
      characters:
          [
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
          ],
    });
  });

});

/************************************** GET /characters/:id */

describe("GET /characters/:id", function () {
  test("works", async function () {
    const resp = await request(app).get(`/characters/1`);
    expect(resp.body).toEqual({
      character: {
        id: 1,
        name: "C1",
        description: "Desc1",
        imageURL: "http://c1.img",
        imageType: "jpeg",
      },
    });
  });

  

  test("not found for no such character", async function () {
    const resp = await request(app).get(`/characters/5`);
    expect(resp.statusCode).toEqual(404);
  });
});


