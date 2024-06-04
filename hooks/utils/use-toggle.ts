import * as React from 'react';

const toggleReducer = (state: boolean, nextValue?: any) => (typeof nextValue === 'boolean' ? nextValue : !state);

export function useToggle(initialValue = false) {
  return React.useReducer<React.Reducer<boolean, any>>(toggleReducer, initialValue);
}
