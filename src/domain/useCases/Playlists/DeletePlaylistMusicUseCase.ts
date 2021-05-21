export interface DeletePlaylistMusicParams {
  playlistId: string
  musicId: string
}

export interface DeletePlaylistMusicUseCase {
  execute: (deletePlaylistMusicParams: DeletePlaylistMusicParams) => Promise<void>
}
