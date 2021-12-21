import React from "react";
import { cleanup, render, RenderAPI } from "@testing-library/react-native";
import NotLoggedInScreen from "../src/screens/NotLoggedInScreen";

const mockSetPage = jest.fn();
const mockSetPlaceID = jest.fn();
const mockGoToDetails = jest.fn();

jest.mock("@react-native-async-storage/async-storage");

let tr: RenderAPI;
beforeEach(() => {
	tr = render(
		<NotLoggedInScreen
			setPage={mockSetPage}
			setPlaceID={mockSetPlaceID}
			goToDetails={mockGoToDetails}
			placeID="oiluj"
		/>
	);
});

afterEach(cleanup);

describe("Not logged in screen tests", () => {
	it("renders all buttons", () => {
		const logInButton = tr.queryByText("Log in");
		const createAccountButton = tr.queryByText("Create Account");
		const goBackButton = tr.queryByText("Back to previous page");

		expect(logInButton).not.toBeNull();
		expect(createAccountButton).not.toBeNull();
		expect(goBackButton).not.toBeNull();
	});
});
