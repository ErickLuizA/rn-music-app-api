import { DeleteFavoriteUseCase } from '../../../domain/useCases/Favorites/DeleteFavoriteUseCase'
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository'

export class DeleteFavoriteUseCaseImpl implements DeleteFavoriteUseCase {
  constructor (
    private readonly favoriteRepository: IFavoriteRepository
  ) {}

  async execute (favoriteId: string, userId: string): Promise<void> {
    return await this.favoriteRepository.delete(favoriteId, userId)
  }
}
