import { CreatePlaylistMusicParams, CreatePlaylistMusicUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class CreatePlaylistMusicUseCaseImpl implements CreatePlaylistMusicUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (createPlaylistMusicParams: CreatePlaylistMusicParams): Promise<void> {
    const alreadyExists = await this.playlistRepository.loadMusic(createPlaylistMusicParams.playlistId, createPlaylistMusicParams.musicId)

    if (alreadyExists !== undefined) {
      throw new Error('This music already belongs to the playlist.')
    }

    await this.playlistRepository.createMusic(createPlaylistMusicParams)
  }
}
