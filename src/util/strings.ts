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

export const S_NAVIGABILITY = { type: "Navigability", helpText: "TODO" }; // TODO: fill in helpText when the new rating metrics are added in https://github.com/Peer-Stevens/peer/issues/256
export const S_SENSORY_AIDS = { type: "Sensory Aids", helpText: "TODO" };
export const S_STAFF_HELPFULNESS = { type: "Staff Helpfulness", helpText: "TODO" };
export const S_GUIDE_DOG_FRIENDLINESS = { type: "Guide Dog Friendliness", helpText: "TODO" };
export const PLACE_ATTRIBUTES = [
	S_NAVIGABILITY,
	S_SENSORY_AIDS,
	S_STAFF_HELPFULNESS,
	S_GUIDE_DOG_FRIENDLINESS,
];
export const S_SUBMIT = "Submit";
export const S_CANCEL = "Cancel";
export const START_WALKING = "Start walking here";
export const MAP_ANCHOR_A11Y = "Tap to navigate to this place.";

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

/**
 * Returns the string needed for the props in the PopUp component in the Submit Rating page
 * @param attribute
 * @param propsType
 * @returns the string to display
 */
export const getPopUpProps = (
	attribute: string,
	propsType: "buttonAccessibility" | "text" | "modalAccessibility"
): string => {
	let displayString!: string;

	switch (propsType) {
		case "buttonAccessibility":
			displayString = `Press this button to find out more about the ${attribute} rating.`;
			break;
		case "modalAccessibility":
			displayString = `A pop up that explains ${attribute}.`;
			break;
		case "text":
			displayString = `${attribute} Explained`;
			break;
	}
	return displayString;
};

export const getMapAnchorA11yLabel = (destination: string) => {
	return `Tap to navigate to ${destination}`;
};
