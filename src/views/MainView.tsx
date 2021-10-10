import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import MapView from "react-native-maps";
import FilterBox from "../components/FilterBox";
import { NearbyPlaces } from "../components/NearbyPlaces/NearbyPlaces";
import StrollButton from "../components/StrollButton";

export interface FilterCheckBoxState {
    name: string
    checked: boolean
}

// see: https://developers.google.com/maps/documentation/places/web-service/supported_types#table1
const defaultFilterState: Array<FilterCheckBoxState> = [
    {name: "accounting", checked: false},
    {name: "airport", checked: false},
    {name: "amusement_park", checked: false},
    {name: "aquarium", checked: false},
    {name: "art_gallery", checked: false},
    {name: "atm", checked: false},
    {name: "bakery", checked: false},
    {name: "bank", checked: false},
    {name: "bar", checked: false},
    {name: "beauty_salon", checked: false},
    {name: "bicycle_store", checked: false},
    {name: "book_store", checked: false},
    {name: "bowling_alley", checked: false},
    {name: "bus_station", checked: false},
    {name: "cafe", checked: false},
    {name: "campground", checked: false},
    {name: "car_dealer", checked: false},
    {name: "car_rental", checked: false},
    {name: "car_repair", checked: false},
    {name: "car_wash", checked: false},
    {name: "casino", checked: false},
    {name: "cemetery", checked: false},
    {name: "church", checked: false},
    {name: "city_hall", checked: false},
    {name: "clothing_store", checked: false},
    {name: "convenience_store", checked: false},
    {name: "courthouse", checked: false},
    {name: "dentist", checked: false},
    {name: "department_store", checked: false},
    {name: "doctor", checked: false},
    {name: "drugstore", checked: false},
    {name: "electrician", checked: false},
    {name: "electronics_store", checked: false},
    {name: "embassy", checked: false},
    {name: "fire_station", checked: false},
    {name: "florist", checked: false},
    {name: "funeral_home", checked: false},
    {name: "furniture_store", checked: false},
    {name: "gas_station", checked: false},
    {name: "gym", checked: false},
    {name: "hair_care", checked: false},
    {name: "hardware_store", checked: false},
    {name: "hindu_temple", checked: false},
    {name: "home_goods_store", checked: false},
    {name: "hospital", checked: false},
    {name: "insurance_agency", checked: false},
    {name: "jewelry_store", checked: false},
    {name: "laundry", checked: false},
    {name: "lawyer", checked: false},
    {name: "library", checked: false},
    {name : "light_rail_station", checked: false},
    {name: "liquor_store", checked: false},
    {name: "local_government_office", checked: false},
    {name: "locksmith", checked: false},
    {name: "lodging", checked: false},
    {name: "meal_delivery", checked: false},
    {name: "meal_takeaway", checked: false},
    {name: "mosque", checked: false},
    {name: "movie_rental", checked: false},
    {name: "movie_theater", checked: false},
    {name: "moving_company", checked: false},
    {name: "museum", checked: false},
    {name: "night_club", checked: false},
    {name: "painter", checked: false},
    {name: "park", checked: false},
    {name: "parking", checked: false},
    {name: "pet_store", checked: false},
    {name: "pharmacy", checked: false},
    {name: "physiotherapist", checked: false},
    {name: "plumber", checked: false},
    {name: "police", checked: false},
    {name: "post_office", checked: false},
    {name: "primary_school", checked: false},
    {name: "real_estate_agency", checked: false},
    {name: "restaurant", checked: false},
    {name: "roofing_contractor", checked: false},
    {name: "rv_park", checked: false},
    {name: "school", checked: false},
    {name: "secondary_school", checked: false},
    {name: "shoe_store", checked: false},
    {name: "shopping_mall", checked: false},
    {name: "spa", checked: false},
    {name: "stadium", checked: false},
    {name: "storage", checked: false},
    {name: "store", checked: false},
    {name: "subway_station", checked: false},
    {name: "supermarket", checked: false},
    {name: "synagogue", checked: false},
    {name: "taxi_stand", checked: false},
    {name: "tourist_attraction", checked: false},
    {name: "train_station", checked: false},
    {name: "transit_station", checked: false},
    {name: "travel_agency", checked: false},
    {name: "university", checked: false},
    {name: "veterinary_care", checked: false},
    {name: "zoo", checked: false},
]

const MainView = (): JSX.Element => {
	const [isStrolling, setIsStrolling] = useState(false);
	const [isShowingFilters, setIsShowingFilters] = useState<boolean>(false);
	const [filterSelected, setFilterSelected] = useState<Array<FilterCheckBoxState>>(defaultFilterState);

    const createAndSetFilterSelected = (index: number, value: boolean) => {
        let newFilterSelected : Array<FilterCheckBoxState> = []
        filterSelected.map(item => newFilterSelected.push(item))
        newFilterSelected[index].checked = value
        setFilterSelected(newFilterSelected)
    }

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
					{isShowingFilters ? <FilterBox 
						filterSelected={filterSelected}
						createAndSetFilterSelected={createAndSetFilterSelected}
						/> : null}
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
