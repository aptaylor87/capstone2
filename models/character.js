"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");


/** Related functions for characters. */

class Character {
  /** Create a character (from data), update db, return new character data.
   * 
   * This model isn't used in a route, its just used to seed the database.
   *
   * data should be { id, name, description, imageURL, imageType }
   *
   * Returns { id, name, description, imageURL, imageType }
   *
   * Throws BadRequestError if character already in database.
   * */

  static async create({id, name, description, imageURL, imageType}) {
    const duplicateCheck = await db.query(
      `SELECT id
         FROM characters
         WHERE id = $1`,
      [id]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(
        `Duplicate character: ID - ${id} Name - ${name}`
      );

    const result = await db.query(
      `INSERT INTO characters
             (id, name, description, image_url, image_type)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, description, image_url as "imageURL", image_type as "imageType"`,
      [id, name, description, imageURL, imageType]
    );
    const character = result.rows[0];

    return character;
  }

  /** Find all characters.
   *
   * Returns [{ id, name, description, imageURL, imageType }, ...]
   * */

  static async findAll() {
    const result = await db.query(
        `SELECT id,
                name,
                description,
                image_url AS "imageURL",
                image_type AS "imageType"
        FROM characters`
    );

    return result.rows;
  }

  /** Given an id, return data about a character.
   *
   * Returns { id, name, description, imageURL, imageType } 
   *
   * Throws NotFoundError if character not found.
   **/
  static async get(id) {
    const result = await db.query(
        `SELECT id,
                name,
                description,
                image_url AS "imageURL",
                image_type AS "imageType"
        FROM characters
        WHERE id =$1`,
        [id],
    )

    const character = result.rows[0];
    if (!character) throw new NotFoundError(`No character: ID${id}`);
    return character;
  }


}

module.exports = Character;
