/**
 * `type` property values for this loaders' context object
 * @enum
 *
 */
export var PlaylistContextType;
(function (PlaylistContextType) {
    PlaylistContextType["MANIFEST"] = "manifest";
    PlaylistContextType["LEVEL"] = "level";
    PlaylistContextType["AUDIO_TRACK"] = "audioTrack";
    PlaylistContextType["SUBTITLE_TRACK"] = "subtitleTrack";
})(PlaylistContextType || (PlaylistContextType = {}));
/**
 * @enum {string}
 */
export var PlaylistLevelType;
(function (PlaylistLevelType) {
    PlaylistLevelType["MAIN"] = "main";
    PlaylistLevelType["AUDIO"] = "audio";
    PlaylistLevelType["SUBTITLE"] = "subtitle";
})(PlaylistLevelType || (PlaylistLevelType = {}));
