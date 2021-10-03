import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import FilterBox from "../components/FilterBox";
import StrollButton from "../components/StrollButton";

const MainView = (): JSX.Element => {
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	
	return (
		<View style={styles.container}>
			<MapView style={styles.map} />
			<StrollButton isShowingFilters={isShowingFilters} setIsShowingFilters={setIsShowingFilters}/>
			{isShowingFilters ? <FilterBox/> : null}
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
