import Notification from "../../@shared/notification";
import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";

export interface OutputFindAllCustomersDto {
  customers: Customer[];
}

export default class FindAllCustomersUseCase implements SharedUseCaseInterface {
  private _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(): Promise<OutputFindAllCustomersDto | Notification> {
    const notification = new Notification();

    try {
      const customers = await this._customerRepository.findAll();

      if (!customers) {
        notification.addMessage({
          title: "Customers Not Found",
          detail: `Clientes não encontrados.`,
          type: "https://httpwg.org/specs/rfc9110.html#status.400",
          status: 400,
        });

        return notification;
      }

      const output: OutputFindAllCustomersDto = {
        customers: customers,
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
