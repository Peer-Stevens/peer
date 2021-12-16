import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import MainScreen from "./src/screens/MainScreen";
import APHont from "./assets/fonts/Aphont.ttf";
import APHontBold from "./assets/fonts/AphontBold.ttf";
import APHontItalic from "./assets/fonts/AphontItalic.ttf";
import APHontBoldItalic from "./assets/fonts/AphontBoldItalic.ttf";

export default function App(): JSX.Element {
	const [fontsLoaded] = useFonts({
		APHont: APHont,
		APHontBold: APHontBold,
		APHontItalic: APHontItalic,
		APHontBoldItalic: APHontBoldItalic,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return <MainScreen />;
}
