import { UpdatePlaylistParams, UpdatePlaylistUseCase } from '../../../domain/useCases/Playlists/UpdatePlaylistUseCase'
import { IPlaylistRepository } from '../../repositories/IPlaylistRepository'

export class UpdatePlaylistUseCaseImpl implements UpdatePlaylistUseCase {
  constructor (
    private readonly playlistRepository: IPlaylistRepository
  ) {}

  async execute (updatePlaylistParams: UpdatePlaylistParams): Promise<void> {
    return await this.playlistRepository.update(updatePlaylistParams)
  }
}
