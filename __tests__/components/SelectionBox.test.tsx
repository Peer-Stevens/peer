import React from "react";
import { cleanup, render, fireEvent, waitFor, RenderAPI } from "@testing-library/react-native";
import { enabledFiltersMap } from "../../src/components/SelectionBox";
import { useNearbyPlaces } from "../../src/hooks/useNearbyPlaces";
import { PlaceWithAccessibilityData } from "peer-types";
import { useFetchPlace } from "../../src/hooks/useFetchPlace";
import MainScreen from "../../src/screens/MainScreen";

jest.mock("../../src/hooks/useNearbyPlaces");
const mockUseNearbyPlaces = useNearbyPlaces as jest.MockedFunction<typeof useNearbyPlaces>;
mockUseNearbyPlaces.mockImplementation(
	(placeType?): { nearbyPlaces: PlaceWithAccessibilityData[] | undefined } => {
		if (placeType === "") {
			return { nearbyPlaces: [{ name: "Could be anywhere" } as PlaceWithAccessibilityData] };
		}
		return {
			nearbyPlaces: [{ name: "Gotta be a place to eat" } as PlaceWithAccessibilityData],
		};
	}
);

jest.mock("../../src/hooks/useFetchPlace");
const mockUseFetchPlace = useFetchPlace as jest.MockedFunction<typeof useFetchPlace>;

const mockPlaceDetails: PlaceWithAccessibilityData = {
	place_id: "oiluj",
};

mockUseFetchPlace.mockReturnValue({
	placeDetails: mockPlaceDetails,
	isLoading: false,
});
let tr: RenderAPI;

beforeEach(() => {
	tr = render(<MainScreen />);
});

// there will be errors if the tree is not unmounted after each test
// https://callstack.github.io/react-native-testing-library/docs/api#cleanup
afterEach(cleanup);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});

describe.skip("Selection box tests", () => {
	it("can be clicked on to show selections button", () => {
		// Act
		fireEvent.press(tr.getByLabelText("Show selections"));

		// Assert
		expect(tr.getAllByText(enabledFiltersMap[0].label)).toHaveLength(1);
	});

	it("does not contain non-place types in the selections", () => {
		// Act
		fireEvent.press(tr.getByLabelText("Show selections"));

		// Assert
		expect(tr.queryAllByText("potato")).toHaveLength(0);
	});

	it("should not render the selection box after the hide selections button is pressed", () => {
		// Act
		fireEvent.press(tr.getByLabelText("Show selections"));
		fireEvent.press(tr.getByLabelText("Hide selections"));

		// Assert
		expect(tr.queryAllByText(enabledFiltersMap[0].label)).toHaveLength(0);
	});

	it("should read aloud that nothing is selected when used with a screen reader", () => {
		// Act
		const chevronButton = tr.getByLabelText("Show selections");

		// Assert
		expect(chevronButton.props.accessibilityHint).toBeDefined();
		expect(chevronButton.props.accessibilityHint).toContain("None");
	});

	it("should read aloud the selected items when used with a screen reader", () => {
		// Act
		const chevronButton = tr.getByLabelText("Show selections");
		fireEvent.press(chevronButton);

		// Assert
		for (const filterObj of enabledFiltersMap) {
			const checkbox = tr.getByLabelText(filterObj.label);
			fireEvent.press(checkbox);
			expect(chevronButton.props.accessibilityHint).toBeDefined();
			expect(chevronButton.props.accessibilityHint).toContain(filterObj.value);
		}
	});

	it("should affect the results of the place list when a selection is chosen", async () => {
		const chevronButton = tr.getByLabelText("Show selections");
		fireEvent.press(chevronButton);
		const topLabel = tr.getByText(enabledFiltersMap[0].label);
		fireEvent.press(topLabel);

		await waitFor(() => {
			expect(tr.queryByText("Gotta be a place to eat")).not.toBeNull();
			expect(tr.queryByText("Could be anywhere")).toBeNull();
		});
	});

	it("should allow for each selection to be unselected", async () => {
		const chevronButton = tr.getByLabelText("Show selections");
		fireEvent.press(chevronButton);

		const topLabel = tr.getByText(enabledFiltersMap[0].label);
		fireEvent.press(topLabel); // press it
		fireEvent.press(topLabel); // unpress it

		await waitFor(() => {
			expect(tr.queryByText("Gotta be a place to eat")).toBeNull();
			expect(tr.queryByText("Could be anywhere")).not.toBeNull();
		});
	});
});
