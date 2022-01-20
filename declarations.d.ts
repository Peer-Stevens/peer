declare module "*.svg" {
	import React from "react";
	import { SvgProps } from "react-native-svg";
	const content: React.FC<SvgProps>;
	export default content;
}

declare module "*.png" {
	const value: number;
	export = value;
}

declare module "*.ttf" {
	import { FontSource } from "expo-font";
	const value: FontSource;
	export default value;
}

declare module "react-native-select-multiple" {
	import React from "react";
	import SelectMultiple from "react-native-select-multiple";
	const content: React.FC<SelectMultiple>;
	export default content;
}
