import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import NearbyList from "../components/NearbyList";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	return (
		<View style={styles.container}>
			<View style={{ flex: 1 }}>
				<MapView style={styles.map} />
				{/* Why isn't strollbutton not centered??? */}
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
	// list: {
	// 	flex: 1,
	// },
});

export default MainView;
