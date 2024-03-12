"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");

/** Related functions for comics. */

class comics {
  /** Create a comic (from data), update db, return new comic data.
   *
   * data should be { id, name, description, imageURL, imageType, marvelURL }
   *
   * Returns { id, name, description, imageURL, imageType, marvelURL }
   *
   * Throws BadRequestError if comic already in database.
   * */

  static async create({id, name, description, imageURL, imageType, marvelURL}) {
    const duplicateCheck = await db.query(
      `SELECT id
             FROM comics
             WHERE id = $1`,
      [id]
    );

    if (duplicateCheck.rows[0])
      throw new BadRequestError(
        `Duplicate comic: ID - ${id} Name - ${name}`
      );

    const result = await db.query(
      `INSERT INTO comics
                 (id, name, description, image_url, image_type, marvel_url)
                 VALUES ($1, $2, $3, $4, $5)
                 RETURNING id, name, description, image_url as "imageURL", image_type as "imageType", marvel_url as "marvelURL`,
      [id, name, description, imageURL, imageType, marvelURL]
    );
    const comic = result.rows[0];

    return comic;
  }

  /** Get all comics from reading list for user.
   *
   * Returns [{ id, name, description, imageURL, imageType }, ...]
   * */

  
}
