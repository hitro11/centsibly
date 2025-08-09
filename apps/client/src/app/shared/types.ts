export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepPartialWithNull<T> = {
    [P in keyof T]?: T[P] extends object
        ? T[P] extends Array<any>
            ? Array<DeepPartialWithNull<T[P][number]> | null> // Handle arrays
            : DeepPartialWithNull<T[P]> // Handle nested objects
        : T[P] | null; // Handle primitives
};
