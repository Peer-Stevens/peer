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
		const { getByLabelText, getAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show selections"));
		expect(getAllByText(placeTypeLabels[0])).toHaveLength(1);
	});

	it("does not contain non-place types in the selections", () => {
		const { getByLabelText, queryAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show selections"));
		expect(queryAllByText("potato")).toHaveLength(0);
	});

	it("should not render the slection box after the hide selections button is pressed", () => {
		const { getByLabelText, queryAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show selections"));
		fireEvent.press(getByLabelText("Hide selections"));
		expect(queryAllByText(placeTypeLabels[0])).toHaveLength(0);
	});
});
