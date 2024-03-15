const crypto = require("crypto");
const axios = require("axios");
const Character = require("../models/character");
const Comic = require("../models/comic")

const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY;
const API_PUBLIC_KEY = process.env.API_PUBLIC_KEY;

// This is structure of the marvel API token as described by their documentation

const ts = Math.floor(new Date().getTime() / 1000).toString();
const hash = crypto
  .createHash("md5")
  .update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
  .digest("hex");

// This function generates the token which needs to be added as a parameter on each  request. Each request must have a unique
// token which is wy the timestamp is used.
function generateToken() {
  const ts = Math.floor(new Date().getTime() / 1000).toString();
  const hash = crypto
    .createHash("md5")
    .update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY)
    .digest("hex");
  const token = `&ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
  return token;
}

const baseUrl = "http://gateway.marvel.com/v1/public/";

/*
 * This is a generic function that will help build basic queries to endpoints on the marvel api.
 */

async function getFromMarvel(resource, query = "") {
  const queryURL = `${baseUrl}${resource}?${query}${generateToken()}`;
  try {
    const response = await axios.get(queryURL);
    console.log(queryURL);
    console.log("response:", response.data.data.results);
  } catch (error) {
    // Handle error
    console.error("Error:", error);
  }
}

/* This function is used in the comics/search/ route to make requests to the marvel API.
 *
 *It takes the IDs from two different characters and returns a list of comics featuring both.
 *
 */

async function searchForComics(charOneId, charTwoId, offset = 0) {
  const queryURL = `${baseUrl}characters/${charOneId}/comics?sharedAppearances=${charTwoId}&offset=${offset}${generateToken()}`;
  console.log(`********${queryURL}************`);
  try {
    const response = await axios.get(queryURL);
    let results = response.data.data.results;
    let total = response.data.data["total"];
    let comics = [];
    results.forEach((obj) => {
      comics.push({
        id: obj.id,
        name: obj["title"],
        description: obj.description,
        imageURL: obj["thumbnail"]["path"],
        imageType: obj["thumbnail"]["extension"],
      });
    });
    let final = {comics: comics};
    console.log(final);
    return final;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
  }
}

/*
 * This function needs to be run once when setting up the application to seed the database with characters.
 * It loops through the paginated responses from the API and works with the Character model class to
 * add those characters to the db.
 */

async function getAllCharactersForDB() {
  let offset = 0;
  while (offset <= 1560) {
    let query = `characters?offset=${offset}`;
    let queryURL = `${baseUrl}${query}${generateToken()}`;
    let response = await axios.get(queryURL);
    let data = response.data.data;
    let reschars = data.results;
    reschars.forEach((char) => {
      Character.create({
        id: char["id"],
        name: char["name"],
        description: char["description"],
        imageURL: char["thumbnail"]["path"],
        imageType: char["thumbnail"]["extension"],
      });
      console.log(`Added ${char["name"]}`);
    });
    offset = offset + 20;
  }
}

async function getComic(id) {
  let query = `comics/${id}`;
  let queryURL = `${baseUrl}${query}?${generateToken()}`;
  let response = await axios.get(queryURL);
  let data = response.data.data;
 
  let rescomic = data.results;
  
  let final = await Comic.create({
    id: rescomic[0]["id"],
    name: rescomic[0]["title"],
    description: rescomic[0]["description"],
      imageURL: rescomic[0]["thumbnail"]["path"],
      imageType: rescomic[0]["thumbnail"]["extension"]
    })
    return final;
}



module.exports = {
  searchForComics,
  getAllCharactersForDB,
  getComic
};
