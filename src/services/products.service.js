import {mssql} from '../db/database.db.js'

export async function insertProduct(product) {
    try {
        const request = new mssql.Request();

        const query = ` INSERT INTO products (name, description, price, created_at) VALUES(@val1, @val2, @val3, @val4)`
        request.input('val1', product.name);
        request.input('val2', product.description)
        request.input('val3', product.price)
        request.input('val4', product.created_at)
        const result = await request.query(query);
        console.log('insert data result => ', result)
        return result
    } catch(err) {
        console.log('Error in insertion -> ', err)
    }
}

export async function getProducts() {
    try {
        const result = new mssql.Request().query(`SELECT * FROM products`)
        console.log('result ===> ', result)
        return result;
    } catch(err) {
        console.log('Error in get products =>' , err)
    }
}

export async function getProductsById(id) {
    try {
        const query = `SELECT * FROM products WHERE id = @id`
        const request = new mssql.Request()
        request.input('id', id);
        const result = await request.query(query)
        console.log('result ===> ', result)
        return result;
    } catch(err) {
        console.log('Error in get products =>' , err)
    }
}


export async function deleteProduct(id) {
    try {
        const query = `DELETE FROM products where id=@val1`
        const request = new mssql.Request();
        request.input('val1', id)
        const result = await request.query(query);
        console.log('result ===> ', result)
        return result;
    } catch(err) {
        console.log('Error in delete products =>' , err)
    }
}

export async function updateProduct(id, updateData) {
    try {
        const query = `UPDATE products SET name = @val1, description = @val2, price = @val3, created_at = @val4 WHERE id = @val5`
        const request = new mssql.Request();
        request.input('val1', updateData.name)
        request.input('val2', updateData.description)
        request.input('val3', updateData.price)
        request.input('val4', updateData.created_at)
        request.input('val5', id)
        const result = await request.query(query);
        console.log('result ===> ', result)
        return result;
    } catch(err) {
        console.log('Error in update products =>' , err)
    }
}

// CREATE TABLE products
// 	(
// 	id int IDENTITY(1,1) NOT NULL PRIMARY KEY,
// 	name varchar(50) NOT NULL,
// 	description text NOT NULL,
// 	price decimal(10, 2) NOT NULL,
// 	created_at datetime NOT NULL
// 	);

