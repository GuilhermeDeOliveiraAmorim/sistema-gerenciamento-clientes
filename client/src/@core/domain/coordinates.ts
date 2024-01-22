export type CoordinatesProps = {
  _x: number;
  _y: number;
};

export class Coordinates {
  constructor(public props: CoordinatesProps) {}

  get _x() {
    return this.props._x;
  }

  get _y() {
    return this.props._y;
  }
}
