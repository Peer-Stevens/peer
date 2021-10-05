import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import NearbyList from "../components/NearbyList/NearbyList";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<MapView style={styles.map} />
				<StrollButton />
			</View>
			<NearbyList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MainView;
