import { connection } from '../../db/db.js';

async function getCakeByName(name) {
    const result = await connection.query(
        `SELECT * FROM cakes WHERE name = $1;`,
        [name]
    );

    return result;
}

async function insertCake({ name, price, image, description }) {
    return connection.query(
        `INSERT INTO cakes (name, price, image, description) 
        VALUES ($1, $2, $3, $4)`,
        [name, price, image, description]
    );
}

export { getCakeByName, insertCake };