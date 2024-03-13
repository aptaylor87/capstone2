const bcrypt = require("bcrypt");

const db = require("../db.js");
const {BCRYPT_WORK_FACTOR} = require("../config");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM characters");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM comics");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  

  await db.query(`
    INSERT INTO characters(id, name, description, image_url, image_type)
    VALUES ('1', 'C1', 'Desc1', 'http://c1.img', 'jpeg'),
           ('2', 'C2', 'Desc2', 'http://c2.img', 'jpeg') ,
           ('3', 'C3', 'Desc3', 'http://c3.img', 'jpeg')`);

  await db.query(`
    INSERT INTO comics(id, name, description, image_url, image_type, marvel_url)
    VALUES ('1', 'C1', 'Desc1', 'http://c1.img', 'jpeg', 'http://c1.com'),
            ('2', 'C2', 'Desc2', 'http://c2.img', 'jpeg', 'http://c2.com') ,
            ('3', 'C3', 'Desc3', 'http://c3.img', 'jpeg', 'http://c3.com')`);

  await db.query(
    `
            INSERT INTO users(username, password, first_name, last_name, email)
            VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
                   ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
            RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(`
    INSERT INTO reading_lists(username, comic_id)
    VALUES ('u1', 1)`);
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
