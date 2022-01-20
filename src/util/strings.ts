/**
 * File to store string constants and string getter
 * functions for the project.
 */

// Constants

/**
 * Capitalized attributes of a place that can be rated by a user.
 */
export const PLACE_ATTRIBUTES = [
	"Navigability",
	"Sensory Aids",
	"Staff Helpfulness",
	"Guide Dog Friendliness",
];
export const SUBMIT = "Submit";
export const CANCEL = "Cancel";

// Functions

/**
 * Returns the string for the label for the button to incrememt a potential rating
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
