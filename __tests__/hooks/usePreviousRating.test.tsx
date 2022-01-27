import React from "react";
import { Text, View } from "react-native";
import { usePreviousRating } from "../../src/hooks/usePreviousRating";
import axios from "axios";
import { Rating } from "../../src/util/ratingTypes";
import { render, RenderAPI, waitFor } from "@testing-library/react-native";

const mockRating: Rating = {
	_id: "7065616e7574627574746572",
	userID: "67726170656a656c6c79",
	placeID: "ChIJZxUD-qwtpTgRbqMViMXDJUg",
	braille: 3,
	fontReadability: 3,
	navigability: 3,
	staffHelpfulness: 3,
	guideDogFriendly: 3,
	comment: null,
	dateCreated: new Date(),
};

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
mockAxiosGet.mockResolvedValue({ data: mockRating });

const PreviousRatingComponent: React.FC = () => {
	const previousRating = usePreviousRating("peer@gmail.com", "ChIJZxUD-qwtpTgRbqMViMXDJUg");

	if (previousRating) {
		return (
			<View>
				<Text>{previousRating.braille}</Text>
				<Text>{previousRating.fontReadability}</Text>
				<Text>{previousRating.guideDogFriendly}</Text>
				<Text>{previousRating.navigability}</Text>
				<Text>{previousRating.staffHelpfulness}</Text>
			</View>
		);
	} else {
		return (
			<View>
				<Text>Null</Text>
			</View>
		);
	}
};

let tr: RenderAPI;
beforeEach(() => {
	tr = render(<PreviousRatingComponent />);
});

describe("usePreviousRating tests", () => {
	it("gets the rating if the server returns a rating", async () => {
		await waitFor(() => {
			expect(tr.getAllByText("3")).toBeDefined();
		});
	});

	it("returns null if the user has not rated the place yet", async () => {
		mockAxiosGet.mockResolvedValueOnce(null);
		await waitFor(() => {
			expect(tr.getByText("Null")).toBeDefined();
		});
	});
});
