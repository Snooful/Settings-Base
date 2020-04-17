/**
 * A wrapper for modifying settings for a particular namespace.
 */
class SettingsWrapper {
	constructor(namespace, manager) {
		/**
		 * The namespace to modify.
		 */
		this.namespace = namespace;

		/**
		 * The settings manager.
		 * @type {SettingsManager}
		 */
		this.manager = manager;
	}

	/**
	 * Sets a key for the current namespace.
	 * @param {string} key The key to set.
	 * @param {*} value The value to be set.
	 * @returns {*}
	 */
	set(key, value) {
		return this.manager.set(this.namespace, key, value);
	}

	/**
	 * Clears a key for the current namespace.
	 * @param {string} key The key to clear.
	 * @returns {*}
	 */
	clear(key) {
		return this.manager.clear(this.namespace, key);
	}

	/**
	 * Gets a key from the current namespace.
	 * @param {string} key The key to get.
	 * @returns {*}
	 */
	get(key) {
		return this.manager.get(this.namespace, key);
	}
}
module.exports = SettingsWrapper;