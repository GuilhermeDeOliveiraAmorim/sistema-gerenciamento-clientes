export type PhoneProps = {
  _value: string;
};

export class Phone {
    constructor(public props: PhoneProps) {}
  
    get _value() {
      return this.props._value;
    }
  }
  