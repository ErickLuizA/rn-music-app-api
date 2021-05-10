export interface DeletePlaylistMusicParams {
  playlistId: string
  playlistMusicId: string
}

export interface DeletePlaylistMusicUseCase {
  execute: (deletePlaylistMusicParams: DeletePlaylistMusicParams) => Promise<void>
}
