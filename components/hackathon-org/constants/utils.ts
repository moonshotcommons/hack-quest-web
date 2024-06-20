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
