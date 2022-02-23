import React from "react";
import { Pressable, Platform } from "react-native";
import * as Linking from "expo-linking";
import { getMapAnchorA11yLabel, MAP_ANCHOR_A11Y } from "../util/strings";

enum TravelMode {
	Driving = "driving",
	Walking = "walking",
	Transit = "transit",
}

const handlePress = async (href: string) => {
	await Linking.openURL(href);
};

const buildMapsHref = ({
	travelmode,
	destination_place_id,
	destination,
	formatted_address,
}: {
	travelmode: TravelMode;
	destination_place_id: string;
	destination?: string;
	formatted_address?: string;
}) => {
	return Platform.select<string>({
		android: buildGoogleMapsHref({
			travelmode,
			startNavigation: false,
			destination,
			destination_place_id,
		}),
		ios: buildAppleMapsHref({ travelmode, destination, formatted_address }),
		default: buildGoogleMapsHref({
			travelmode,
			startNavigation: false,
			destination,
			destination_place_id,
		}),
	});
};

const buildGoogleMapsHref = ({
	travelmode,
	startNavigation,
	destination,
	destination_place_id,
}: {
	travelmode: TravelMode;
	startNavigation: boolean;
	destination?: string;
	destination_place_id?: string;
}) => {
	// https://developers.google.com/maps/documentation/urls/get-started#directions-action
	let href = `https://www.google.com/maps/dir/?api=1&travelmode=${travelmode}`;

	if (destination && destination_place_id) {
		href += `&destination=${encodeURIComponent(destination)}`;
		href += `&destination_place_id=${encodeURIComponent(destination_place_id)}`;
	}

	if (startNavigation) {
		href += "&dir_action=navigate"; // not in a constant because this is the only dir_action
	}

	return href;
};

const buildAppleMapsHref = ({
	travelmode,
	destination,
	formatted_address,
}: {
	travelmode: TravelMode;
	destination?: string;
	formatted_address?: string;
}) => {
	// https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html
	const appleTravelModeParamMap: Record<string, string> = {
		driving: "d",
		walking: "w",
		transit: "r",
	};

	let href = `http://maps.apple.com/dirflg=${appleTravelModeParamMap[travelmode]}`;

	if (formatted_address) {
		href += `&daddr=${encodeURIComponent(formatted_address)}`;
	} else if (destination) {
		href += `&daddr=${encodeURIComponent(destination)}`;
	}

	return href;
};

type MapAnchorProps = {
	destination_place_id: string;
	destination?: string;
	formatted_address?: string;
};

const MapAnchor: React.FC<MapAnchorProps> = ({
	destination,
	destination_place_id,
	formatted_address,
	children,
}: React.PropsWithChildren<MapAnchorProps>) => {
	const MAPS_HREF = buildMapsHref({
		travelmode: TravelMode.Walking,
		destination_place_id,
		destination,
		formatted_address,
	});

	let a11yLabel;
	if (destination) {
		a11yLabel = getMapAnchorA11yLabel(destination);
	} else {
		a11yLabel = MAP_ANCHOR_A11Y;
	}

	return (
		<Pressable
			onPress={async () => {
				await handlePress(MAPS_HREF);
			}}
			accessibilityLabel={a11yLabel}
		>
			{children}
		</Pressable>
	);
};

export default MapAnchor;
