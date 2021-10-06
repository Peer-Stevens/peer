import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { DISABLED_COLOR } from "../util/colors";
import { Box } from "./Box";
import CheckBox from "./CheckBox";

export interface FilterBoxProps {
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}
interface CategoryState {
	name: string;
	selected: boolean;
}

const FilterBox: React.FC<FilterBoxProps> = ({ style }: FilterBoxProps) => {
	const [categoriesMap, setCategoriesMap] = useState<Record<string, CategoryState>>({});
	let categories: Array<string> = [];
	useEffect(() => {
		categories = [
			//FIXME: fetch actual categories and not placeholders
			"Grocery stores",
			"Parks",
			"Museum",
		];
		const generatedCategoriesMap: Record<string, CategoryState> = {};
		categories.forEach(
			category => (generatedCategoriesMap[category] = { name: category, selected: false })
		);
		setCategoriesMap(generatedCategoriesMap);
	}, []);

	return (
		<Box
			accessibilityLabel="A vertical list of filters"
			accessibilityHint="A vertical list of checkboxes which allow you to select filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			{categories.map((name, index: number) => {
				return (
					<CheckBox
						style={styles.checkBox}
						text={name}
						key={index}
						accessibilityLabel={`Filter out ${name}s`}
						value={categoriesMap[name].selected}
						onValueChange={() => {
							const newMap = categoriesMap;
							newMap[name].selected = !newMap[name].selected;
							setCategoriesMap(newMap);
						}}
					/>
				);
			})}
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderBottomColor: DISABLED_COLOR,
		borderBottomWidth: 1,
	},
	checkBox: {
		margin: 5,
	},
});

export default FilterBox;
