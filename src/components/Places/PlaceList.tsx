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

	const cardList = (nearbyPlaces || []).map((place, index) => {
		const photo = place.photos ? place.photos[0].photo_reference : undefined;
		const PlaceID = place.place_id;
		return (
			<PlaceCard
				key={index}
				placeName={place.name}
				address={place.formatted_address}
				photoref={photo}
				location={location}
				latitude={place.geometry?.location.lat}
				longitude={place.geometry?.location.lng}
				goToDetails={goToDetails}
				placeID={PlaceID}
				setPlaceID={setPlaceID}
				avgRating={
					place.accessibilityData
						? Math.round(getAverageA11yRating(place) * 2) / 2
						: undefined
				}
				isPromoted={place.isPromoted}
				spendAmount={place.spendAmount}
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
				<ActivityIndicator
					size="large"
					color="#000000"
					accessibilityLabel="List of places nearby is still loading"
				/>
			</View>
		);
	}
};

export default PlaceList;
