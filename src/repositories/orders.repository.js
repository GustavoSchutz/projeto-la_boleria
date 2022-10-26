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

async function getOrdersByDate(date) {
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
          ON orders."cakeId" = cakes.id
	WHERE "createdAt"::date = $1;`,
    [date]
    );
}

async function getOrdersById(id) {
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
          ON orders."cakeId" = cakes.id
	WHERE orders.id = $1;`,
    [id]
    );
}

async function getOrdersByClientId(id) {
    return connection.query(
        `SELECT
            orders.id AS "orderId",
            cakes.name AS "cakeName",
            orders.quantity AS "quantity",
            TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH:MM') AS "createdAt",
            orders."totalPrice" AS "totalPrice"
        FROM orders
        join cakes on cakes.id = orders."cakeId"
        WHERE orders."clientId" = $1;`,
        [id]
    );
}

export { insertOrder, getOrders, getOrdersByDate, getOrdersById, getOrdersByClientId }