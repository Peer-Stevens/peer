import React from "react";
import { cleanup } from "@testing-library/react-native"
import TestRenderer from "react-test-renderer";
import App from "../App";

// there will be errors if the tree is not unmounted after each test
// https://callstack.github.io/react-native-testing-library/docs/api#cleanup
afterEach(cleanup)

const tr = TestRenderer.create(<App />);

it("renders something", () => {
	expect(tr.toJSON()).toBeDefined();
});
