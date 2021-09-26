import React from "react";
import { StyleSheet } from "react-native";
import MainView from "./components/MainView";

export default function App() {
	return <MainView></MainView>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
