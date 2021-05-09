import database from '../query-builder/knex/connection'
import { UserModel } from '../../domain/models/User'
import { IUserRepository } from '../../data/repositories/IUserRepository'
import { CreateUserParams } from '../../domain/useCases/User/CreateUserUseCase'

export class UserRepositoryImpl implements IUserRepository {
  async create (params: CreateUserParams): Promise<number> {
    const res = await database('users').insert(params)

    return res[0]
  }

  async loadByEmail (email: string): Promise<UserModel> {
    return await database('users').where('email', email).first()
  }

  async loadById (id: string): Promise<UserModel> {
    return await database('users').where('id', id).first()
  }

  async updateToken (userId: string, token: string): Promise<void> {
    return await database('users').where('id', userId).update('token', token)
  }

  async loadUserByToken (token: string): Promise<UserModel> {
    return await database('users').where('token', token).first()
  }
}
