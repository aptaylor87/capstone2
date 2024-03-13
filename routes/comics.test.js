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

/************************************** GET /characters/:id */

describe("GET /comics/:username", function () {
    test("works", async function () {
      const resp = await request(app).get(`/comics/u1`);
      expect(resp.body).toEqual({
        comics: [{
            id: 1,
            name: "C1",
            description: "Desc1",
            imageURL: "http://c1.img",
            imageType: "jpeg",
            marvelURL: "http://c1.com",
            dateRead: null
          }],
      });
    });
  
    
  
    test("not found for no such user", async function () {
      const resp = await request(app).get(`/comics/nope`);
      expect(resp.statusCode).toEqual(404);
    });
  });