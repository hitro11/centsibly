export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepPartialWithNull<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? Array<DeepPartialWithNull<U> | null> | null // Array elements can be null, array itself can be null
        : T[P] extends ReadonlyArray<infer U>
          ? ReadonlyArray<DeepPartialWithNull<U> | null> | null
          : T[P] extends Date | Function | RegExp
            ? T[P] | null // Built-in types + null
            : T[P] extends object
              ? DeepPartialWithNull<T[P]> | null // Nested objects + null
              : T[P] | null; // Primitives + null
};

// If you want to allow undefined as well, use this version:
export type DeepPartialWithNullAndUndefined<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ?
              | Array<DeepPartialWithNullAndUndefined<U> | null | undefined>
              | null
              | undefined
        : T[P] extends ReadonlyArray<infer U>
          ?
                | ReadonlyArray<
                      DeepPartialWithNullAndUndefined<U> | null | undefined
                  >
                | null
                | undefined
          : T[P] extends Date | Function | RegExp
            ? T[P] | null | undefined
            : T[P] extends object
              ? DeepPartialWithNullAndUndefined<T[P]> | null | undefined
              : T[P] | null | undefined;
};
