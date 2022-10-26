import { connection } from '../../db/db.js';

async function insertClient({ name, address, phone }) {
    return connection.query(
        `INSERT INTO clients (name, address, phone) 
        VALUES ($1, $2, $3)`,
        [name, address, phone]
    );
}


async function getClientById(clientId) {
    const result = await connection.query(
        `SELECT * FROM clients WHERE id = $1;`,
        [clientId]
    );

    console.log(result);

    return result;
}

export { insertClient, getClientById };