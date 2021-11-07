import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react-native";
import TestRenderer from "react-test-renderer";
import App from "../App";
import { placeTypeLabels } from "../src/util/placeTypes";

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
		expect(getAllByText(placeTypeLabels[0])).toHaveLength(1);
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
		expect(queryAllByText(placeTypeLabels[0])).toHaveLength(0);
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
		for (const placeTypeLabel of placeTypeLabels) {
			const checkbox = getByLabelText(placeTypeLabel);
			fireEvent.press(checkbox);
			expect(chevronButton.props.accessibilityHint).toBeDefined();
			expect(chevronButton.props.accessibilityHint).toContain(placeTypeLabel);
		}
	});
});