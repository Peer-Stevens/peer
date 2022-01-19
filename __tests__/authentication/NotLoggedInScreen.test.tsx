import React from "react";
import { cleanup, render, RenderAPI, fireEvent } from "@testing-library/react-native";
import NotLoggedInScreen from "../../src/screens/NotLoggedInScreen";
import Screens from "../../src/util/screens";

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

	it("log in button takes user to log in screen", () => {
		const logInButton = tr.getByText("Log in");

		fireEvent.press(logInButton);

		expect(mockSetPage).toHaveBeenCalledWith(Screens.Login);
	});
	it("create account button takes user to create account screen", () => {
		const createAccountButton = tr.getByText("Create Account");

		fireEvent.press(createAccountButton);

		expect(mockSetPage).toHaveBeenCalledWith(Screens.CreateAccount);
	});
	it("go back button takes user to the previous screen", () => {
		const goBackButton = tr.getByText("Back to previous page");

		fireEvent.press(goBackButton);

		expect(mockGoToDetails).toHaveBeenCalled();
		expect(mockSetPlaceID).toHaveBeenCalledWith("oiluj");
	});
});
