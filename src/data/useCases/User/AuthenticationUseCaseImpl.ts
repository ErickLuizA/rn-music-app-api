import { AuthenticationModel, AuthenticationParams, AuthenticationUseCase } from '../../../domain/useCases/User/AuthenticationUseCase'
import { Encrypter } from '../../criptography/encrypter'
import { HashComparer } from '../../criptography/hash-comparer'
import { IUserRepository } from '../../repositories/IUserRepository'

export class AuthenticationUseCaseImpl implements AuthenticationUseCase {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute (authenticationParams: AuthenticationParams): Promise<AuthenticationModel> {
    const user = await this.userRepository.loadByEmail(authenticationParams.email)

    if (user !== undefined) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)

        await this.userRepository.updateToken(user.id, accessToken)

        return { accessToken }
      }
    }
    throw new Error('Invalid credentials')
  }
}
