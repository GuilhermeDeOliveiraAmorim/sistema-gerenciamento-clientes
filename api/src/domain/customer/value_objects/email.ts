import Notification from "../../../@shared/notification";

export default class Email {
  private _value: string;
  private _notification: Notification;

  constructor(value: string) {
    this._notification = new Notification();
    this.validateEmail(value);
    this._value = value;
  }

  private validateEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      this._notification.addMessage({
        title: "Invalid Email Format",
        detail: "O e-mail não possui um formato válido.",
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
