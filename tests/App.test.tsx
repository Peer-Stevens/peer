import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react-native";
import TestRenderer from "react-test-renderer";
import App from "../App";
import placeTypes from "../src/util/placeTypes";

// there will be errors if the tree is not unmounted after each test
// https://callstack.github.io/react-native-testing-library/docs/api#cleanup
afterEach(cleanup);

const tr = TestRenderer.create(<App />);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});

describe("Filter box tests", () => {
	it("can be clicked on to show filters button", () => {
		const { getByLabelText, getAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show filters"));
		expect(getAllByText(placeTypes[0])).toHaveLength(1);
	});

	it("does not contain non-place names in the filters", () => {
		const { getByLabelText, queryAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show filters"));
		expect(queryAllByText("potato")).toHaveLength(0);
	});

	it("should not render the filter box after the hide filters button is pressed", () => {
		const { getByLabelText, queryAllByText } = render(<App />);
		fireEvent.press(getByLabelText("Show filters"));
		fireEvent.press(getByLabelText("Hide filters"));
		expect(queryAllByText(placeTypes[0])).toHaveLength(0);
	});
});
