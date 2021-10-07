import React from "react";
import { StyleSheet, Dimensions, ScrollView, View, Text} from "react-native";
import { fakeData } from "./fakeData";
import type { data } from "./fakeData";
import { Table, Row, Rows } from "react-native-table-component";
import PlaceCard, { PlaceCardProps } from "./PlaceCard";
// https://github.com/Gil2015/react-native-table-component for structuring the data neatly

// export interface NearbyListProps{
	
// }
const NearbyList = () : JSX.Element => {
	//const allPlaces: Array<any> = [];

	// const yoloData: Array<> = [];

	// fakeData.forEach((elem: data) => {
	// 	yoloData.push(<PlaceCard place={elem.place} avg={elem.avg} />)
	// })

	// const dataList = () => {
	// 	fakeData.forEach((elem: data) => {
	// 		return <PlaceCard place={elem.place} avg={elem.avg} />
	// 	})
	// }

	if (fakeData) {
		return (<ScrollView>
			{() => {fakeData.forEach((elem: data) => {
			<PlaceCard place={elem.place} avg={elem.avg} />
		})}}
			{/* {() =>{ fakeData.forEach((elem: data) => {
			<PlaceCard place={elem.place} avg={elem.avg} />
		})}} */}
		</ScrollView>
		)
	}
	else {
		return (<Text>Sorry, no data</Text>);
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
	title: {
		backgroundColor: "#fff",
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
	},
	text: {
		backgroundColor: "#fff",
		textAlign: "center",
		fontSize: 25,
	},
});

export default NearbyList;
