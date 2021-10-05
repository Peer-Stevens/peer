import React from "react";
import {StyleSheet, Dimensions, Text, ScrollView} from "react-native";
import {fakeData} from "./fakeData";
import type {data} from "./fakeData";
import {Table, Row, Rows} from "react-native-table-component";
// https://github.com/Gil2015/react-native-table-component for structuring the data neatly

export interface NearbyListProps {
	style?: any;
}

const NearbyList = ({style}: NearbyListProps): JSX.Element => {
	let tableData: any = [];

	if (fakeData) {
		fakeData.forEach((elem: data) => {
			tableData.push([
				elem.place,
				elem.braille,
				elem.openess,
				elem.readability,
				elem.helpfulness,
			]);
		});
	}

	return (
		<ScrollView style={StyleSheet.compose(styles.container, style)}>
			<Table borderStyle={{borderWidth: 15, borderColor: "#fff"}}>
				<Row
					data={["Nearby Place", "Braille", "Openess", "Readability", "Helpfulness"]}
					textStyle={styles.title}
				/>
				<Rows data={tableData} textStyle={styles.text} />
			</Table>
		</ScrollView>
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
		fontSize: 15,
	},
	text: {
		backgroundColor: "#fff",
		textAlign: "center",
		fontSize: 12,
	},
});

export default NearbyList;
