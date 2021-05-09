import { DeleteFavoriteUseCase } from '../../../domain/useCases/Favorites/DeleteFavoriteUseCase'
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository'

export class DeleteFavoriteUseCaseImpl implements DeleteFavoriteUseCase {
  constructor (
    private readonly favoriteRepository: IFavoriteRepository
  ) {}

  async execute (favoriteId: string, userId: string): Promise<void> {
    const result = await this.favoriteRepository.delete(favoriteId, userId)

    if (result !== 1) {
      throw new Error('Favorite does not exist')
    }
  }
}
