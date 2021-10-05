import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const toggleIsStrolling = () => {
		setIsStrolling(!isStrolling);
	};

	if (isStrolling) {
		return (
			<View style={styles.container}>
				<NearbyPlaces stopStrolling={toggleIsStrolling} />
			</View>
		);
	} else
		return (
			<View style={styles.container}>
				<MapView style={styles.map} />
				<StrollButton onStartStrolling={toggleIsStrolling} />
			</View>
		);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MainView;
