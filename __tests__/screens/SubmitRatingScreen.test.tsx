import React from "react";
import { cleanup, render, RenderAPI } from "@testing-library/react-native";
import { S_GOBACK, S_SUBMIT, getIncrementRatingButtonLabel } from "../../src/util/strings";
import SubmitRatingScreen, {
	fieldInfos,
} from "../../src/screens/SubmitRatingScreen/SubmitRatingScreen";

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
		for (const fieldInfo of fieldInfos) {
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel("N/A", "3", fieldInfo.renderText, mockNameString)
				)
			).not.toBeNull();
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel(
						"N/A",
						"2.5",
						fieldInfo.renderText,
						mockNameString
					)
				)
			).not.toBeNull();
		}
	});

	it("renders a cancel button", () => {
		expect(tr.queryByText(S_GOBACK)).not.toBeNull();
	});

	it("renders a submit button", () => {
		expect(tr.queryByText(S_SUBMIT)).not.toBeNull();
	});

	it("renders a plus and minus button even if the place name is missing", () => {
		// no name!
		const tr = render(<SubmitRatingScreen placeID={mockPlaceID} setPage={jest.fn()} />);

		for (const fieldInfo of fieldInfos) {
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel("N/A", "3", fieldInfo.renderText)
				)
			).not.toBeNull();
			expect(
				tr.queryAllByLabelText(
					getIncrementRatingButtonLabel("N/A", "2.5", fieldInfo.renderText)
				)
			).not.toBeNull();
		}
	});
});
