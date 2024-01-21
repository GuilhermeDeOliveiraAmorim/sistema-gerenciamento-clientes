import { SharedUseCaseInterface } from "../../@shared/shared.usecase.interface";
import CustomerFacadeInterface, {
  InputCreateCustomerFacadeDto,
  InputFindByEmailCustomerFacadeDto,
  InputFindByIdCustomerFacadeDto,
  OutputCalculateCoordinatesFacadeDto,
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
  calculateRouteUseCase: SharedUseCaseInterface;
}

export default class CustomerFacade implements CustomerFacadeInterface {
  private _createUseCase: SharedUseCaseInterface;
  private _findAllUseCase: SharedUseCaseInterface;
  private _findByEmailUseCase: SharedUseCaseInterface;
  private _findByIdUseCase: SharedUseCaseInterface;
  private _calculateRouteUseCase: SharedUseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._createUseCase = useCaseProps.createUseCase;
    this._findAllUseCase = useCaseProps.findAllUseCase;
    this._findByEmailUseCase = useCaseProps.findByEmailUseCase;
    this._findByIdUseCase = useCaseProps.findByIdUseCase;
    this._calculateRouteUseCase = useCaseProps.calculateRouteUseCase;
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

  calculateRoutes(): Promise<OutputCalculateCoordinatesFacadeDto> {
    return this._calculateRouteUseCase.execute({});
  }
}
