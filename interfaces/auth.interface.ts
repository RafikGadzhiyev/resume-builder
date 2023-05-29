export interface ILogin {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  full_name: string;
  age: number;
  iat?: number;
  exp?: number;
  created_at: number;
}

export interface IAuth {
  email: string;
  password: string;
}
export interface ISignup extends IAuth {
  fullname: string;
}

export interface IUserMutation {
  _type: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
}
