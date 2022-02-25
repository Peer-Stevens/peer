import { PlaceWithAccessibilityData } from "peer-types";
import {
	accessibilityRatingToString,
	getAverageA11yRating,
	getPlaceRatingString,
} from "../../src/util/processA11yRatings";

const sampleRating: PlaceWithAccessibilityData["accessibilityData"] = {
	_id: "test",
	spacingAvg: 2.5,
	guideDogAvg: 2.5,
	lightingAvg: 2.5,
	noiseLevelAvg: 2.5,
	isStaffHelpfulAvg: 0.8,
	isMenuAccessibleAvg: 0.7,
	isBathroomOnEntranceFloorAvg: 0.9,
	isContactlessPaymentOfferedAvg: 0.2,
	isStairsRequiredAvg: 1.0,
	promotion: {
		monthly_budget: 0,
		max_cpc: 0,
	},
};

describe("a11y util function tests", () => {
	it("calculates the right average", () => {
		expect(
			getAverageA11yRating({
				accessibilityData: sampleRating,
			} as unknown as PlaceWithAccessibilityData)
		).toBeGreaterThanOrEqual(2.719);
	});
	it("returns the right strings", () => {
		expect(
			getPlaceRatingString({
				accessibilityData: sampleRating,
			} as unknown as PlaceWithAccessibilityData)
		).toBe("moderate");
		expect(
			accessibilityRatingToString(
				getAverageA11yRating({
					accessibilityData: sampleRating,
				} as unknown as PlaceWithAccessibilityData)
			)
		).toBe("moderate");
	});
});
