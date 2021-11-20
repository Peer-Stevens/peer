import { PlaceWithAccesibilityData } from "../src/util/placeTypes";
import {
	accessibilityRatingToString,
	getAverageA11yRating,
	getPlaceRatingString,
} from "../src/util/processA11yRatings";

const sampleRating: PlaceWithAccesibilityData["accessibilityData"] = {
	_id: "test",
	avgBraille: 2.5,
	avgFontReadability: 2.5,
	avgGuideDogFriendly: 2.5,
	avgStaffHelpfulness: 2.5,
	avgNavigability: 2.5,
};

describe("a11y util function tests", () => {
	it("calculates the right average", () => {
		expect(
			getAverageA11yRating({
				accessibilityData: sampleRating,
			} as unknown as PlaceWithAccesibilityData)
		).toBe(2.5);
	});
	it("returns the right strings", () => {
		expect(
			getPlaceRatingString({
				accessibilityData: sampleRating,
			} as unknown as PlaceWithAccesibilityData)
		).toBe("moderate");
		expect(
			accessibilityRatingToString(
				getAverageA11yRating({
					accessibilityData: sampleRating,
				} as unknown as PlaceWithAccesibilityData)
			)
		).toBe("moderate");
	});
});
