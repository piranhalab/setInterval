/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
export var KeySystems;
(function (KeySystems) {
    KeySystems["WIDEVINE"] = "com.widevine.alpha";
    KeySystems["PLAYREADY"] = "com.microsoft.playready";
})(KeySystems || (KeySystems = {}));
const requestMediaKeySystemAccess = (function () {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.requestMediaKeySystemAccess) {
        return window.navigator.requestMediaKeySystemAccess.bind(window.navigator);
    }
    else {
        return null;
    }
})();
export { requestMediaKeySystemAccess };
