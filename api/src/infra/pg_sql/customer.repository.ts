import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";
import { Pool } from "pg";
import Email from "../../domain/customer/value_objects/email";
import Coordinates from "../../domain/customer/value_objects/coordinates";
import Phone from "../../domain/customer/value_objects/phone";

export default class CustomerRepository implements CustomerRepositoryInterface {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "seu-usuario",
      host: "seu-host",
      database: "sua-database",
      password: "sua-senha",
      port: 5432,
    });
  }

  async create(customer: Customer): Promise<void> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const insertQuery = `
        INSERT INTO customers (name, email, phone, x_coordinate, y_coordinate)
        VALUES ($1, $2, $3, $4, $5)
      `;

      const values = [
        customer.name,
        customer.email.value,
        customer.phone.value,
        customer.coordinates.x,
        customer.coordinates.y,
      ];

      await client.query(insertQuery, values);

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(customerId: string): Promise<Customer | null> {
    const client = await this.pool.connect();

    try {
      const query = `
        SELECT id, name, email, phone, x_coordinate, y_coordinate
        FROM customers
        WHERE id = $1
      `;

      const result = await client.query(query, [customerId]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      const customer = new Customer({
        id: row.id,
        name: row.name,
        email: new Email(row.email),
        phone: new Phone(row.phone),
        coordinates: new Coordinates(row.x_coordinate, row.y_coordinate),
      });

      return customer;
    } finally {
      client.release();
    }
  }

  async findByEmail(customerEmail: string): Promise<Customer | null> {
    const client = await this.pool.connect();

    try {
      const query = `
        SELECT id, name, email, phone, x_coordinate, y_coordinate
        FROM customers
        WHERE email = $1
      `;

      const result = await client.query(query, [customerEmail]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];

      const customer = new Customer({
        id: row.id,
        name: row.name,
        email: new Email(row.email),
        phone: new Phone(row.phone),
        coordinates: new Coordinates(row.x_coordinate, row.y_coordinate),
      });

      return customer;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<Customer[]> {
    const client = await this.pool.connect();

    try {
      const query = `
        SELECT id, name, email, phone, x_coordinate, y_coordinate
        FROM customers
      `;

      const result = await client.query(query);

      const customers: Customer[] = result.rows.map((row) => {
        return new Customer({
          id: row.id,
          name: row.name,
          email: new Email(row.email),
          phone: new Phone(row.phone),
          coordinates: new Coordinates(row.x_coordinate, row.y_coordinate),
        });
      });

      return customers;
    } finally {
      client.release();
    }
  }
}
