export interface AuthResponse {
  userId: string,
  token: string,
  roleName: string
}

export interface Authorized {
  token: string | null,
  isAuth : boolean | null,
  roleName: string | null,
  userId: string | null
}