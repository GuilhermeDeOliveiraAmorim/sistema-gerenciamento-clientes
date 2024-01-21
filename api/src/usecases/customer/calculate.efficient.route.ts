import Notification from "../../@shared/notification";
import Customer from "../../domain/customer/customer";
import CustomerRepositoryInterface from "../../domain/customer/customer.repository.interface";
import Coordinates from "../../domain/customer/value_objects/coordinates";

export interface OutputCalculateEfficientRouteDto {
  efficientRoute: Customer[];
}

export default class CalculateEfficientRouteUseCase {
  private _customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this._customerRepository = customerRepository;
  }

  async execute(): Promise<OutputCalculateEfficientRouteDto | Notification> {
    const notification = new Notification();

    try {
      const customers = await this._customerRepository.findAll();

      if (!customers || customers.length < 2) {
        notification.addMessage({
          title: "Insufficient Customers",
          detail:
            "É necessário fornecer pelo menos dois clientes para calcular uma rota eficiente.",
          type: "https://example.com/error/insufficient-customers",
          status: 400,
        });

        return notification;
      }

      const efficientRoute = this.calculateTSP(customers);

      const output: OutputCalculateEfficientRouteDto = {
        efficientRoute,
      };

      return output;
    } catch (error) {
      const errorMessage = (error as Error).message;

      notification.addMessage({
        title: "General Error",
        detail: errorMessage,
        type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
        status: 500,
      });

      return notification;
    }
  }

  private calculateTSP(customers: Customer[]): Customer[] {
    if (customers.length < 2) {
      return customers;
    }

    customers.sort((a, b) => {
      const distanceA = this.calculateDistance(
        a.coordinates,
        new Coordinates(0, 0)
      );
      const distanceB = this.calculateDistance(
        b.coordinates,
        new Coordinates(0, 0)
      );

      return distanceA - distanceB;
    });

    let bestRoute = [...customers];
    let minLength = this.calculateRouteLength(bestRoute);

    const permutations = this.generatePermutations(customers);

    for (const permutation of permutations) {
      const length = this.calculateRouteLength(permutation);
      if (length < minLength) {
        bestRoute = permutation;
        minLength = length;
      }
    }

    return bestRoute;
  }

  private generatePermutations(arr: Customer[]): Customer[][] {
    const result: Customer[][] = [];

    const permute = (arr: Customer[], start: number): void => {
      if (start === arr.length - 1) {
        result.push([...arr]);
        return;
      }

      for (let i = start; i < arr.length; i++) {
        [arr[start], arr[i]] = [arr[i], arr[start]];
        permute(arr, start + 1);
        [arr[start], arr[i]] = [arr[i], arr[start]];
      }
    };

    permute(arr, 0);

    return result;
  }

  private calculateRouteLength(route: Customer[]): number {
    let length = 0;

    for (let i = 1; i < route.length; i++) {
      const coord1 = route[i - 1].coordinates;
      const coord2 = route[i].coordinates;

      if (coord1 && coord2) {
        length += this.calculateDistance(coord1, coord2);
      }
    }

    const firstCoord = route[0].coordinates;
    const lastCoord = route[route.length - 1].coordinates;

    if (firstCoord && lastCoord) {
      length += this.calculateDistance(lastCoord, firstCoord);
    }

    return length;
  }

  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    return Math.sqrt(
      Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2)
    );
  }
}
