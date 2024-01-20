export default interface BaseEntityInterface {
    get id(): string;
    get active(): boolean;
    get createdAt(): Date;
    get updatedAt(): Date;
    get deactivatedAt(): Date;
    activate(date: Date): void;
    deactivate(date: Date): void;
    update(date: Date): void;
  }