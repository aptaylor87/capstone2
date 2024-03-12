const crypto = require('crypto');
const axios = require('axios');
const { get } = require('https');


const SECRET_API_PRIVATE_KEY = "acf95fb90a0b3f733f802f5321656d6f51d1f6c7";
const SECRET_API_PUBLIC_KEY = "3c53fc3b517b663bf6aabdf7db6177f5";

const API_PRIVATE_KEY = process.env.API_PRIVATE_KEY || SECRET_API_PRIVATE_KEY;
const API_PUBLIC_KEY = process.env.API_PUBLIC_KEY || SECRET_API_PUBLIC_KEY;

const ts = Math.floor(new Date().getTime() / 1000).toString();
const hash = crypto.createHash('md5').update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).digest('hex');

function generateToken() {
    const ts = Math.floor(new Date().getTime() / 1000).toString();
    const hash = crypto.createHash('md5').update(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).digest('hex');
    const token = `&ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`;
    return token;
}

const base_url = "http://gateway.marvel.com/v1/public/";

async function getFromMarvel(resource, query='') {
    const queryURL = `${base_url}${resource}?${query}${generateToken()}`
    try {
        const response = await axios.get(queryURL);
        console.log(queryURL)
        console.log("response:", response.data.data.results);
    } catch (error) {
        // Handle error
        console.error('Error:', error);
    }
}

getFromMarvel('characters', 'offset=20')

// async function getCharacters() {
//     const query = `characters`
//     const queryURL = `${base_url}${query}?${generateToken()}`
//     console.log(queryURL)
//     try {
//         const response = await axios.get(queryURL);
//         console.log("response:", response.data.data.results);
//     } catch (error) {
//         // Handle error
//         console.error('Error:', error);
//       }
  
// }

// getCharacters();


