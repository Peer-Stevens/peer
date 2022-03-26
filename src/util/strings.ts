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
export const S_NOISE_LEVEL = {
	renderText: "Noise Level",
	helpText:
		"A lower rating may indicate that the restaurant is loud enough to be disorienting, distracting, or too noisy to communicate. Higher ratings indicate that users felt comfortable with the noise level in the restaurant.",
};
export const S_LIGHTING = {
	renderText: "Lighting",
	helpText:
		"For users who have sensitivity to light, a lower rating may indicate a restaurant which is too bright or too dark. Higher ratings indicate that light-sensitive users felt comfortable with the lighting in the restaurant.",
};
export const S_SPACING = {
	renderText: "Spacing",
	helpText:
		"Higher ratings indicate that the restaurant's layout is open and spaced out enough for customer to navigate without feeling cramped or overwhelmed.",
};
export const S_GUIDE_DOG_FRIENDLINESS = {
	renderText: "Guide Dog Friendliness",
	helpText:
		"Higher ratings indicate that the staff are accepting of guide dogs, and the restaurant environment is not distracting to guide dogs.",
};
export const S_STAFF_HELPFULNESS = {
	renderText: "Staff helpfulness and politness, especially regarding customer accomodations.",
	helpText:
		"Lower ratings can indicate bad experiences with staff or mistreatment of customers. Higher ratings indicate that the staff are helpful to customers and are respectful of their needs.",
};
export const S_MENU_ACCESSIBLE = {
	renderText: "Menu Accessibility",
	helpText:
		"Does the restaurant have a menu that was accessible to you? Some examples include a screen-reader-compatible website menu, or a braille menu.",
};
export const S_BATHROOM_ENTRANCE_FLOOR = {
	renderText: "First Floor Bathroom",
	helpText: "Does the restaurant have an accessible bathroom on the first floor?",
};
export const S_CONTACTLESS_PAYMENT = {
	renderText: "Contactless Payment",
	helpText:
		"Could you pay for your meal using contactless payment? Examples include Apple Pay or Android Pay.",
};
export const S_STAIRS_REQUIRED = {
	renderText: "Stairs",
	helpText:
		"Were there stairs required for you to get into the restaurant? Or, is there a way to get into the restaurant without stairs?",
};

export const S_SUBMIT = "Submit";
export const S_CANCEL = "Cancel";
export const S_GOBACK = "Go Back";
export const START_WALKING = "Open in Maps";
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
	propsType: "buttonAccessibilityLabel" | "text" | "modalAccessibilityLabel"
): string => {
	let displayString!: string;

	switch (propsType) {
		case "buttonAccessibilityLabel":
			displayString = `Press this button to find out more about the rating for ${attribute}.`;
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
