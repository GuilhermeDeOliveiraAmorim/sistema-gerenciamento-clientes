export type EmailProps = {
  _value: string;
};

export class Email {
  constructor(public props: EmailProps) {}

  get _value() {
    return this.props._value;
  }
}
