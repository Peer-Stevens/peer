import { PlaceWithA11yData } from "peer-types";

export const getAverageA11yRating = (place: PlaceWithA11yData): number => {
	if (!place.accessibilityData) return -1;
	// add each of the average field values together
	const total =
		Number(place.accessibilityData.spacingAvg) +
		Number(place.accessibilityData.guideDogAvg) +
		Number(place.accessibilityData.lightingAvg) +
		Number(place.accessibilityData.noiseLevelAvg) +
		Number(place.accessibilityData.isStaffHelpfulAvg) +
		Number(place.accessibilityData.isMenuAccessibleAvg) +
		Number(place.accessibilityData.isStairsRequiredAvg) +
		Number(place.accessibilityData.isBathroomOnEntranceFloorAvg) +
		Number(place.accessibilityData.isContactlessPaymentOfferedAvg);
	const count = 5;
	return total / count;
};

export const accessibilityRatingToString = (rating: number): string => {
	if (rating >= 0 && rating < 1) return "low";
	else if (rating >= 1 && rating < 2) return "somewhat low";
	else if (rating >= 2 && rating < 3) return "moderate";
	else if (rating >= 3 && rating < 4) return "good";
	else if (rating >= 4 && rating <= 5) return "very good";
	else return "no";
};

export const getPlaceRatingString = (place: PlaceWithA11yData): string =>
	accessibilityRatingToString(getAverageA11yRating(place));
