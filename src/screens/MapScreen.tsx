import React, { useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { useLocation } from "../components/NearbyPlaces/useLocation";
import PlaceList from "../components/PlaceList/PlaceList";
import StrollButton from "../components/StrollButton";

export interface MapScreenProps {
	toggleIsStrolling: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ toggleIsStrolling }: MapScreenProps) => {
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);
	const { location } = useLocation();
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
		height: Dimensions.get("window").height,
	},
	buttonFilterGroup: {
		bottom: Dimensions.get("window").height * 0.53,
		position: "absolute",
	},
	scrollView: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MapScreen;
