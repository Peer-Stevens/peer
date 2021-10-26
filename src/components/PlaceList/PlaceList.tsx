import React from "react";
import { Text, ScrollView, Dimensions } from "react-native";
import PlaceCard from "./PlaceCard";
import type { Place } from "@googlemaps/google-maps-services-js";
import { useNearbyPlaces } from "../NearbyPlaces/useNearbyPlaces";

const PlaceList = (): JSX.Element => {
	const { nearbyPlaces } = useNearbyPlaces();

	let places: Place[] = []
	if (nearbyPlaces) {
		places = nearbyPlaces.slice(0, 5); // only five to not use more resources than necessary
	}

	const cardList = places.map((value, index) => {
		const photo = value.photos ? value.photos[0].photo_reference : undefined;
		return (
			<PlaceCard
				key={index}
				accessabilityLabel={value.name}
				place={value.name}
				avg={0} // TODO: get average from our server
				address={value.formatted_address}
				img={photo}
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
		return <Text>Loading...</Text>;
	}
};

export default PlaceList;
