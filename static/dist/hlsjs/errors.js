export var ErrorTypes;
(function (ErrorTypes) {
    // Identifier for a network error (loading error / timeout ...)
    ErrorTypes["NETWORK_ERROR"] = "networkError";
    // Identifier for a media Error (video/parsing/mediasource error)
    ErrorTypes["MEDIA_ERROR"] = "mediaError";
    // EME (encrypted media extensions) errors
    ErrorTypes["KEY_SYSTEM_ERROR"] = "keySystemError";
    // Identifier for a mux Error (demuxing/remuxing)
    ErrorTypes["MUX_ERROR"] = "muxError";
    // Identifier for all other errors
    ErrorTypes["OTHER_ERROR"] = "otherError";
})(ErrorTypes || (ErrorTypes = {}));
/**
 * @enum {ErrorDetails}
 * @typedef {string} ErrorDetail
 */
export var ErrorDetails;
(function (ErrorDetails) {
    ErrorDetails["KEY_SYSTEM_NO_KEYS"] = "keySystemNoKeys";
    ErrorDetails["KEY_SYSTEM_NO_ACCESS"] = "keySystemNoAccess";
    ErrorDetails["KEY_SYSTEM_NO_SESSION"] = "keySystemNoSession";
    ErrorDetails["KEY_SYSTEM_LICENSE_REQUEST_FAILED"] = "keySystemLicenseRequestFailed";
    ErrorDetails["KEY_SYSTEM_NO_INIT_DATA"] = "keySystemNoInitData";
    // Identifier for a manifest load error - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["MANIFEST_LOAD_ERROR"] = "manifestLoadError";
    // Identifier for a manifest load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["MANIFEST_LOAD_TIMEOUT"] = "manifestLoadTimeOut";
    // Identifier for a manifest parsing error - data: { url : faulty URL, reason : error reason}
    ErrorDetails["MANIFEST_PARSING_ERROR"] = "manifestParsingError";
    // Identifier for a manifest with only incompatible codecs error - data: { url : faulty URL, reason : error reason}
    ErrorDetails["MANIFEST_INCOMPATIBLE_CODECS_ERROR"] = "manifestIncompatibleCodecsError";
    // Identifier for a level which contains no fragments - data: { url: faulty URL, reason: "no fragments found in level", level: index of the bad level }
    ErrorDetails["LEVEL_EMPTY_ERROR"] = "levelEmptyError";
    // Identifier for a level load error - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["LEVEL_LOAD_ERROR"] = "levelLoadError";
    // Identifier for a level load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["LEVEL_LOAD_TIMEOUT"] = "levelLoadTimeOut";
    // Identifier for a level switch error - data: { level : faulty level Id, event : error description}
    ErrorDetails["LEVEL_SWITCH_ERROR"] = "levelSwitchError";
    // Identifier for an audio track load error - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["AUDIO_TRACK_LOAD_ERROR"] = "audioTrackLoadError";
    // Identifier for an audio track load timeout - data: { url : faulty URL, response : { code: error code, text: error text }}
    ErrorDetails["AUDIO_TRACK_LOAD_TIMEOUT"] = "audioTrackLoadTimeOut";
    // Identifier for fragment load error - data: { frag : fragment object, response : { code: error code, text: error text }}
    ErrorDetails["FRAG_LOAD_ERROR"] = "fragLoadError";
    // Identifier for fragment load timeout error - data: { frag : fragment object}
    ErrorDetails["FRAG_LOAD_TIMEOUT"] = "fragLoadTimeOut";
    // Identifier for a fragment decryption error event - data: {id : demuxer Id,frag: fragment object, reason : parsing error description }
    ErrorDetails["FRAG_DECRYPT_ERROR"] = "fragDecryptError";
    // Identifier for a fragment parsing error event - data: { id : demuxer Id, reason : parsing error description }
    // will be renamed DEMUX_PARSING_ERROR and switched to MUX_ERROR in the next major release
    ErrorDetails["FRAG_PARSING_ERROR"] = "fragParsingError";
    // Identifier for a remux alloc error event - data: { id : demuxer Id, frag : fragment object, bytes : nb of bytes on which allocation failed , reason : error text }
    ErrorDetails["REMUX_ALLOC_ERROR"] = "remuxAllocError";
    // Identifier for decrypt key load error - data: { frag : fragment object, response : { code: error code, text: error text }}
    ErrorDetails["KEY_LOAD_ERROR"] = "keyLoadError";
    // Identifier for decrypt key load timeout error - data: { frag : fragment object}
    ErrorDetails["KEY_LOAD_TIMEOUT"] = "keyLoadTimeOut";
    // Triggered when an exception occurs while adding a sourceBuffer to MediaSource - data : {  err : exception , mimeType : mimeType }
    ErrorDetails["BUFFER_ADD_CODEC_ERROR"] = "bufferAddCodecError";
    // Identifier for a buffer append error - data: append error description
    ErrorDetails["BUFFER_APPEND_ERROR"] = "bufferAppendError";
    // Identifier for a buffer appending error event - data: appending error description
    ErrorDetails["BUFFER_APPENDING_ERROR"] = "bufferAppendingError";
    // Identifier for a buffer stalled error event
    ErrorDetails["BUFFER_STALLED_ERROR"] = "bufferStalledError";
    // Identifier for a buffer full event
    ErrorDetails["BUFFER_FULL_ERROR"] = "bufferFullError";
    // Identifier for a buffer seek over hole event
    ErrorDetails["BUFFER_SEEK_OVER_HOLE"] = "bufferSeekOverHole";
    // Identifier for a buffer nudge on stall (playback is stuck although currentTime is in a buffered area)
    ErrorDetails["BUFFER_NUDGE_ON_STALL"] = "bufferNudgeOnStall";
    // Identifier for an internal exception happening inside hls.js while handling an event
    ErrorDetails["INTERNAL_EXCEPTION"] = "internalException";
})(ErrorDetails || (ErrorDetails = {}));
