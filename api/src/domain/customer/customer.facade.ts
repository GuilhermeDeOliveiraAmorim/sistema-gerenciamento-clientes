import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import {
  InputFindByEmailCustomerDto,
  OutputFindByEmailCustomerDto,
} from "../../usecases/customer/find.customer.by.email";
import CustomerFacadeInterface, {
  InputCreateCustomerFacadeDto,
  InputFindByEmailCustomerFacadeDto,
  InputFindByIdCustomerFacadeDto,
  OutputCreateCustomerFacadeDto,
  OutputFindAllCustomersFacadeDto,
  OutputFindByEmailCustomerFacadeDto,
  OutputFindByIdCustomerFacadeDto,
} from "./customer.facade.interface";

export interface UseCaseProps {
  createUseCase: SharedUseCaseInterface;
  findAllUseCase: SharedUseCaseInterface;
  findByEmailUseCase: SharedUseCaseInterface;
  findByIdUseCase: SharedUseCaseInterface;
}

export default class CustomerFacade implements CustomerFacadeInterface {
  private _createUseCase: SharedUseCaseInterface;
  private _findAllUseCase: SharedUseCaseInterface;
  private _findByEmailUseCase: SharedUseCaseInterface;
  private _findByIdUseCase: SharedUseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._createUseCase = useCaseProps.createUseCase;
    this._findAllUseCase = useCaseProps.findAllUseCase;
    this._findByEmailUseCase = useCaseProps.findByEmailUseCase;
    this._findByIdUseCase = useCaseProps.findByIdUseCase;
  }

  createCustomer(
    input: InputCreateCustomerFacadeDto
  ): Promise<OutputCreateCustomerFacadeDto> {
    return this._createUseCase.execute(input);
  }

  findAllCustomers(): Promise<OutputFindAllCustomersFacadeDto> {
    return this._findAllUseCase.execute({});
  }

  findCustomerByEmail(
    input: InputFindByEmailCustomerFacadeDto
  ): Promise<OutputFindByEmailCustomerFacadeDto> {
    return this._findByEmailUseCase.execute(input);
  }

  findCustomerById(
    input: InputFindByIdCustomerFacadeDto
  ): Promise<OutputFindByIdCustomerFacadeDto> {
    return this._findByIdUseCase.execute(input);
  }
}
