import React from "react";
import { Text, ScrollView, Dimensions } from "react-native";
import { fakeData } from "./fakeData";
import type { data } from "./fakeData";
import PlaceCard from "./PlaceCard";

const PlaceList = (): JSX.Element => {
	const cardList = fakeData.map((elem: data, index: number) => {
		return (
			<PlaceCard
				key={index}
				accessabilityLabel={elem.place}
				place={elem.place}
				avg={elem.avg}
				address={elem.address}
				img={elem.img}
			/>
		);
	});

	if (fakeData) {
		return (
			<ScrollView style={{maxHeight: (Dimensions.get("window").height / 2)}}>{cardList}</ScrollView>
		);
	} else {
		return <Text>Sorry, no data</Text>;
	}
};

export default PlaceList;
