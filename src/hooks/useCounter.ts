import { useState } from "react";

const MAX_COUNT = 5;
const MIN_COUNT = 0;
const INCREMENT_VAL = 0.5;

export const useCounter = (
	initialRating: number
): {
	counter: number;
	increment: (c: number) => void;
	decrement: (c: number) => void;
} => {
	const [counter, setCounter] = useState<number>(initialRating);

	const increment = (c: number) => {
		if (c === MAX_COUNT) {
			return;
		}
		setCounter(c + INCREMENT_VAL);
	};
	const decrement = (c: number) => {
		if (c === MIN_COUNT) {
			return;
		}
		setCounter(c - INCREMENT_VAL);
	};

	return { counter, increment, decrement };
};
