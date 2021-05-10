import { CreatePlaylistParams, CreatePlaylistUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { noContent, serverError } from '../../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class CreatePlaylistController {
  constructor (
    private readonly createPlaylistUseCase: CreatePlaylistUseCase
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const userId = httpRequest.userId
    const { title } = httpRequest.body

    const data: CreatePlaylistParams = { userId: userId ?? '', title }

    try {
      await this.createPlaylistUseCase.execute(data)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
