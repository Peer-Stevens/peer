import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import type { StyleProp } from "react-native";
import { Box } from "./Box";
import { FilterCheckBoxState } from "../views/MainView";
import placeTypes from "../util/placeTypes";
import SelectMultiple from "react-native-select-multiple";
import { TEXT_COLOR } from "../util/colors";

const capitalizeEveryWord = (str: string) => {
	let new_string = str;
	new_string = new_string.replace(/\b[a-z]/g, char => char.toUpperCase());
	new_string = new_string.replace(/_/g, () => " ");
	return new_string;
};

const filters = placeTypes.map(capitalizeEveryWord);

interface FilterListItemProps {
	label: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style: StyleProp<object>;
}

const FilterListItem: React.FC<FilterListItemProps> = React.memo(
	({ label, style }: FilterListItemProps) => {
		const accessibilityHint = `Filter out ${label}s`;
		return (
			<View
				style={StyleSheet.compose(styles.rlcontainer, style)}
				accessibilityLabel={label}
				accessibilityHint={accessibilityHint}
			>
				<Text
					style={styles.text}
					accessibilityLabel={label}
					accessibilityHint={accessibilityHint}
				>
					{label}
				</Text>
			</View>
		);
	}
);
FilterListItem.displayName = "FilterListItem";
export interface FilterBoxProps {
	filterSelected: Array<FilterCheckBoxState>;
	createAndSetFilterSelected: (index: number, value: boolean) => void;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

const FilterBox: React.FC<FilterBoxProps> = ({ style }: FilterBoxProps) => {
	const [selectedFilters, setSelectedFilters] = useState<Array<string>>([]);

	const onSelectionsChange = (selectedFilters: Array<{ label: string; value: string }>) => {
		const filterArray = selectedFilters.map(filterObj => filterObj.label);
		setSelectedFilters(filterArray);
	};

	//eslint-disable-next-line @typescript-eslint/ban-types
	const renderLabel = (label: string, style: StyleProp<object>) => {
		return <FilterListItem label={label} style={style} />;
	};

	return (
		<Box
			accessibilityLabel="A vertical list of filters"
			accessibilityHint="A vertical list of checkboxes which allow you to select filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			<SelectMultiple
				items={filters}
				selectedItems={selectedFilters}
				onSelectionsChange={onSelectionsChange}
				renderLabel={renderLabel}
			/>
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
	text: {
		color: TEXT_COLOR,
		fontWeight: "bold",
	},
	rlcontainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
	},
});

export default FilterBox;
