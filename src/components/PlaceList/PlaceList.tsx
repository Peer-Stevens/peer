import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
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
			<View style={styles.container}>
				<ScrollView>{cardList}</ScrollView>
			</View>
		);
	} else {
		return <Text>Sorry, no data</Text>;
	}
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
});

export default PlaceList;
