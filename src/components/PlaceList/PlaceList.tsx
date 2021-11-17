import React from "react";
import { ScrollView, Dimensions, ActivityIndicator, View } from "react-native";
import PlaceCard from "./PlaceCard";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useLocation } from "../../hooks/useLocation";
import { getAverageA11yRating } from "../../util/processA11yRatings";

const PlaceList = (): JSX.Element => {
	const { location } = useLocation();
	const { nearbyPlaces } = useNearbyPlaces();

	const cardList = (nearbyPlaces || []).map((value, index) => {
		const photo = value.photos ? value.photos[0].photo_reference : undefined;
		return (
			<PlaceCard
				key={index}
				place={value.name}
				address={value.formatted_address}
				photoref={photo}
				location={location}
				latitude={value.geometry?.location.lat}
				longitude={value.geometry?.location.lng}
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
