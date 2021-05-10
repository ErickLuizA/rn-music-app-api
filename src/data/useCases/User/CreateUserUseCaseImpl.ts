import { CreateUserParams, CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import { Hasher } from '../../criptography/hasher'
import { IUserRepository } from '../../repositories/IUserRepository'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (
    user: CreateUserParams
  ): Promise<void> {
    const userAlreadyExists = await this.userRepository.loadByEmail(user.email)

    if (userAlreadyExists?.email === user.email) {
      throw new Error('User already exists')
    }

    const hashedPassword = await this.hasher.hash(user.password)

    await this.userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword
    })
  }
}
