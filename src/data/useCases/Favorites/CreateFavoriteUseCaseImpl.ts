import { CreateFavoriteParams, CreateFavoriteUseCase } from '../../../domain/useCases/Favorites/CreateFavoriteUseCase'
import { IFavoriteRepository } from '../../repositories/IFavoriteRepository'

export class CreateFavoriteUseCaseImpl implements CreateFavoriteUseCase {
  constructor (
    private readonly favoriteRepository: IFavoriteRepository
  ) {}

  async execute (createFavoriteParams: CreateFavoriteParams): Promise<void> {
    const alreadyExists = await this.favoriteRepository.load(createFavoriteParams.userId, createFavoriteParams.favoriteId)

    if (alreadyExists !== undefined) {
      throw new Error('Favorite already exists')
    }

    await this.favoriteRepository.create(createFavoriteParams)
  }
}
