const debug = require("debug")("snooful:settings");
module.exports.debug = debug;

const SettingsWrapper = require("./wrapper.js");

/**
 * A base settings manager for managing from the cache.
 */
class SettingsManager {
	constructor() {
		/**
		 * The settings cache.
		 */
		this.settings = {};
	}

	/**
	 * Initializes the database.
	 * @abstract
	 * @returns {boolean} The success of the initialization.
	 */
	initialize() {
		debug("settings manager does not initialize");
		return false;
	}

	/**
	 * An alias for {@link SettingsManager#initialize}.
	 * @deprecated Use {@link SettingsManager#initialize} instead.
	 * @param {...*} args The arguments to pass through.
	 * @returns {*}
	 */
	init(...args) {
		return this.initialize(...args);
	}

	/**
	 * Updates the database.
	 * @abstract
	 * @returns {boolean} The success of the update.
	 */
	update() {
		debug("settings manager does not update");
		return false;
	}

	/**
	 * Ensures the cache has a settings object for a given namespace.
	 * @param {string} namespace The namespace to create a settings object in.
	 * @returns {boolean} Whether a settings object was created in the cache.
	 */
	ensure(namespace) {
		if (!this.settings[namespace]) {
			this.settings[namespace] = {};
			debug("made settings object in the '%s' namespace as it did not exist before", namespace);

			return true;
		}

		return false;
	}

	/**
	 * Sets a key for a given namespace.
	 * @param {string} namespace The namespace to save the setting under.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 */
	async set(namespace, key, value) {
		this.ensure(namespace);

		debug("set '%s' to '%s' in the '%s' namespace", key, value, namespace);
		this.settings[namespace][key] = value;

		return this.update(namespace);
	}

	/**
	 * Clears a key for a given namespace.
	 * @param {string} namespace The namespace to clear the setting in.
	 * @param {string} key The key to clear.
	 */
	async clear(namespace, key) {
		this.ensure(namespace);

		debug("cleared '%s' in the '%s' namespace", key, namespace);
		this.settings[namespace][key] = undefined;

		return this.update(namespace);
	}

	/**
	 * Gets a key from a given namespace.
	 * @param {string} namespace The namespace to get the setting under.
	 * @param {string} key The key to get.
	 * @returns *
	 */
	get(namespace, key) {
		if (this.settings[namespace]) {
			return this.settings[namespace][key];
		} else {
			return undefined;
		}
	}

	/**
	 * Creates a wrapper around the settings manager with functions applying to the current namespace.
	 * @param {string} namespace The namespace to get the wrapper of.
	 * @returns {SettingsWrapper} A settings wrapper with the context of the current namespace.
	 */
	createWrapper(namespace) {
		return new SettingsWrapper(namespace, this);
	}
}

/**
 * The extension to use in the settings file.
 * @abstract
 */
SettingsManager.extension = "";

module.exports = SettingsManager;
