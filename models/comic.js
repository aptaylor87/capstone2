"use strict";

const db = require("../db");
const {BadRequestError, NotFoundError} = require("../expressError");

/** Related functions for comics. */

class Comic {
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
      throw new BadRequestError(`Duplicate comic: ID - ${id} Name - ${name}`);

    const result = await db.query(
      `INSERT INTO comics
                 (id, name, description, image_url, image_type, marvel_url)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING id, name, description, image_url as "imageURL", image_type as "imageType", marvel_url as "marvelURL"`,
      [id, name, description, imageURL, imageType, marvelURL]
    );
    const comic = result.rows[0];

    return comic;
  }

  /** Get all comics from reading list for user.
   *
   * Returns [{ id, name, description, imageURL, imageType, marvelURL, date_read  }, ...]
   * */

  static async getComics(username) {
    const userCheck = await db.query(
      `SELECT username
               FROM users
               WHERE username = $1`,
      [username]
    );
    const user = userCheck.rows[0];
    if (!user) {
      throw new NotFoundError(`No user: ${username}`);
    }

    const results = await db.query(
      `SELECT c.id, c.name, c.description, c.image_url AS "imageURL", c.image_type AS "imageType", c.marvel_url as "marvelURL", rl.date_read AS "dateRead"
            FROM comics AS c
            INNER JOIN reading_lists AS rl ON c.id = rl.comic_id
        WHERE rl.username = $1`,
      [username]
    );
    const comics = results.rows;

    return comics;
  }
}

module.exports = Comic;
