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
    private readonly validator: Validation
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
      await this.createUserUseCase.execute(data)

      return noContent()
    } catch (error) {
      if (error.message === 'User already exists') {
        return badRequest(error)
      }

      return serverError(error)
    }
  }
}
