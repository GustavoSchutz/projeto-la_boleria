import { connection } from '../../db/db.js';

async function insertOrder({ clientId, cakeId, quantity, totalPrice }) {
    return connection.query(
        `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") 
        VALUES ($1, $2, $3, $4);`,
        [clientId, cakeId, quantity, totalPrice]
    );
}

export { insertOrder }