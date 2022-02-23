import React, { useState } from "react";
import { View, StyleSheet, ViewStyle, Modal } from "react-native";
import type { StyleProp } from "react-native";
import { PRIMARY_COLOR, TEXT_COLOR } from "../util/colors";
import { Button } from "./Button";

export interface ModalProps {
	text: string;
	accessibilityLabel: string;
	accessibilityHint?: string;
	style?: StyleProp<ViewStyle>;
}

export const PopUp: React.FC<ModalProps> = ({
	text,
	accessibilityLabel,
	accessibilityHint,
	style,
	children,
}) => {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<View
			accessibilityLabel="A Pop Up"
			accessibilityHint="A Pop Up"
			style={StyleSheet.compose(
				{
					backgroundColor: PRIMARY_COLOR,
				},
				style
			)}
		>
			<Modal
				animationType="none"
				// TODO: setting 'transparent' to false will make the background disappear; we may want this for our users
				// so that there are less distractions and they can focus on a single element. Test it out and lmk what you guys think
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{children}
						<Button
							onPress={() => setModalVisible(!modalVisible)}
							accessibilityLabel="Close Pop Up"
							text="Close Pop Up"
						/>
					</View>
				</View>
			</Modal>
			<Button
				onPress={() => setModalVisible(true)}
				accessibilityLabel={accessibilityLabel}
				accessibilityHint={accessibilityHint}
				text={text}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderColor: TEXT_COLOR,
		borderStyle: "solid",
		borderWidth: 3,
		padding: 35,
		alignItems: "center",
	},
});
