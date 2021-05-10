export interface CreatePlaylistParams {
  userId: string
  title: string
}

export interface CreatePlaylistUseCase {
  execute: (createPlaylistParams: CreatePlaylistParams) => Promise<void>
}
