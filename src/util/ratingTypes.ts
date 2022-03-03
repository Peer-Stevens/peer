import type { Place } from "@googlemaps/google-maps-services-js";

// TODO: export database types to own package
// so that they do not need to be managed twice
export interface Rating {
	// index signature: below defines what Rating types can be
	// indexed by (indexing looks like: ex. myRating[braille])
	[index: string]: string | number | null | Date | undefined;
	_id?: string;
	userID: string;
	placeID: Place["place_id"];
	braille: number | null;
	fontReadability: number | null;
	staffHelpfulness: number | null;
	navigability: number | null;
	guideDogFriendly: number | null;
	comment: string | null;
	dateCreated: Date;
	dateEdited?: Date;
}

export enum RatingValue {
	ONE = 1,
	ONE_HALF = 1.5,
	TWO = 2,
	TWO_HALF = 2.5,
	NOT_ASSESSED = 3,
	THREE = 3.5,
	THREE_HALF = 4,
	FOUR = 4.5,
	FOUR_HALF = 5,
	FIVE = 5.5,
}

export const ratingValuesMap: Record<RatingValue, number | null> = {
	1: 1,
	1.5: 1.5,
	2: 2,
	2.5: 2.5,
	3: null,
	3.5: 3,
	4: 3.5,
	4.5: 4,
	5: 4.5,
	5.5: 5,
};
