import { IAudioRepository } from '../../data/repositories/IAudioRepository'
import youtube, { videoFormat } from 'ytdl-core'

export class YoutubeAudioRepositoryImpl implements IAudioRepository<videoFormat> {
  async load (id: string): Promise<videoFormat[]> {
    const info = await youtube.getInfo(id)

    const audioFormat = youtube.filterFormats(info.formats, 'audioonly')

    return audioFormat
  }
}
