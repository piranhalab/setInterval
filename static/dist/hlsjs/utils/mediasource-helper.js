/**
 * MediaSource helper
 */
export function getMediaSource() {
    return window.MediaSource || window.WebKitMediaSource;
}
