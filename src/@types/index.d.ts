export declare global {
  export interface Array<T> {
    while<S extends T>(predicate: (value: T, index: number, array: T[]) => boolean): S[];
    last: T;
    first: T;
  }

  export interface Number {
    isPositive: boolean;
  }

  export interface ObjectConstructor {
    isEmpty(object: Record<string, unknown>): boolean;
    isNotEmpty(object: Record<string, unknown>): boolean;
  }

  export interface String {
    equal(anotherString: string): boolean;
    notEqual(anotherString: string): boolean;
  }
}
