import React, { useState } from "react";
import { StyleSheet, Dimensions, View, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";
import PlaceList from "../components/PlaceList/PlaceList";
import { useLocation } from "../components/NearbyPlaces/useLocation";

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
	const { location } = useLocation();

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
				{location ? (
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: location?.coords.latitude,
							longitude: location?.coords.longitude,
							latitudeDelta: 0.0007,
							longitudeDelta: 0.0007,
						}}
					>
						{location ? (
							<Marker
								coordinate={{
									latitude: location?.coords.latitude,
									longitude: location?.coords.longitude,
								}}
								draggable={false}
							/>
						) : null}
					</MapView>
				) : null}
				<View style={styles.buttonFilterGroup}>
					{isShowingFilters ? (
						<FilterBox
							selectedFilters={selectedFilters}
							setSelectedFilters={setSelectedFilters}
						/>
					) : null}
					<StrollButton
						onStartStrolling={toggleIsStrolling}
						isShowingFilters={isShowingFilters}
						setIsShowingFilters={setIsShowingFilters}
					/>
				</View>
				<PlaceList />
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
		height: Dimensions.get("window").height / 2,
	},
	buttonFilterGroup: {
		bottom: 400,
		position: "absolute"
	}
});

export default MainView;
