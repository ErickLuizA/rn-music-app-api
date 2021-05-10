import { DeletePlaylistMusicParams, DeletePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class DeletePlaylistMusicUseCaseImpl implements DeletePlaylistMusicUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (deletePlaylistMusicParams: DeletePlaylistMusicParams): Promise<void> {
    return await this.playlistRepository.deleteMusic(deletePlaylistMusicParams)
  }
}
