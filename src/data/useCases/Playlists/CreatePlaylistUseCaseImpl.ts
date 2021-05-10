import { CreatePlaylistParams, CreatePlaylistUseCase } from '../../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class CreatePlaylistUseCaseImpl implements CreatePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (createPlaylistParams: CreatePlaylistParams): Promise<void> {
    const alreadyExists = await this.playlistRepository.load(createPlaylistParams.userId, createPlaylistParams.title)

    if (alreadyExists !== undefined) {
      throw new Error('Playlist already exists')
    }

    await this.playlistRepository.create(createPlaylistParams)
  }
}
