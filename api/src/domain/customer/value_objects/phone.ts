export default class Phone {
  private _value: string;

  constructor(value: string) {
    this.validatePhone(value);
    this._value = value;
  }

  private validatePhone(value: string): void {
    const phoneRegex = /^(?:(\d{2}))?[-.\s]?(\d{4,5})[-.\s]?(\d{4})$/;

    if (!phoneRegex.test(value)) {
      throw new Error("O número de telefone não possui um formato válido.");
    }
  }

  get value(): string {
    return this._value;
  }
}
