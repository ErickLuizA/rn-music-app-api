export interface DeletePlaylistParams {
  userId: string
  playlistId: string
}

export interface DeletePlaylistUseCase {
  execute: (deletePlaylistParams: DeletePlaylistParams) => Promise<void>
}
