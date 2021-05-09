import { DeleteFavoriteUseCase } from '../../../domain/useCases/Favorites/DeleteFavoriteUseCase'

import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeleteFavoriteController {
  constructor (private readonly deleteFavoritesUseCase: DeleteFavoriteUseCase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { id } = httpRequest.params

    try {
      await this.deleteFavoritesUseCase.execute(id, userId ?? '')

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
