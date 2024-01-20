import BaseEntity, { BaseEntityProps } from "../../@shared/shared";
import Coordinates from "./value_objects/coordinates";
import Email from "./value_objects/email";
import Phone from "./value_objects/phone";

export type CustomerProps = BaseEntityProps & {
  name: string;
  email: Email;
  phone: Phone;
  coordinates: Coordinates;
};

export default class Customer extends BaseEntity {
  private _name: string;
  private _email: Email;
  private _phone: Phone;
  private _coordinates: Coordinates;

  constructor(props: CustomerProps) {
    super(props);

    this._name = props.name;
    this._email = props.email;
    this._phone = props.phone;
    this._coordinates = props.coordinates;

    this.validateCustomer();
  }

  validateCustomer(): void {
    if (this._name.length < 1 || this._name.length > 100) {
      throw new Error("O nome deve ter entre 1 e 100 caracteres.");
    }
  }

  get name(): string {
    return this._name;
  }

  get email(): Email {
    return this._email;
  }

  get phone(): Phone {
    return this._phone;
  }

  get x_coordinate(): Coordinates {
    return this._coordinates;
  }
}
