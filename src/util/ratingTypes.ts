import BoundedDial from "./boundedDial";
import { Rating as PeerRatingType } from "peer-types";

export interface Rating extends PeerRatingType {
	// index signature: below defines what Rating types can be
	// indexed by (indexing looks like: ex. myRating[braille])
	[index: string]: string | number | null | Date | undefined;
}

export const buildRatingValuesDial = (
	start: number
): BoundedDial<{ value: number | null; text: string }> => {
	return new BoundedDial(
		[
			{ value: 1, text: "1" },
			{ value: 1.5, text: "1.5" },
			{ value: 2, text: "2" },
			{ value: 2.5, text: "2.5" },
			{ value: null, text: "N/A" },
			{ value: 3, text: "3" },
			{ value: 3.5, text: "3.5" },
			{ value: 4, text: "4" },
			{ value: 4.5, text: "4.5" },
			{ value: 5, text: "5" },
		],
		start
	);
};

export const ratingToIndex = (rating: number | null) => {
	if (rating === null) {
		return 4;
	}
	const ratingValuesMap: Record<number, number> = {
		1: 0,
		1.5: 1,
		2: 2,
		2.5: 3,
		// null : 4 (if that was valid),
		3: 5,
		3.5: 6,
		4: 7,
		4.5: 8,
		5: 9,
	};
	return ratingValuesMap[rating];
};
