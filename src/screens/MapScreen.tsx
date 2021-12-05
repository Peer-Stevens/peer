import React, { Dispatch, SetStateAction, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import PlaceList from "../components/Places/PlaceList";
import SelectionBox from "../components/SelectionBox";
import { useLocation } from "../hooks/useLocation";
import StrollButton from "../components/StrollButton";

export interface MapScreenProps {
	setPageStrolling: () => void;
	goToDetails: () => void;
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
					onStartStrolling={setPageStrolling}
					isShowingSelections={isShowingSelections}
					setIsShowingSelections={setIsShowingSelections}
					selections={selections}
				/>
			</View>
			<PlaceList
				setPlaceID={setPlaceID}
				goToDetails={goToDetails}
				selectedFilter={selections.length > 0 ? selections[0] : ""}
			/>
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
