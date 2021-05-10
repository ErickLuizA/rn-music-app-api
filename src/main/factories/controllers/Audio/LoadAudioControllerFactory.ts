import { videoFormat } from 'ytdl-core'
import { LoadAudioUseCaseImpl } from '../../../../data/useCases/Audio/LoadAudioUseCaseImpl'
import { YoutubeAudioRepositoryImpl } from '../../../../infra/repositories/YoutubeAudioRepositoryImpl'
import { LoadAudioController } from '../../../../presentation/controllers/Audio/LoadAudioController'

export function makeLoadAudioController (): LoadAudioController<videoFormat> {
  const audioRepository = new YoutubeAudioRepositoryImpl()

  const loadAudioUseCase = new LoadAudioUseCaseImpl(audioRepository)

  const loadAudioController = new LoadAudioController(loadAudioUseCase)

  return loadAudioController
}
