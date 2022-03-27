/**
 * Represents a list of values that can be traversed through
 * both ways and prevent traversing past the ends of the list.
 */
class BoundedDial<T> {
	#current: number;
	#arr: Array<T>;

	constructor(arr: Array<T>, start = 0) {
		this.#current = start;
		this.#arr = arr;
	}

	/**
	 * Return the current value of the dial.
	 * @returns the current value
	 */
	current() {
		return this.#arr[this.#current];
	}

	/**
	 * Sets the current value of the dial to be one higher
	 * if the maximum bound has not been reached.
	 * @returns this dial with the previous value
	 */
	next() {
		this.#current++;

		// we've reached the maximum bound
		if (this.#current > this.#arr.length - 1) {
			this.#current = this.#arr.length - 1;
		}
		return this;
	}

	/**
	 * Gets the value of the next current value
	 * without changing the dial state.
	 * @returns the next value
	 */
	peekNext() {
		return this.__get(this.#current + 1);
	}

	/**
	 * Sets the current value of the dial to be one lower
	 * if the minimum bound has not been reached.
	 * @returns this dial with the next value
	 */
	prev() {
		this.#current--;

		// we've reached the minimum bound
		if (this.#current < 0) {
			this.#current = 0;
		}

		return this;
	}

	/**
	 * Gets the value of the previous current value
	 * without changing the dial state.
	 * @returns the previous value
	 */
	peekPrev() {
		return this.__get(this.#current - 1);
	}

	/**
	 * Returns the length of the dial.
	 * @returns the length
	 */
	length() {
		return this.#arr.length;
	}

	// Private methods

	// private methods are "not enabled" or something?
	// I wanted to use # since that's the actual prefix
	// for private methods but for now just know that
	// using these would be very naughty

	__get(index: number) {
		let temp: number = index;

		if (temp > this.#arr.length - 1) {
			temp = this.#arr.length - 1;
		} else if (temp < 0) {
			temp = 0;
		}

		return this.#arr[temp];
	}
}

export default BoundedDial;
