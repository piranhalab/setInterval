/**
 * HLS config
 */
import AbrController from './controller/abr-controller';
import BufferController from './controller/buffer-controller';
import CapLevelController from './controller/cap-level-controller';
import FPSController from './controller/fps-controller';
import XhrLoader from './utils/xhr-loader';
// import FetchLoader from './utils/fetch-loader';
import AudioTrackController from './controller/audio-track-controller';
import AudioStreamController from './controller/audio-stream-controller';
import * as Cues from './utils/cues';
import TimelineController from './controller/timeline-controller';
import SubtitleTrackController from './controller/subtitle-track-controller';
import { SubtitleStreamController } from './controller/subtitle-stream-controller';
import EMEController from './controller/eme-controller';
import { requestMediaKeySystemAccess } from './utils/mediakeys-helper';
// If possible, keep hlsDefaultConfig shallow
// It is cloned whenever a new Hls instance is created, by keeping the config
// shallow the properties are cloned, and we don't end up manipulating the default
export const hlsDefaultConfig = Object.assign(Object.assign({ autoStartLoad: true, startPosition: -1, defaultAudioCodec: void 0, debug: false, capLevelOnFPSDrop: false, capLevelToPlayerSize: false, initialLiveManifestSize: 1, maxBufferLength: 30, maxBufferSize: 60 * 1000 * 1000, maxBufferHole: 0.5, lowBufferWatchdogPeriod: 0.5, highBufferWatchdogPeriod: 3, nudgeOffset: 0.1, nudgeMaxRetry: 3, maxFragLookUpTolerance: 0.25, liveSyncDurationCount: 3, liveMaxLatencyDurationCount: Infinity, liveSyncDuration: void 0, liveMaxLatencyDuration: void 0, liveDurationInfinity: false, liveBackBufferLength: Infinity, maxMaxBufferLength: 600, enableWorker: true, enableSoftwareAES: true, manifestLoadingTimeOut: 10000, manifestLoadingMaxRetry: 1, manifestLoadingRetryDelay: 1000, manifestLoadingMaxRetryTimeout: 64000, startLevel: void 0, levelLoadingTimeOut: 10000, levelLoadingMaxRetry: 4, levelLoadingRetryDelay: 1000, levelLoadingMaxRetryTimeout: 64000, fragLoadingTimeOut: 20000, fragLoadingMaxRetry: 6, fragLoadingRetryDelay: 1000, fragLoadingMaxRetryTimeout: 64000, startFragPrefetch: false, fpsDroppedMonitoringPeriod: 5000, fpsDroppedMonitoringThreshold: 0.2, appendErrorMaxRetry: 3, loader: XhrLoader, 
    // loader: FetchLoader,
    fLoader: void 0, pLoader: void 0, xhrSetup: void 0, licenseXhrSetup: void 0, 
    // fetchSetup: void 0,
    abrController: AbrController, bufferController: BufferController, capLevelController: CapLevelController, fpsController: FPSController, stretchShortVideoTrack: false, maxAudioFramesDrift: 1, forceKeyFrameOnDiscontinuity: true, abrEwmaFastLive: 3, abrEwmaSlowLive: 9, abrEwmaFastVoD: 3, abrEwmaSlowVoD: 9, abrEwmaDefaultEstimate: 5e5, abrBandWidthFactor: 0.95, abrBandWidthUpFactor: 0.7, abrMaxWithRealBitrate: false, maxStarvationDelay: 4, maxLoadingDelay: 4, minAutoBitrate: 0, emeEnabled: false, widevineLicenseUrl: void 0, drmSystemOptions: {}, requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess, testBandwidth: true }, timelineConfig()), { subtitleStreamController: (__USE_SUBTITLES__) ? SubtitleStreamController : void 0, subtitleTrackController: (__USE_SUBTITLES__) ? SubtitleTrackController : void 0, timelineController: (__USE_SUBTITLES__) ? TimelineController : void 0, audioStreamController: (__USE_ALT_AUDIO__) ? AudioStreamController : void 0, audioTrackController: (__USE_ALT_AUDIO__) ? AudioTrackController : void 0, emeController: (__USE_EME_DRM__) ? EMEController : void 0 });
function timelineConfig() {
    return {
        cueHandler: Cues,
        enableCEA708Captions: __USE_SUBTITLES__,
        enableWebVTT: __USE_SUBTITLES__,
        captionsTextTrack1Label: 'English',
        captionsTextTrack1LanguageCode: 'en',
        captionsTextTrack2Label: 'Spanish',
        captionsTextTrack2LanguageCode: 'es',
        captionsTextTrack3Label: 'Unknown CC',
        captionsTextTrack3LanguageCode: '',
        captionsTextTrack4Label: 'Unknown CC',
        captionsTextTrack4LanguageCode: '',
        renderTextTracksNatively: true
    };
}
