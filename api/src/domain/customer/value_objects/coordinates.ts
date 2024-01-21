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
      this._notification.addMessage({
        title: "Invalid Coordinates",
        detail: `As coordenadas devem ter precisão de até ${precision} casas decimais.`,
        type: "https://httpwg.org/specs/rfc9110.html#status.400",
        status: 400,
      });
    }
  }

  private isValidDecimal(value: number, precision: number): boolean {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{1,${precision}})?$`);
    return decimalRegex.test(value.toString());
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
