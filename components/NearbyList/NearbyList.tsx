import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import { fakeData } from "./fakeData";
import type { data } from "./fakeData";
import PlaceCard from "./PlaceCard";

const NearbyList = (): JSX.Element => {
	const cardList = fakeData.map((elem: data) => {
		return <PlaceCard place={elem.place} avg={elem.avg} />;
	});

	if (fakeData) {
		return <View>{cardList}</View>;
	} else {
		return <Text>Sorry, no data</Text>;
	}

	// return (
	// 	<View>
	// 		<ScrollView>
	// 			<placeCard></placeCard>
	// 		</ScrollView>
	// 	</View>
	// 	<View style={styles.container}>
	// 		<Table borderStyle={{ borderWidth: 15, borderColor: "#fff" }}>
	// 			<Row data={["Nearby Place", "Average Rating"]} textStyle={styles.title} />
	// 			<ScrollView>
	// 				<Rows
	// 					data={tableData}
	// 					style={{ borderWidth: 15, borderColor: "#fff" }}
	// 					textStyle={styles.text}
	// 				/>
	// 			</ScrollView>
	// 		</Table>
	// 	</View>
	//);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	// title: {
	// 	backgroundColor: "#fff",
	// 	textAlign: "center",
	// 	fontSize: 30,
	// 	fontWeight: "bold",
	// },
	// text: {
	// 	backgroundColor: "#fff",
	// 	textAlign: "center",
	// 	fontSize: 25,
	// },
});

export default NearbyList;
