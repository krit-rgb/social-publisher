// utils/emptyArray.ts

/**
 * A single shared empty-array reference to pass as a prop default,
 * avoiding new-array-per-render breaking React.memo on consumers.
 */
export const EMPTY_POSTS: readonly [] = [];