import { AxiosInstance } from "axios";
import { CustomerGateway } from "../../domain/customer.gateway";
import { Customer } from "../../domain/customer";

export class CustomerHttpGateway implements CustomerGateway {
  constructor(private http: AxiosInstance) {}

  async create(
    name: string,
    email: string,
    x_coordinate: number,
    y_coordinate: number
  ): Promise<Customer> {
    const input = {
      name: name,
      email: email,
      x_coordinate: x_coordinate,
      y_coordinate: y_coordinate,
    };

    const customer = await this.http.post("/customer", input);

    const newCustomer = new Customer({
      _id: customer.data.id,
      _name: customer.data.name,
      _email: customer.data.email,
      _phone: customer.data.phone,
      _coordinates: customer.data.coordinates,
    });

    return newCustomer;
  }

  async findById(id: string): Promise<Customer> {
    const input = {
      id: id,
    };

    const customer = await this.http.get(`/customer/id/${input.id}`);

    const foundCustomer = new Customer({
      _id: customer.data.id,
      _name: customer.data.name,
      _email: customer.data.email,
      _phone: customer.data.phone,
      _coordinates: customer.data.coordinates,
    });

    return foundCustomer;
  }

  async findByEmail(email: string): Promise<Customer> {
    const input = {
      email: email,
    };

    const customer = await this.http.get(`/customer/email/${input.email}`);

    const foundCustomer = new Customer({
      _id: customer.data.id,
      _name: customer.data.name,
      _email: customer.data.email,
      _phone: customer.data.phone,
      _coordinates: customer.data.coordinates,
    });

    return foundCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await this.http.get(`/customer`);

    console.log(customers);

    const findedCustomers: Customer[] = [];

    customers.data.customers.map((customer: Customer) => {
        findedCustomers.push(customer);
    });

    return findedCustomers;
  }

  async calculateRoute(): Promise<Customer[]> {
    const customers = await this.http.get(`/customer/calculate-route`);

    const findedCustomers: Customer[] = [];

    customers.data.exams.map((customer: Customer) => {
        findedCustomers.push(customer);
    });

    return findedCustomers;
  }
}
