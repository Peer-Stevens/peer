// import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CreateAccount from "./src/screens/CreateAccountScreen";

const AppNavigator = createStackNavigator(
	{
		Home: MainScreen,
		Login: LoginScreen,
		CreateAccount: CreateAccount,
	},
	{
		initialRouteName: "Login",
	}
);

export default createAppContainer(AppNavigator);
