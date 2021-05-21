import { DeletePlaylistMusicParams, DeletePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class DeletePlaylistMusicController {
  constructor (
    private readonly deletePlaylistMusicUseCase: DeletePlaylistMusicUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { playlistId, musicId } = httpRequest.body

    const data: DeletePlaylistMusicParams = {
      playlistId,
      musicId
    }

    try {
      await this.deletePlaylistMusicUseCase.execute(data)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
