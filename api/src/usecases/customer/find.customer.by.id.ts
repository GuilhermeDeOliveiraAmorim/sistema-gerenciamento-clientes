import Notification from "../../@shared/notification";
import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";

export interface InputFindByIdCustomerDto {
  id: string;
}

export interface OutputFindByIdCustomerDto {
  customer: Customer | null;
}

export default class FindByIdCustomerUseCase implements SharedUseCaseInterface {
  private _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(
    input: InputFindByIdCustomerDto
  ): Promise<OutputFindByIdCustomerDto | Notification> {
    const notification = new Notification();

    try {
      const existingCustomer = await this._customerRepository.findById(
        input.id
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

      const output: OutputFindByIdCustomerDto = {
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
