import React, { Dispatch, SetStateAction } from "react";
import { ScrollView, Dimensions, ActivityIndicator, View } from "react-native";
import PlaceCard from "./PlaceCard";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useLocation } from "../../hooks/useLocation";
import { getAverageA11yRating } from "../../util/processA11yRatings";
export interface PlaceListProps {
	goToDetails: () => void;
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
	selectedFilter: string;
}

const PlaceList = ({ goToDetails, setPlaceID, selectedFilter }: PlaceListProps): JSX.Element => {
	const { location } = useLocation();
	const { nearbyPlaces } = useNearbyPlaces(selectedFilter);

	const cardList = (nearbyPlaces || []).map((value, index) => {
		const photo = value.photos ? value.photos[0].photo_reference : undefined;
		const PlaceID = value.place_id;
		return (
			<PlaceCard
				key={index}
				placeName={value.name}
				address={value.formatted_address}
				photoref={photo}
				location={location}
				latitude={value.geometry?.location.lat}
				longitude={value.geometry?.location.lng}
				goToDetails={goToDetails}
				placeID={PlaceID}
				setPlaceID={setPlaceID}
				avgRating={
					value.accessibilityData
						? Math.round(getAverageA11yRating(value) * 2) / 2
						: undefined
				}
			/>
		);
	});

	if (nearbyPlaces) {
		return (
			<ScrollView style={{ maxHeight: Dimensions.get("window").height / 2 }}>
				{cardList}
			</ScrollView>
		);
	} else {
		return (
			<View
				style={{
					height: Dimensions.get("window").height / 2,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ActivityIndicator size="large" color="#000000" />
			</View>
		);
	}
};

export default PlaceList;
