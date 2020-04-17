/**
 * The extension to use in the settings file.
 * @abstract
 */
module.exports.extension = "";

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
	init() {
		debug("settings manager does not initialize");
		return false;
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
	 * Sets a key for a given namespace.
	 * @param {string} namespace The namespace to save the setting under.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 */
	async set(namespace, key, value) {
		// Update our cache
		if (!this.settings[namespace]) {
			debug(`making settings section for ${namespace} as it did not have one`);
			this.settings[namespace] = {};
		}

		debug(`set '${key}' to '${value}' for ${namespace}`);
		this.settings[namespace][key] = value;

		return this.update(namespace);
	}

	/**
	 * Clears a key for a given namespace.
	 * @param {string} namespace The namespace to clear the setting in.
	 * @param {string} key The key to clear.
	 */
	async clear(namespace, key) {
		// Update our cache
		if (!this.settings[namespace]) {
			debug(`making settings section for ${namespace} as it did not have one`);
			this.settings[namespace] = {};
		}

		debug(`cleared '${key}' for ${namespace}`);
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
module.exports.SettingsManager = SettingsManager;