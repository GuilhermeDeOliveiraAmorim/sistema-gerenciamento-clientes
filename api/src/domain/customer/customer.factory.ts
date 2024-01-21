import CustomerRepository from "../../infra/pg_sql/customer.repository";
import CalculateEfficientRouteUseCase from "../../usecases/customer/calculate.efficient.route";
import CreateCustomerUseCase from "../../usecases/customer/create.customer";
import FindAllCustomersUseCase from "../../usecases/customer/find.all.customers";
import FindByEmailCustomerUseCase from "../../usecases/customer/find.customer.by.email";
import FindByIdCustomerUseCase from "../../usecases/customer/find.customer.by.id";
import CustomerFacade from "./customer.facade";

export default class CustomerFactory {
  static create() {
    const customerRepository = new CustomerRepository();

    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      customerRepository
    );
    const findCustomerByIdUseCase = new FindByIdCustomerUseCase(
      customerRepository
    );
    const findCustomerByEmailUseCase = new FindByEmailCustomerUseCase(
      customerRepository
    );
    const calculateRouteUseCase = new CalculateEfficientRouteUseCase(
      customerRepository
    );

    const userFacade = new CustomerFacade({
      createUseCase: createCustomerUseCase,
      findAllUseCase: findAllCustomersUseCase,
      findByIdUseCase: findCustomerByIdUseCase,
      findByEmailUseCase: findCustomerByEmailUseCase,
      calculateRouteUseCase: calculateRouteUseCase,
    });

    return userFacade;
  }
}
