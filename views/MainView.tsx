import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import NearbyList from "../components/NearbyList";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	return (
		<View style={styles.container}>
			{/* <MapView style={styles.map} /> */}
			{/* <View style={{ display: "flex", flexDirection: "column" }}> */}
			<MapView style={styles.map} />
			<NearbyList />
			{/* </View> */}
			<StrollButton />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
		flexDirection: "column",
	},
	map: {
		width: Dimensions.get("window").width,
		// height: Dimensions.get("window").height,
		// flex: 1,
	},
});

export default MainView;
