import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";
import { useLocation } from "../components/NearbyPlaces/useLocation";
import Location from "expo-location";
import type { Place } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import { SERVER_BASE_URL } from "@env";

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	const { location } = useLocation();
	const [userLocation, getUserLocation] = React.useState<Place[]>();

	const toggleIsStrolling = () => {
		setIsStrolling(!isStrolling);
	};

	const getPlaceName = async (location: Location.LocationObject) => {
		const response = await axios.get<{ places: Place[] }>(
			`${SERVER_BASE_URL}/getNearbyPlaces?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
		);
		getUserLocation(response.data.places);
	};

	useEffect(() => {
		if (location) {
			void getPlaceName(location);
		}
	}, [location]);

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
								title={
									userLocation
										? userLocation[0].name
										: "No location name available to display"
								}
								draggable={false}
							/>
						) : null}
					</MapView>
				) : null}
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
