import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { Box } from "./Box";
import CheckBox from "./CheckBox";
import { PlaceType1 } from "@googlemaps/google-maps-services-js";
import { FilterCheckBoxState } from "../views/MainView";

const capitalizeEveryWord = (str: string) => {
	let new_string = str;
	new_string = new_string.replace(/\b[a-z]/g, char => char.toUpperCase());
	new_string = new_string.replace(/_/g, () => " ");
	return new_string;
};
export interface FilterBoxProps {
	filterSelected: Array<FilterCheckBoxState>;
	createAndSetFilterSelected: (index: number, value: boolean) => void;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

const FilterBox: React.FC<FilterBoxProps> = ({
	filterSelected,
	createAndSetFilterSelected,
	style,
}: FilterBoxProps) => {
	const places: Array<string> = [];
	for (const value in PlaceType1) {
		places.push(value);
	}
	interface RenderItemParams {
		item: string;
		index: number;
	}

	const renderItem = ({ item, index }: RenderItemParams) => {
		return (
			<CheckBox
				style={styles.checkBox}
				text={capitalizeEveryWord(item)}
				accessibilityLabel={`Filter out ${item}s`}
				value={filterSelected[index].checked}
				onValueChange={(value: boolean) => {
					createAndSetFilterSelected(index, value);
				}}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Box
				accessibilityLabel="A vertical list of filters"
				accessibilityHint="A vertical list of checkboxes which allow you to select filters"
				style={style}
			>
				<FlatList data={places} renderItem={renderItem} keyExtractor={item => item} />
			</Box>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 275,
	},
	checkBox: {
		margin: 5,
	},
});

export default FilterBox;
