import { Encrypter } from '../../../data/criptography/encrypter'
import { IUserRepository } from '../../../data/repositories/IUserRepository'
import { CreateUserParams, CreateUserUseCase } from '../../../domain/useCases/User/CreateUserUseCase'
import {
  badRequest,
  badRequests,
  noContent,
  serverError
} from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class CreateUserController {
  constructor (
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly validator: Validation,
    private readonly encrypter: Encrypter,
    private readonly userRepository: IUserRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body

    const data: CreateUserParams = { name, email, password }

    const error = this.validator.validate(data)

    if (error.length > 0) {
      if (error.length > 1) {
        return badRequests(error)
      }
      return badRequest(error[0])
    }

    try {
      const userId = await this.createUserUseCase.execute(data)

      const token = await this.encrypter.encrypt(userId.toString())

      await this.userRepository.updateToken(userId.toString(), token)

      return noContent()
    } catch (error) {
      if (error.message === 'User already exists') {
        return badRequest(error)
      }

      return serverError(error)
    }
  }
}
