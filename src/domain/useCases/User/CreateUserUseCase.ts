export interface CreateUserParams {
  name: string
  email: string
  password: string
}

export interface CreateUserUseCase {
  execute: (user: CreateUserParams) => Promise<void>
}
