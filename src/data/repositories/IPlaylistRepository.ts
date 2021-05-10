import { MusicModel } from '../../domain/models/Music'
import { PlaylistModel } from '../../domain/models/Playlist'
import { CreatePlaylistMusicParams } from '../../domain/useCases/Playlists/CreatePlaylistMusicUseCase'
import { CreatePlaylistParams } from '../../domain/useCases/Playlists/CreatePlaylistUseCase'
import { DeletePlaylistMusicParams } from '../../domain/useCases/Playlists/DeletePlaylistMusicUseCase'
import { DeletePlaylistParams } from '../../domain/useCases/Playlists/DeletePlaylistUseCase'
import { UpdatePlaylistParams } from '../../domain/useCases/Playlists/UpdatePlaylistUseCase'

export interface IPlaylistRepository {
  create: (createPlaylistParams: CreatePlaylistParams) => Promise<void>

  createMusic: (createPlaylistMusicParams: CreatePlaylistMusicParams) => Promise<void>

  load: (userId: string, title: string) => Promise<PlaylistModel>

  loadAll: (userId: string) => Promise<PlaylistModel[]>

  loadMusic: (playlistId: string, musicId: string) => Promise<MusicModel>

  loadMusics: (playlistId: string) => Promise<MusicModel[]>

  update: (updatePlaylistParams: UpdatePlaylistParams) => Promise<void>

  delete: (deletePlaylistParams: DeletePlaylistParams) => Promise<void>

  deleteMusic: (deletePlaylistMusicParams: DeletePlaylistMusicParams) => Promise<void>

}
