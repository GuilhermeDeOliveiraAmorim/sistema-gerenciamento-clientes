import Notification from "../../@shared/notification";
import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";
import Coordinates from "../../domain/customer/value_objects/coordinates";
import Email from "../../domain/customer/value_objects/email";
import Phone from "../../domain/customer/value_objects/phone";

export interface InputCreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface OutputCreateCustomerDto {
  customer: Customer;
}

export default class CreateCustomerUseCase implements SharedUseCaseInterface {
  private _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(
    input: InputCreateCustomerDto
  ): Promise<OutputCreateCustomerDto | Notification> {
    const notification = new Notification();

    try {
      const email = new Email(input.email);

      if (email.notification.hasMessages()) {
        notification.addMessages(email.notification.getMessages());
      }

      const phone = new Phone(input.phone);

      if (phone.notification.hasMessages()) {
        notification.addMessages(phone.notification.getMessages());
      }

      const coordinates = new Coordinates(input.xCoordinate, input.yCoordinate);

      if (coordinates.notification.hasMessages()) {
        notification.addMessages(coordinates.notification.getMessages());
      }

      const existingCustomer = await this._customerRepository.findByEmail(
        input.email
      );

      if (existingCustomer) {
        notification.addMessage({
          title: "Customer Already Exists",
          detail: `O cliente com o e-mail '${input.email}' já está cadastrado.`,
          type: "https://httpwg.org/specs/rfc9110.html#status.400",
          status: 400,
        });
      }

      if (notification.hasMessages()) {
        return notification;
      }

      const customer = new Customer({
        name: input.name,
        email: new Email(input.email),
        phone: new Phone(input.phone),
        coordinates: new Coordinates(input.xCoordinate, input.yCoordinate),
      });

      await this._customerRepository.create(customer);

      const output: OutputCreateCustomerDto = {
        customer,
      };

      return output;
    } catch (error) {
      const errorMessage = (error as Error).message;

      notification.addMessage({
        title: "General Error",
        detail: errorMessage,
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
        status: 500,
      });
    }

    return notification;
  }
}
