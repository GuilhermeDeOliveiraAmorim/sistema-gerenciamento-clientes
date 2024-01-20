import { randomUUID } from "crypto";
import BaseEntityInterface from "./shared.interface";

export type BaseEntityProps = {
  id?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deactivatedAt?: Date;
};

export default class BaseEntity implements BaseEntityInterface {
  private _id: string;
  private _active: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deactivatedAt: Date;

  constructor(props: BaseEntityProps) {
    this._id = props.id || randomUUID();
    this._active = props.active || true;
    this._createdAt = props.createdAt || new Date();
    this._deactivatedAt = props.deactivatedAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  activate(date: Date): void {
    this._active = true;
    this._updatedAt = date;
  }

  deactivate(date: Date): void {
    this._active = false;
    this._deactivatedAt = date;
  }

  update(date: Date): void {
    this._updatedAt = date;
  }

  get id(): string {
    return this._id;
  }

  get active(): boolean {
    return this._active;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deactivatedAt(): Date {
    return this._deactivatedAt;
  }
}
