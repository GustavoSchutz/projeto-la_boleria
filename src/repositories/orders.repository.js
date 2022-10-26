import { connection } from '../../db/db.js';

async function insertOrder({ clientId, cakeId, quantity, totalPrice }) {
    return connection.query(
        `INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") 
        VALUES ($1, $2, $3, $4);`,
        [clientId, cakeId, quantity, totalPrice]
    );
}

async function getOrders() {
    return connection.query(
        `SELECT
        orders.id AS "orderId",
		orders.quantity AS "quantity",
		orders."totalPrice" AS "totalPrice",
		TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH:MM') AS "createdAt",
		json_build_object('id', clients.id, 'name', clients.name, 'address', clients.address, 'phone', clients.phone) AS clients,
		json_build_object('id', cakes.id, 'name', cakes.name, 'price', cakes.price, 'image', cakes.image, 'description', cakes.description) AS cakes
      FROM orders
        JOIN clients
          ON orders."clientId" = clients.id
        JOIN cakes
          ON orders."cakeId" = cakes.id;`
    );
}

export { insertOrder, getOrders }