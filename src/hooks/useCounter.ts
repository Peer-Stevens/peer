import { useState } from "react";

export const useCounter = (
	initialRating: number
): {
	counter: number;
	increment: (c: number) => void;
	decrement: (c: number) => void;
} => {
	const [counter, setCounter] = useState<number>(initialRating);

	const increment = (c: number) => {
		if (c === 5) {
			return;
		}
		setCounter(c + 0.5);
	};
	const decrement = (c: number) => {
		if (c === 0.5) {
			return;
		}
		setCounter(c - 0.5);
	};

	return { counter, increment, decrement };
};
