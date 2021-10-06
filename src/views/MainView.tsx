import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);

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
				<View style={styles.buttonFilterGroup}>
					{isShowingFilters ? <FilterBox /> : null}
					<StrollButton
						onStartStrolling={toggleIsStrolling}
						isShowingFilters={isShowingFilters}
						setIsShowingFilters={setIsShowingFilters}
					/>
				</View>
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
	buttonFilterGroup: {
		position: "absolute",
		bottom: 75,
	},
});

export default MainView;
