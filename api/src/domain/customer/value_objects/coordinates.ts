export default class Coordinates {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
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
      throw new Error(
        `As coordenadas devem ter precisão de até ${precision} casas decimais.`
      );
    }

    if (!this.isValidNumber(this._x) || !this.isValidNumber(this._y)) {
      throw new Error("As coordenadas devem ser números válidos.");
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
}
