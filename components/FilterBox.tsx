import React from "react";
import * as Peer from "./Peer/lib";

export interface FilterBoxProps {
	//eslint-disable-next-line @typescript-eslint/ban-types
	style?: object; // may be unsafe, but this is the type provided
	// by Stylesheet documentation:
	// https://reactnative.dev/docs/stylesheet#compose
}

const FilterBox = ({style}: FilterBoxProps): JSX.Element => {
	const categories = [
		//FIXME: use actual categories and not placeholders
		"Grocery stores",
		"Parks",
		"Museum",
	];
	return (
		<Peer.Box accessibilityLabel="List of filters" style={style}>
			{categories.map((category: string, index: number) => {
				return (
					<Peer.CheckBox
						text={category}
						key={index}
						accessibilityLabel={`Filter out type ${category}`}
						value={false}
						onValueChange={() => {}} //FIXME: this does nothing
					/>
				);
			})}
		</Peer.Box>
	);
};

export default FilterBox;
