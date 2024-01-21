export type CoordinatesProps = {
  _x_coordinate: number;
  _y_coordinate: number;
};

export class Coordinates {
  constructor(public props: CoordinatesProps) {}

  get _x_coordinate() {
    return this.props._x_coordinate;
  }

  get _y_coordinate() {
    return this.props._y_coordinate;
  }
}
