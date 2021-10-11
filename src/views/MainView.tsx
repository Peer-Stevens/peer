import { PlaceType1 } from "@googlemaps/google-maps-services-js";
import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";
import { useLocation } from "../components/NearbyPlaces/useLocation";

export interface FilterCheckBoxState {
	name: string;
	checked: boolean;
}

// see: https://developers.google.com/maps/documentation/places/web-service/supported_types#table1
const defaultFilterState: Array<FilterCheckBoxState> = [];
for (const place in PlaceType1) {
	defaultFilterState.push({
		name: place,
		checked: false,
	});
}

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	const [filterSelected, setFilterSelected] =
		useState<Array<FilterCheckBoxState>>(defaultFilterState);

	const createAndSetFilterSelected = (index: number, value: boolean) => {
		const newFilterSelected: Array<FilterCheckBoxState> = [];
		filterSelected.map(item => newFilterSelected.push(item));
		newFilterSelected[index].checked = value;
		setFilterSelected(newFilterSelected);
	};
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
							filterSelected={filterSelected}
							createAndSetFilterSelected={createAndSetFilterSelected}
						/>
					) : null}
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
