import { CreateFavoriteParams, CreateFavoriteUseCase } from '../../../domain/useCases/Favorites/CreateFavoriteUseCase'
import { badRequest, noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreateFavoriteController {
  constructor (
    private readonly createFavoriteUseCase: CreateFavoriteUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { musicId, title, img } = httpRequest.body

    const data: CreateFavoriteParams = {
      userId: userId ?? '',
      musicId,
      title,
      img
    }

    try {
      await this.createFavoriteUseCase.execute(data)

      return noContent()
    } catch (error) {
      if (error.message === 'Favorite already exists') {
        return badRequest(error)
      }
      return serverError(error)
    }
  }
}
