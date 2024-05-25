declare namespace Utils {
  type GetFunctionParams<Func extends Function> = Func extends (...arg: infer Args) => unknown ? Args : never;

  type DeepRecord<T extends Record<string, any>> = {
    [Key in keyof T]: T[Key] extends Record<string, any> ? DeepRecord<T[Key]> & Record<string, any> : T[Key];
  } & Record<string, any>;
}
