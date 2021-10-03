import React, { useState } from "react";
import  { StyleSheet } from "react-native"
import type { StyleProp } from "react-native"
import * as Peer from "./Peer/lib";

export interface FilterBoxProps {
	style?: StyleProp<any>;
}

const FilterBox = ({ style }: FilterBoxProps): JSX.Element => {
	const [groceryStore, setGroceryStore] = useState<boolean>(false);
	const categories = [
		//FIXME: use actual categories and not placeholders
		"Grocery stores",
		"Parks",
		"Museum",
	];
	return (
		<Peer.Box accessibilityLabel="List of filters" style={StyleSheet.compose(styles.container, style)}>
			{categories.map((category: string, index: number) => {
				return (
					<Peer.CheckBox
						style={styles.checkBox}
						text={category}
						key={index}
						accessibilityLabel={`Filter out type ${category}`}
						value={groceryStore}
						onValueChange={() => {
							setGroceryStore(!groceryStore);
						}} //FIXME: all boxes depend on one value
					/>
				);
			})}
		</Peer.Box>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	checkBox: {
		margin: 5
	}
})

export default FilterBox;
