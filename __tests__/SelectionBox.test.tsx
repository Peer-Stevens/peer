import React from "react";
import { cleanup, render, fireEvent, waitFor } from "@testing-library/react-native";
import TestRenderer from "react-test-renderer";
import App from "../App";
import { enabledFiltersMap } from "../src/components/SelectionBox";
import { useNearbyPlaces } from "../src/hooks/useNearbyPlaces";
import { PlaceWithAccesibilityData } from "../src/util/placeTypes";

jest.mock("../src/hooks/useNearbyPlaces");
const mockUseNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
mockUseNearbyPlaces.mockImplementation(
	(placeType?): { nearbyPlaces: PlaceWithAccesibilityData[] | undefined } => {
		if (placeType === "") {
			return { nearbyPlaces: [{ name: "Could be anywhere" } as PlaceWithAccesibilityData] };
		}
		return { nearbyPlaces: [{ name: "Gotta be a place to eat" } as PlaceWithAccesibilityData] };
	}
);

// there will be errors if the tree is not unmounted after each test
// https://callstack.github.io/react-native-testing-library/docs/api#cleanup
afterEach(cleanup);

const tr = TestRenderer.create(<App />);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});

describe("Selection box tests", () => {
	it("can be clicked on to show selections button", () => {
		// Arrange
		const { getByLabelText, getAllByText } = render(<App />);

		// Act
		fireEvent.press(getByLabelText("Show selections"));

		// Assert
		expect(getAllByText(enabledFiltersMap[0].label)).toHaveLength(1);
	});

	it("does not contain non-place types in the selections", () => {
		// Arrange
		const { getByLabelText, queryAllByText } = render(<App />);

		// Act
		fireEvent.press(getByLabelText("Show selections"));

		// Assert
		expect(queryAllByText("potato")).toHaveLength(0);
	});

	it("should not render the selection box after the hide selections button is pressed", () => {
		// Arrange
		const { getByLabelText, queryAllByText } = render(<App />);

		// Act
		fireEvent.press(getByLabelText("Show selections"));
		fireEvent.press(getByLabelText("Hide selections"));

		// Assert
		expect(queryAllByText(enabledFiltersMap[0].label)).toHaveLength(0);
	});

	it("should read aloud that nothing is selected when used with a screen reader", () => {
		// Arrange
		const { getByLabelText } = render(<App />);

		// Act
		const chevronButton = getByLabelText("Show selections");

		// Assert
		expect(chevronButton.props.accessibilityHint).toBeDefined();
		expect(chevronButton.props.accessibilityHint).toContain("None");
	});

	it("should read aloud the selected items when used with a screen reader", () => {
		// Arrange
		const { getByLabelText } = render(<App />);

		// Act
		const chevronButton = getByLabelText("Show selections");
		fireEvent.press(chevronButton);

		// Assert
		for (const filterObj of enabledFiltersMap) {
			const checkbox = getByLabelText(filterObj.label);
			fireEvent.press(checkbox);
			expect(chevronButton.props.accessibilityHint).toBeDefined();
			expect(chevronButton.props.accessibilityHint).toContain(filterObj.value);
		}
	});

	it("should affect the results of the place list when a selection is chosen", async () => {
		const { getByText, queryByText, getByLabelText } = render(<App />);

		const chevronButton = getByLabelText("Show selections");
		fireEvent.press(chevronButton);
		const topLabel = getByText(enabledFiltersMap[0].label);
		fireEvent.press(topLabel);

		await waitFor(() => {
			expect(queryByText("Gotta be a place to eat")).not.toBeNull();
			expect(queryByText("Could be anywhere")).toBeNull();
		});
	});

	it("should allow for each selection to be unselected", async () => {
		const { getByText, queryByText, getByLabelText } = render(<App />);

		const chevronButton = getByLabelText("Show selections");
		fireEvent.press(chevronButton);

		const topLabel = getByText(enabledFiltersMap[0].label);
		fireEvent.press(topLabel); // press it
		fireEvent.press(topLabel); // unpress it

		await waitFor(() => {
			expect(queryByText("Gotta be a place to eat")).toBeNull();
			expect(queryByText("Could be anywhere")).not.toBeNull();
		});
	});
});
