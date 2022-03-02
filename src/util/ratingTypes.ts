import { Rating as PeerRatingType } from "peer-types";

// index signature: below defines what Rating types can be
// indexed by (indexing looks like: ex. myRating[braille])
export interface Rating extends PeerRatingType {
	[index: string]: string | number | null | Date | undefined;
}
