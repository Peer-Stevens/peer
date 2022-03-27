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

// TODO: fill in helpText when the new rating metrics are added in https://github.com/Peer-Stevens/peer/issues/256
export const S_NOISE_LEVEL = { renderText: "Noise Level", helpText: "TODO" };
export const S_LIGHTING = { renderText: "Lighting", helpText: "TODO" };
export const S_SPACING = { renderText: "Spacing", helpText: "TODO" };
export const S_GUIDE_DOG_FRIENDLINESS = { renderText: "Guide Dog Friendliness", helpText: "TODO" };
export const S_STAFF_HELPFULNESS = {
	renderText:
		"Were the staff helpful and polite when you made request regarding your accomodations?",
	helpText: "TODO",
};
export const S_MENU_ACCESSIBLE = {
	renderText: "Could you easily find an accessible menu? (Braille or screen-reader compatible)",
	helpText: "TODO",
};
export const S_BATHROOM_ENTRANCE_FLOOR = {
	renderText: "Is the bathroom on the first floor?",
	helpText: "TODO",
};
export const S_CONTACTLESS_PAYMENT = {
	renderText: "Could you pay using contactless payment? (Apple Pay, etc.)",
	helpText: "TODO",
};
export const S_STAIRS_REQUIRED = {
	renderText: "Did you have to walk up stairs to receive service?",
	helpText: "TODO",
};

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
	interimRating: string,
	newRating: string,
	attribute: string,
	placeName?: string
): string => {
	return `Change your evaluation of ${
		placeName ? placeName : "this place"
	}'s ${attribute} from ${interimRating} to ${newRating}`;
};

/**
 * Returns the string needed for the props in the PopUp component in the Submit Rating page
 * @param attribute
 * @param propsType
 * @returns the string to display
 */
export const getPopUpProps = (
	attribute: string,
	propsType: "buttonAccessibilityLabel" | "text" | "modalAccessibilityLabel"
): string => {
	let displayString!: string;

	switch (propsType) {
		case "buttonAccessibilityLabel":
			displayString = `Press this button to find out more about the ${attribute} rating.`;
			break;
		case "modalAccessibilityLabel":
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
