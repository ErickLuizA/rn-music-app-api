import { IPlaylistRepository } from '../../data/repositories/IPlaylistRepository'
import { MusicModel } from '../../domain/models/Music'
import { PlaylistModel } from '../../domain/models/Playlist'
import { CreatePlaylistMusicParams } from '../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { CreatePlaylistParams } from '../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { DeletePlaylistMusicParams } from '../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { DeletePlaylistParams } from '../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { UpdatePlaylistParams } from '../../domain/useCases/Playlists/UpdatePlaylistUseCase'
import database from '../query-builder/knex/connection'

export class PlaylistRepositoryImpl implements IPlaylistRepository {
  async create (createPlaylistParams: CreatePlaylistParams): Promise<void> {
    return await database('playlist').insert({
      userId: createPlaylistParams.userId,
      title: createPlaylistParams.title
    })
  }

  async createMusic (createPlaylistMusicParams: CreatePlaylistMusicParams): Promise<void> {
    return await database('playlist_music').insert({
      musicId: createPlaylistMusicParams.musicId,
      title: createPlaylistMusicParams.title,
      img: createPlaylistMusicParams.img,
      playlistId: createPlaylistMusicParams.playlistId
    })
  }

  async load (userId: string, title: string): Promise<PlaylistModel> {
    return await database('playlist').where({ userId, title }).first()
  }

  async loadAll (userId: string): Promise<PlaylistModel[]> {
    return await database('playlist').where({ userId })
  }

  async loadMusic (playlistId: string, musicId: string): Promise<MusicModel> {
    console.log(playlistId, musicId)

    return await database('playlist_music').where({ playlistId, musicId }).first()
  }

  async loadMusics (playlistId: string): Promise<MusicModel[]> {
    return await database('playlist_music').where({ playlistId })
  }

  async update (updatePlaylistParams: UpdatePlaylistParams): Promise<void> {
    await database('playlist').update({ title: updatePlaylistParams.title }).where({
      userId: updatePlaylistParams.userId, playlistId: updatePlaylistParams.playlistId
    })
  }

  async delete (deletePlaylistParams: DeletePlaylistParams): Promise<void> {
    await database('playlist').del().where({
      userId: deletePlaylistParams.userId, playlistId: deletePlaylistParams.playlistId
    })
  }

  async deleteMusic (deletePlaylistMusicParams: DeletePlaylistMusicParams): Promise<void> {
    await database('playlist_music').del().where({
      playlistId: deletePlaylistMusicParams.playlistId,
      playlistMusicId: deletePlaylistMusicParams.playlistMusicId
    })
  }
}
