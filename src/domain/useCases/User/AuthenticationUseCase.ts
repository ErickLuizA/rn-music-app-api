export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationModel {
  accessToken: string
}

export interface AuthenticationUseCase {
  execute: (authenticationParams: AuthenticationParams) => Promise<AuthenticationModel>
}
