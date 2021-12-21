import React from "react";
import { cleanup, render, fireEvent, RenderAPI, waitFor } from "@testing-library/react-native";
import axios from "axios";
import LogInScreen from "../../src/screens/LoginScreen";

jest.mock("axios");
// eslint-disable-next-line @typescript-eslint/unbound-method
const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;

const mockSetPage = jest.fn();
const mockSetPlaceID = jest.fn();
const mockGoToSubmitRating = jest.fn();

let tr: RenderAPI;
beforeEach(() => {
	tr = render(
		<LogInScreen
			placeID="placeid123"
			setPage={mockSetPage}
			setPlaceID={mockSetPlaceID}
			goToSubmitRating={mockGoToSubmitRating}
		/>
	);
});
afterEach(cleanup);

describe("Login screen tests", () => {
	it("renders all the input fields", () => {
		const emailField = tr.queryByText("Email");
		const passwordField = tr.queryByText("Password");

		expect(emailField).not.toBeNull();
		expect(passwordField).not.toBeNull();
	});
	it("renders all the buttons", () => {
		const logInButton = tr.queryByLabelText("Click to log in");
		const goBackButton = tr.queryByText("Back to previous page");

		expect(logInButton).not.toBeNull();
		expect(goBackButton).not.toBeNull();
	});
	it("shows error to user when invalid email is typed in email field", async () => {
		const emailField = tr.getByLabelText("Type in your email here");

		await waitFor(() => {
			fireEvent.changeText(emailField, "test");
			const errorMsg = tr.queryByText("Please provide a valid email");
			expect(errorMsg).not.toBeNull();
		});
	});
});
