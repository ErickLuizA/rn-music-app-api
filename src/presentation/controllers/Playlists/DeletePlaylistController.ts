import { DeletePlaylistParams, DeletePlaylistUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeletePlaylistController {
  constructor (private readonly deletePlaylistUseCase: DeletePlaylistUseCase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { id } = httpRequest.params

    const data: DeletePlaylistParams = {
      userId: userId ?? '',
      playlistId: id
    }

    try {
      await this.deletePlaylistUseCase.execute(data)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
