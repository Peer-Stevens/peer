import React from "react";
import { cleanup, render, fireEvent, RenderAPI, waitFor } from "@testing-library/react-native";
import axios, { AxiosResponse } from "axios";
import LogInScreen from "../../src/screens/LoginScreen";
import { Screens } from "../../src/screens/MainScreen";

jest.mock("axios");

// eslint-disable-next-line @typescript-eslint/unbound-method
const mockPost = axios.post as jest.MockedFunction<typeof axios.post>;

const mockResponseDataGood: Partial<AxiosResponse<{ error?: string; token?: string }>> = {
	data: {
		token: "atoken123abc123",
	},
};

const mockResponseDataBad: Partial<AxiosResponse<{ error?: string; token?: string }>> = {
	data: {
		error: "Account with that email and/or password not found.",
	},
};

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
	it("brings user to submit rating page when valid credentials are passed and responds with token", async () => {
		mockPost.mockResolvedValueOnce(mockResponseDataGood);

		const logInButton = tr.getByLabelText("Click to log in");
		const emailField = tr.getByLabelText("Type in your email here");
		const passwordField = tr.getByLabelText("Type in your password here");

		fireEvent.changeText(emailField, "test@test.com");
		fireEvent.changeText(passwordField, "test123");

		fireEvent.press(logInButton);

		expect(mockPost).toHaveBeenCalled();

		await waitFor(() => {
			expect(mockSetPlaceID).toHaveBeenCalledWith("placeid123");
			expect(mockGoToSubmitRating).toHaveBeenCalled();
		});
	});
	it("shows error to user when invalid credentials are provided", async () => {
		mockPost.mockResolvedValueOnce(mockResponseDataBad);

		const logInButton = tr.getByLabelText("Click to log in");
		const emailField = tr.getByLabelText("Type in your email here");
		const passwordField = tr.getByLabelText("Type in your password here");

		fireEvent.changeText(emailField, "test@test.com");
		fireEvent.changeText(passwordField, "test1234");

		fireEvent.press(logInButton);

		expect(mockPost).toHaveBeenCalled();
		await waitFor(() => {
			const errorMsg = tr.queryByText("Account with that email and/or password not found.");
			expect(errorMsg).not.toBeNull();
		});
	});
	it("back button takes user to the previous screen", () => {
		const goBackButton = tr.getByText("Back to previous page");

		fireEvent.press(goBackButton);

		expect(mockSetPage).toHaveBeenCalledWith(Screens.NotLoggedIn);
	});
});
