export function flattenObj(obj: Record<string, any>) {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flattenObj(obj[key] as Record<string, any>));
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

export function updateState<T extends Record<string, any>>(currentState: T, newValues: T) {
  const newValuesMap = new Map(newValues.map((item: any) => [item.id, item]));
  return currentState
    .map((item: any) => newValuesMap.get(item.id) || item)
    .concat(newValues.filter((item: any) => !currentState.some((existingItem: any) => existingItem.id === item.id)));
}
