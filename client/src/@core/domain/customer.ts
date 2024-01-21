import { Coordinates } from "./coordinates";
import { Email } from "./email";
import { Phone } from "./phone";

export type CustomerProps = {
  _id: string;
  _name: string;
  _email: Email;
  _phone: Phone;
  _coordinates: Coordinates;
};

export class Customer {
  constructor(public props: CustomerProps) {}

  get _id() {
    return this.props._id;
  }

  get _name() {
    return this.props._name;
  }

  get _email() {
    return this.props._email;
  }

  get _phone() {
    return this.props._phone;
  }

  get _coordinates() {
    return this.props._coordinates;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      phone: this._phone,
      coordinates: this._coordinates,
    };
  }
}
