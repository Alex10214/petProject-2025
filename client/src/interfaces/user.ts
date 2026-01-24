export interface IUser {
  id: string;
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface ILoginCred {
  email: string;
  password: string;
}

export interface IRegisterCred {
  email: string;
  displayName: string;
  password: string;
}
