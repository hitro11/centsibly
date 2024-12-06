export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type Expense =
    | 'housing'
    | 'investments'
    | 'utilities'
    | 'groceries'
    | 'transportation'
    | 'entertainment'
    | 'others';
