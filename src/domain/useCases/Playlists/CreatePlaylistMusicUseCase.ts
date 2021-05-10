export interface CreatePlaylistMusicParams {
  musicId: string
  title: string
  img: string
  playlistId: string
}

export interface CreatePlaylistMusicUseCase {
  execute: (createPlaylistMusicParams: CreatePlaylistMusicParams) => Promise<void>
}
