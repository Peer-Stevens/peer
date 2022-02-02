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
