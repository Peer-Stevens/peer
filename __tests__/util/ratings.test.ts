import { PlaceWithA11yData } from "peer-types";
import {
	accessibilityRatingToString,
	getAverageA11yRating,
	getPlaceRatingString,
} from "../../src/util/processA11yRatings";

const sampleRating: PlaceWithA11yData["accessibilityData"] = {
	_id: "test",
	spacingAvg: 2.5,
	guideDogAvg: 2.5,
	lightingAvg: 2.5,
	noiseLevelAvg: 2.5,
	isStaffHelpfulAvg: 0.5,
	isMenuAccessibleAvg: 0.5,
	isStairsRequiredAvg: 0.5,
	isBathroomOnEntranceFloorAvg: 0.5,
	isContactlessPaymentOfferedAvg: 0.5,
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
			} as unknown as PlaceWithA11yData)
		).toBe(2.5);
	});
	it("returns the right strings", () => {
		expect(
			getPlaceRatingString({
				accessibilityData: sampleRating,
			} as unknown as PlaceWithA11yData)
		).toBe("moderate");
		expect(
			accessibilityRatingToString(
				getAverageA11yRating({
					accessibilityData: sampleRating,
				} as unknown as PlaceWithA11yData)
			)
		).toBe("moderate");
	});
});
