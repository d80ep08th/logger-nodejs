// © 2016-2021 Resurface Labs Inc.

let BRICKED = ('true' === process.env.USAGE_LOGGERS_DISABLE);

let _disabled = BRICKED;

/**
 * Utilities for all usage loggers.
 */
class UsageLoggers {

    /**
     * Disable all usage loggers.
     */
    static disable() {
        _disabled = true;
    }

    /**
     * Enable all usage loggers, except those explicitly disabled.
     */
    static enable() {
        if (!BRICKED) _disabled = false;
    }

    /**
     * Returns true if usage loggers are generally enabled.
     */
    static get enabled() {
        return !_disabled;
    }

    /**
     * Returns url to use by default.
     */
    static urlByDefault() {
        return process.env.USAGE_LOGGERS_URL;
    }

}

module.exports = UsageLoggers;
