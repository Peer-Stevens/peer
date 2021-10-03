import React, { useState } from "react";
import { StyleSheet } from "react-native";
import type { StyleProp } from "react-native";
import * as Peer from "./Peer/lib";
import { DISABLED_COLOR } from "../util/colors";

export interface FilterBoxProps {
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: StyleProp<object>;
}

const FilterBox = ({ style }: FilterBoxProps): JSX.Element => {
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
		<Peer.Box
			accessibilityLabel="List of filters"
			style={StyleSheet.compose(styles.container, style)}
		>
			{categoriesState.map(({ name, value, set }, index: number) => {
				return (
					<Peer.CheckBox
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
		</Peer.Box>
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
