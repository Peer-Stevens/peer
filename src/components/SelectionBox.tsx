import React from "react";
import { View, StyleSheet, Text, LogBox } from "react-native";
import type { StyleProp } from "react-native";
import { Box } from "./Box";
import SelectMultiple from "react-native-select-multiple";
import { TEXT_COLOR } from "../util/colors";

// TODO: revise select multiple package to meet new React standards
LogBox.ignoreLogs(["Warning: componentWillReceiveProps has been renamed,"]);
interface SelectionListItemProps {
	label: string;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style: StyleProp<object>;
}

const SelectionListItem: React.FC<SelectionListItemProps> = React.memo(
	({ label }: SelectionListItemProps) => {
		const accessibilityHint = `Recommend places related to ${label} while you walk`;
		return (
			<View
				style={styles.flitem}
				accessibilityLabel={label}
				accessibilityHint={accessibilityHint}
			>
				<Text
					style={
						label.length < 20
							? { fontSize: 20, ...styles.text }
							: { fontSize: 16, ...styles.text }
					}
					accessibilityLabel={label}
					accessibilityHint={accessibilityHint}
				>
					{label}
				</Text>
			</View>
		);
	}
);
SelectionListItem.displayName = "SelectionListItem";
export interface SelectionBoxProps {
	selections: Array<string>;
	setSelections: React.Dispatch<React.SetStateAction<Array<string>>>;
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>; // TODO: update generic from "object"
}

const enabledFiltersMap = [
	{ label: "Restaurants", value: "restaurant" },
	{ label: "Bars", value: "bar" },
	{ label: "Drugstores", value: "drugstore" },
	{ label: "Supermarkets", value: "supermarket" },
	{ label: "Banks", value: "bank" },
	{ label: "Museums", value: "museum" },
	{ label: "ATM", value: "atm" },
	{ label: "Bakery", value: "bakery" },
	{ label: "Laundry", value: "laundry" },
] as const;
type SelectItem = typeof enabledFiltersMap[number];

const SelectionBox: React.FC<SelectionBoxProps> = ({
	selections: selections,
	setSelections: setSelections,
	style,
}: SelectionBoxProps) => {
	const onSelectionsChange = (selectionObjs: Array<SelectItem>, item: SelectItem) => {
		//const selectionArray = selectionObjs.map(selectionObj => selectionObj.label);
		setSelections([item.value]);
	};

	//eslint-disable-next-line @typescript-eslint/ban-types
	const renderLabel = (label: string, style: StyleProp<object>) => {
		return <SelectionListItem label={label} style={style} />;
	};

	return (
		<Box
			accessibilityLabel="A vertical list of kinds of places"
			accessibilityHint="Select items from this list to be recommended those kinds of places"
			style={StyleSheet.compose(styles.container, style)}
		>
			<SelectMultiple
				items={enabledFiltersMap}
				selectedItems={selections}
				onSelectionsChange={onSelectionsChange}
				renderLabel={renderLabel}
			/>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 275,
		borderColor: TEXT_COLOR,
		borderTopWidth: 3,
		borderLeftWidth: 3,
		borderRightWidth: 3,
	},
	text: {
		color: TEXT_COLOR,
		fontWeight: "bold",
	},
	flitem: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
	},
});

export default SelectionBox;
