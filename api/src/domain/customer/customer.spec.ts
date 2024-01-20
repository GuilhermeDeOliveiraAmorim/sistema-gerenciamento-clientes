import Customer, { CustomerProps } from "./customer";
import Coordinates from "./value_objects/coordinates";
import Email from "./value_objects/email";
import Phone from "./value_objects/phone";

test("Create a valid customer", () => {
  const customerProps: CustomerProps = {
    name: "John Doe",
    email: new Email("john@example.com"),
    phone: new Phone("1234567890"),
    coordinates: new Coordinates(1.23, 4.56),
  };

  const customer = new Customer(customerProps);

  expect(customer.name).toBe("John Doe");
  expect(customer.email).toBeInstanceOf(Email);
  expect(customer.phone).toBeInstanceOf(Phone);
  expect(customer.coordinates).toBeInstanceOf(Coordinates);
  expect(customer.notification.hasMessages()).toBe(false);
});

test("Validate name length", () => {
  const customerProps: CustomerProps = {
    name: "",
    email: new Email("john@example.com"),
    phone: new Phone("1234567890"),
    coordinates: new Coordinates(1.23, 4.56),
  };

  const customer = new Customer(customerProps);

  expect(customer.notification.hasMessages()).toBe(true);
  expect(customer.notification.getMessages()[0].detail).toContain(
    "O nome deve ter entre 1 e 100 caracteres."
  );
});

test("Get x coordinate", () => {
  const customerProps: CustomerProps = {
    name: "John Doe",
    email: new Email("john@example.com"),
    phone: new Phone("1234567890"),
    coordinates: new Coordinates(1.23, 4.56),
  };

  const customer = new Customer(customerProps);

  expect(customer.coordinates.x).toBe(1.23);
});

test("Validate invalid email", () => {
  const customerProps: CustomerProps = {
    name: "John Doe",
    email: new Email("john.example.com"),
    phone: new Phone("1234567890"),
    coordinates: new Coordinates(1.23, 4.56),
  };

  const customer = new Customer(customerProps);

  expect(customer.email.notification.hasMessages()).toBe(true);
  expect(customer.email.notification.getMessages()[0].detail).toContain(
    "O e-mail não possui um formato válido."
  );
});

test("Validate invalid phone number", () => {
  const customerProps: CustomerProps = {
    name: "John Doe",
    email: new Email("john@example.com"),
    phone: new Phone("invalid-phone"),
    coordinates: new Coordinates(1.23, 4.56),
  };

  const customer = new Customer(customerProps);

  expect(customer.phone.notification.hasMessages()).toBe(true);
  expect(customer.phone.notification.getMessages()[0].detail).toContain(
    "O número de telefone não possui um formato válido."
  );
});
