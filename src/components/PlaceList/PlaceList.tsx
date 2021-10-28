import React, { useEffect, useState } from "react";
import { ScrollView, Dimensions, ActivityIndicator, View } from "react-native";
import PlaceCard from "./PlaceCard";
import type { Place } from "@googlemaps/google-maps-services-js";
import { useNearbyPlaces } from "../NearbyPlaces/useNearbyPlaces";

const deepEqual = (a: Place[], b: Place[]): boolean => {
	return JSON.stringify(a) === JSON.stringify(b);
};

const PlaceList = (): JSX.Element => {
	const [places, setPlaces] = useState<Place[]>([]);
	const { nearbyPlaces } = useNearbyPlaces();

	useEffect(() => {
		if (nearbyPlaces) {
			const newPlaces = nearbyPlaces.slice(0, 5); // only five to not use more resources than necessary
			if (!deepEqual(places, newPlaces)) setPlaces(newPlaces);
		}
	});

	const cardList = places.map((value, index) => {
		const photo = value.photos ? value.photos[0].photo_reference : undefined;
		return (
			<PlaceCard
				key={index}
				accessabilityLabel={value.name}
				place={value.name}
				avg={0} // TODO: get average from our server
				address={value.formatted_address}
				photoref={photo}
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
