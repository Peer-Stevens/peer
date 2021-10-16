declare module "*.svg" {
	import React from "react";
	import { SvgProps } from "react-native-svg";
	const content: React.FC<SvgProps>;
	export default content;
}

declare module "react-native-select-multiple" {
	import React from "react";
	import SelectMultiple from "react-native-select-multiple";
	const content: React.FC<SelectMultiple>;
	export default content;
}
