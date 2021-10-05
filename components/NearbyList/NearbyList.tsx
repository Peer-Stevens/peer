import React from "react";
import {StyleSheet, Dimensions, ScrollView, View} from "react-native";
import {fakeData} from "./fakeData";
import type {data} from "./fakeData";
import {Table, Row, Rows} from "react-native-table-component";
// https://github.com/Gil2015/react-native-table-component for structuring the data neatly

const NearbyList = (): JSX.Element => {
	let tableData: any = [];

	if (fakeData) {
		fakeData.forEach((elem: data) => {
			tableData.push([
				elem.place,
				elem.avg,
			]);
		});
	}

	return (
		<View style={styles.container}>
			<Table borderStyle={{borderWidth: 15, borderColor: "#fff"}}>
				<Row
					data={["Nearby Place","Average Rating"]}
					textStyle={styles.title}
				/>
				<ScrollView >
					<Rows data={tableData} style={{borderWidth: 15, borderColor: "#fff"}} textStyle={styles.text} />
				</ScrollView>
			</Table>
		</View>
		
	);
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
