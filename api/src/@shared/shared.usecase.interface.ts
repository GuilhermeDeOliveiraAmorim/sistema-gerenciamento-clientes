export interface SharedUseCaseInterface {
  execute(input: unknown): Promise<unknown>;
}
