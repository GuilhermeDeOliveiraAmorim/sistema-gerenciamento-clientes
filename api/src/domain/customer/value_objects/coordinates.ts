import Notification from "../../../@shared/notification";

export default class Coordinates {
  private _x: number;
  private _y: number;
  private _notification: Notification;

  constructor(x: number, y: number) {
    this._notification = new Notification();
    this._x = x;
    this._y = y;
    this.validateCoordinates();
  }

  private validateCoordinates(): void {
    const precision = 2;

    if (
      !this.isValidDecimal(this._x, precision) ||
      !this.isValidDecimal(this._y, precision)
    ) {
      this._notification.addMessage(
        "Invalid Coordinates",
        `As coordenadas devem ter precisão de até ${precision} casas decimais.`,
        "https://httpwg.org/specs/rfc9110.html#status.400",
        400
      );
    }

    if (!this.isValidNumber(this._x) || !this.isValidNumber(this._y)) {
      this._notification.addMessage(
        "Invalid Coordinates",
        "As coordenadas devem ser números válidos.",
        "https://httpwg.org/specs/rfc9110.html#status.400",
        400
      );
    }
  }

  private isValidDecimal(value: number, precision: number): boolean {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{1,${precision}})?$`);
    return decimalRegex.test(value.toString());
  }

  private isValidNumber(value: number): boolean {
    return Number.isFinite(value);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get notification(): Notification {
    return this._notification;
  }
}
