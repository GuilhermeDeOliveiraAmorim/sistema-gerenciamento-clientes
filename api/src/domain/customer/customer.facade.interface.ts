export interface InputCreateCustomerFacadeDto {
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface OutputCreateCustomerFacadeDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface OutputFindAllCustomersFacadeDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}
[];

export interface InputFindByEmailCustomerFacadeDto {
  email: string;
}

export interface OutputFindByEmailCustomerFacadeDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface InputFindByIdCustomerFacadeDto {
  id: string;
}

export interface OutputFindByIdCustomerFacadeDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  xCoordinate: number;
  yCoordinate: number;
}

export interface OutputCalculateCoordinatesFacadeDto {
  customers: {
    id: string;
    name: string;
    email: string;
    phone: string;
    xCoordinate: number;
    yCoordinate: number;
  }[];
}

export default interface CustomerFacadeInterface {
  createCustomer(
    input: InputCreateCustomerFacadeDto
  ): Promise<OutputCreateCustomerFacadeDto>;
  findAllCustomers(): Promise<OutputFindAllCustomersFacadeDto>;
  findCustomerByEmail(
    input: InputFindByEmailCustomerFacadeDto
  ): Promise<OutputFindAllCustomersFacadeDto>;
  findCustomerById(
    input: InputFindByIdCustomerFacadeDto
  ): Promise<OutputFindByIdCustomerFacadeDto>;
  calculateRoutes(): Promise<OutputCalculateCoordinatesFacadeDto>;
}
