import Notification from "../../@shared/notification";
import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";

export interface InputFindByEmailCustomerDto {
  email: string;
}

export interface OutputFindByEmailCustomerDto {
  customer: Customer | null;
}

export default class FindByEmailCustomerUseCase implements SharedUseCaseInterface {
  private _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(
    input: InputFindByEmailCustomerDto
  ): Promise<OutputFindByEmailCustomerDto | Notification> {
    const notification = new Notification();

    try {
      const existingCustomer = await this._customerRepository.findByEmail(
        input.email
      );

      if (!existingCustomer) {
        notification.addMessage({
          title: "Customer Do Not Exists",
          detail: `O cliente não existe.`,
          type: "https://httpwg.org/specs/rfc9110.html#status.400",
          status: 400,
        });

        return notification;
      }

      const output: OutputFindByEmailCustomerDto = {
        customer: existingCustomer,
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

      return notification;
    }
  }
}
