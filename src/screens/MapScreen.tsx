import React, { Dispatch, SetStateAction, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PlaceList from "../components/Places/PlaceList";
import SelectionBox from "../components/SelectionBox";
import { useLocation } from "../hooks/useLocation";
import StrollButton from "../components/StrollButton";

export interface MapScreenProps {
	setPageStrolling: (screen: string) => void;
	goToDetails: () => void;

	//check what type is placeID
	setPlaceID: Dispatch<SetStateAction<string | undefined>>;
}

const MapScreen: React.FC<MapScreenProps> = ({
	setPageStrolling,
	goToDetails,
	setPlaceID,
}: MapScreenProps) => {
	const [isShowingSelections, setIsShowingSelections] = useState<boolean>(false);
	const [selections, setSelections] = useState<Array<string>>([]);
	const { location } = useLocation();
	return (
		<View style={styles.container}>
			{location ? (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: location?.coords.latitude,
						longitude: location?.coords.longitude,
						latitudeDelta: 0.0007,
						longitudeDelta: 0.0007,
					}}
				>
					{location ? (
						<Marker
							coordinate={{
								latitude: location?.coords.latitude,
								longitude: location?.coords.longitude,
							}}
							draggable={false}
						/>
					) : null}
				</MapView>
			) : null}
			<View style={styles.buttonFilterGroup}>
				{isShowingSelections ? (
					<SelectionBox selections={selections} setSelections={setSelections} />
				) : null}
				<StrollButton
					onStartStrolling={() => setPageStrolling("strollScreen")}
					isShowingSelections={isShowingSelections}
					setIsShowingSelections={setIsShowingSelections}
					selections={selections}
				/>
			</View>

			{/* Add props to PlaceList that takes in the placeID and does something with it */}
			<PlaceList setPlaceID={setPlaceID} goToDetails={goToDetails} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	buttonFilterGroup: {
		bottom: Dimensions.get("window").height * 0.53,
		position: "absolute",
	},
	scrollView: {
		flex: 1,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default MapScreen;
