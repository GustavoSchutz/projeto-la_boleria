CREATE TABLE cakes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price INTEGER NOT NULL,
	CHECK (price > 0),
	image VARCHAR(255) NOT NULL,
	description TEXT NOT NULL 
);

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	adress VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	"clientId" INTEGER REFERENCES "clients"("id"),
	"cakeId" INTEGER REFERENCES "cakes"("id"),
	quantity INTEGER NOT NULL,
	CHECK (quantity > 0),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"totalPrice" INTEGER NOT NULL,
	CHECK ("totalPrice" > 0)
);

ALTER TABLE cakes ADD UNIQUE (name);

ALTER TABLE clients 
RENAME COLUMN adress TO address;