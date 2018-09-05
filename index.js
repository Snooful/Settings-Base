const debug = require("debug")("snooful:settings");

/**
 * A base settings manager for managing from the cache.
 */
class SettingsManager {
	constructor() {
		this.init();

		/**
		 * The settings cache.
		 */
		this.settings = {};
	}

	/**
	 * Initializes the database.
	 */
	init() {
		debug(`settings manager does not initialize`);
	}

	update() {
		debug(`settings manager does not update`);
	}

	/**
	 * Sets a key for a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to save the setting under.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 */
	async set(subreddit, key, value) {
		// Update our cache
		if (!this.settings[subreddit]) {
			debug(`making settings section for ${subreddit} as it did not have one`);
			this.settings[subreddit] = {};
		}

		debug(`set '${key}' to '${value}' for ${subreddit}`);
		this.settings[subreddit][key] = value;

		return this.update(subreddit);
	}

	/**
	 * Clears a key for a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to clear the setting in.
	 * @param {string} key The key to clear.
	 */
	async clear(subreddit, key) {
		// Update our cache
		if (!this.settings[subreddit]) {
			debug(`making settings section for ${subreddit} as it did not have one`);
			this.settings[subreddit] = {};
		}

		debug(`cleared '${key}' for ${subreddit}`);
		this.settings[subreddit][key] = undefined;

		return this.update(subreddit);
	}

	/**
	 * Gets a key from a given subreddit.
	 * @param {string} subreddit The subreddit/namespace to get the setting under.
	 * @param {string} key The key to get.
	 * @returns *
	 */
	get(subreddit, key) {
		if (this.settings[subreddit]) {
			return this.settings[subreddit][key];
		} else {
			return undefined;
		}
	}

	/**
	 * A wrapper around the settings manager with methods applying to the current subreddit.
	 */
	subredditWrapper(subreddit) {
		return {
			/**
			 * Sets a key for the current subreddit namespace.
			 * @param {string} key The key to set.
			 * @param {*} value The value to be set.
			 */
			set: (key, value) => this.set(subreddit, key, value),
			/**
			 * Clears a key for the current subreddit namespace.
			 * @param {string} key The key to clear.
			 */
			clear: key => this.clear(subreddit, key),
			/**
			 * Gets a key from the current subreddit namespace.
			 * @param {string} key The key to get.
			 * @returns *
			 */
			get: key => this.get(subreddit, key),
			manager: this,
		}
	}
}

module.exports = {
	BaseSettingsManager,
	debug,
};