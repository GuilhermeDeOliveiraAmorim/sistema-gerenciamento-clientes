import { Customer } from "../domain/customer";

export interface CustomerGateway {
  create(
    name: string,
    email: string,
    phone: string,
    x_coordinate: number,
    y_coordinate: number
  ): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  calculateRoute(): Promise<Customer[]>;
}
