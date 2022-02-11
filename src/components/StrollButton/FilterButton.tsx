import React from "react";
import { View } from "react-native";
import { TEXT_COLOR } from "../../util/colors";
import { Button } from "../Button";

export interface FilterButtonProps {
	setIsShowingSelections: React.Dispatch<React.SetStateAction<boolean>>;
	isShowingSelections: boolean;
	selections: string[];
}

const FilterButton: React.FC<FilterButtonProps> = ({
	setIsShowingSelections,
	isShowingSelections,
	selections,
}) => {
	const buildSelectionsText = (selections: string[]) => {
		if (selections.length === 0) return "None";
		let text = "";
		for (const selection of selections) {
			text += `${selection} `;
		}
		return text;
	};
	return (
		<View>
			<Button
				style={{
					borderWidth: 3,
					borderColor: TEXT_COLOR,
					borderLeftWidth: 3,
					height: "100%",
					width: 70,
				}}
				onPress={() => {
					setIsShowingSelections(!isShowingSelections);
				}}
				accessibilityLabel={isShowingSelections ? "Hide selections" : "Show selections"}
				accessibilityHint={`Current selections: ${buildSelectionsText(selections)}`}
				iconName={isShowingSelections ? "chevron-down" : "filter"}
			/>
		</View>
	);
};

export default FilterButton;
