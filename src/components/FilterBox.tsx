import React, { useState } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import { Box } from "./Box";
import CheckBox from "./CheckBox";
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

const FilterBox : React.FC<FilterBoxProps> = ({ style }: FilterBoxProps) => {
	const categories = [
		//FIXME: use actual categories and not placeholders
		"Grocery stores",
		"Parks",
		"Museum",
	];
	const categoriesState = categories.map(category => {
		const [value, set] = useState<boolean>(false);
		return { name: category, value: value, set: set };
	});

	return (
		<Box
			accessibilityLabel="A vertical list of filters"
			accessibilityHint="A vertical list of checkboxes which allow you to select filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			{categoriesState.map(({ name, value, set }, index: number) => {
				return (
					<CheckBox
						style={styles.checkBox}
						text={name}
						key={index}
						accessibilityLabel={`Filter out type ${name}`}
						value={value}
						onValueChange={() => {
							set(!value);
						}}
					/>
				);
			})}
		</Box>
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
