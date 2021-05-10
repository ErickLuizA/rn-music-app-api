import { DeletePlaylistParams, DeletePlaylistUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class DeletePlaylistUseCaseImpl implements DeletePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (deletePlaylistParams: DeletePlaylistParams): Promise<void> {
    return await this.playlistRepository.delete(deletePlaylistParams)
  }
}
