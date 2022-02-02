/**
 * File to store string constants and string getter
 * functions for the project.
 *
 * String constants have the S_ prefix.
 */

// Constants

/**
 * Capitalized attributes of a place that can be rated by a user.
 */

export const S_NAVIGABILITY = "Navigability";
export const S_SENSORY_AIDS = "Sensory Aids";
export const S_STAFF_HELPFULNESS = "Staff Helpfulness";
export const S_GUIDE_DOG_FRIENDLINESS = "Guide Dog Friendliness";
export const PLACE_ATTRIBUTES = [
	S_NAVIGABILITY,
	S_SENSORY_AIDS,
	S_STAFF_HELPFULNESS,
	S_GUIDE_DOG_FRIENDLINESS,
];
export const S_SUBMIT = "Submit";
export const S_CANCEL = "Cancel";

// Functions

/**
 * Returns the string for the label for the button to increment a potential rating
 * before it is submitted.
 * @param increment true for incrementing, false for decrementing
 * @param interimRating the rating that would be submitted if the user hit "Submit"
 * @param attribute the attribute of the place that the user is rating
 * @param placeName the name of the place, optional
 * @returns an a11y label
 */
export const getIncrementRatingButtonLabel = (
	increment: boolean,
	interimRating: number,
	attribute: string,
	placeName?: string
): string => {
	const nextRatingAbove = interimRating + 0.5;
	const nextRatingBelow = interimRating - 0.5;
	return `${increment ? "Increase" : "Decrease"} your evaluation of ${
		placeName ? placeName : "this place"
	}'s ${attribute} from ${interimRating} to ${increment ? nextRatingAbove : nextRatingBelow}`;
};
