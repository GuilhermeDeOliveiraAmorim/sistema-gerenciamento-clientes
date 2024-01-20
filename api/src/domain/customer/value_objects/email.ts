export default class Email {
  private _value: string;

  constructor(value: string) {
    this.validateEmail(value);
    this._value = value;
  }

  private validateEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error("O e-mail não possui um formato válido.");
    }
  }

  get value(): string {
    return this._value;
  }
}
