export interface Response {
  id: string;
}

export interface RegisterParamsType {
  email: string;
  password: string;
  reenterPassword: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
  registerType: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
  registerType: string;
}
