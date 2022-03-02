import React from "react";
import { cleanup, render, RenderAPI } from "@testing-library/react-native";
import {
	S_CANCEL,
	PLACE_ATTRIBUTES,
	S_SUBMIT,
	getIncrementRatingButtonLabel,
} from "../../src/util/strings";
import SubmitRatingScreen, { DEFAULT_INTERIM_RATING } from "../../src/screens/SubmitRatingScreen";

const mockNameString = "Julio's OneDrive Installation Services";
const mockPlaceID = "oiluj";

let tr: RenderAPI;
beforeEach(() => {
	// press place name
	tr = render(
		<SubmitRatingScreen placeID={mockPlaceID} placeName={mockNameString} setPage={jest.fn()} />
	);
});
afterEach(cleanup);

describe("Submit rating screen tests", () => {
	it("renders an image", () => {
		expect(tr.queryByLabelText(`No image available for ${mockNameString}`)).not.toBeNull();
	});

	it("renders the name of the place", () => {
		expect(tr.queryByText(mockNameString)).not.toBeNull();
	});

	it("renders a plus and minus button for each rating", () => {
		for (const attribute of PLACE_ATTRIBUTES) {
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel(
						true,
						DEFAULT_INTERIM_RATING,
						attribute.type,
						mockNameString
					)
				)
			).not.toBeNull();
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel(
						false,
						DEFAULT_INTERIM_RATING,
						attribute.type,
						mockNameString
					)
				)
			).not.toBeNull();
		}
	});

	it("renders a cancel button", () => {
		expect(tr.queryByText(S_CANCEL)).not.toBeNull();
	});

	it("renders a submit button", () => {
		expect(tr.queryByText(S_SUBMIT)).not.toBeNull();
	});

	it("renders a plus and minus button even if the place name is missing", () => {
		// no name!
		const tr = render(<SubmitRatingScreen placeID={mockPlaceID} setPage={jest.fn()} />);

		for (const attribute of PLACE_ATTRIBUTES) {
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel(true, DEFAULT_INTERIM_RATING, attribute.type)
				)
			).not.toBeNull();
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel(false, DEFAULT_INTERIM_RATING, attribute.type)
				)
			).not.toBeNull();
		}
	});
});
