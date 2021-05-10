import { UpdatePlaylistParams, UpdatePlaylistUseCase } from '../../../domain/useCases/Playlists/UpdatePlaylistUseCase'
import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class UpdatePlaylistController {
  constructor (private readonly updatePlaylistUseCase: UpdatePlaylistUseCase) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { playlistId, title } = httpRequest.body

    const data: UpdatePlaylistParams = { userId: userId ?? '', playlistId, title }

    try {
      await this.updatePlaylistUseCase.execute(data)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
