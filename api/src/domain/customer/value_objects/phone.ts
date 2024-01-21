import Notification from "../../../@shared/notification";

export default class Phone {
  private _value: string;
  private _notification: Notification;

  constructor(value: string) {
    this._notification = new Notification();
    this.validatePhone(value);
    this._value = value;
  }

  private validatePhone(value: string): void {
    const phoneRegex = /^(?:(\d{2}))?[-.\s]?(\d{4,5})[-.\s]?(\d{4})$/;

    if (!phoneRegex.test(value)) {
      this._notification.addMessage({
        title: "Invalid Phone Format",
        detail: "O número de telefone não possui um formato válido.",
        type: "https://httpwg.org/specs/rfc9110.html#status.400",
        status: 400,
      });
    }
  }

  get value(): string {
    return this._value;
  }

  get notification(): Notification {
    return this._notification;
  }
}
