import { CreatePlaylistMusicParams, CreatePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreatePlaylistMusicController {
  constructor (
    private readonly createPlaylistMusicUseCase: CreatePlaylistMusicUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { musicId, title, img, playlistId } = httpRequest.body

    const data: CreatePlaylistMusicParams = {
      musicId,
      title,
      img,
      playlistId
    }

    try {
      await this.createPlaylistMusicUseCase.execute(data)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
