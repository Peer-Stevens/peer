export interface data {
	place: String;
	braille: Number;
	openess: Number;
	readability: Number;
	helpfulness: Number;
}

export let fakeData: Array<data> = [
	{
		place: "Chipotle",
		braille: 5,
		openess: 2,
		readability: 4,
		helpfulness: 5,
	},
	{
		place: "Starbuck",
		braille: 1,
		openess: 1,
		readability: 1,
		helpfulness: 5,
	},
	{
		place: "Pizza Hut",
		braille: 4,
		openess: 3,
		readability: 4,
		helpfulness: 2,
	},
	{
		place: "McDonalds",
		braille: 5,
		openess: 5,
		readability: 5,
		helpfulness: 5,
	},
	{
		place: "Midtown",
		braille: 4,
		openess: 4,
		readability: 4,
		helpfulness: 4,
	},
	{
		place: "Burger King",
		braille: 1,
		openess: 1,
		readability: 1,
		helpfulness: 1,
	},
	{
		place: "Gio's",
		braille: 5,
		openess: 2,
		readability: 4,
		helpfulness: 5,
	},
	{
		place: "Julio's Chicken",
		braille: 1,
		openess: 1,
		readability: 1,
		helpfulness: 5,
	},
	{
		place: "Andrew's Tea Shop",
		braille: 4,
		openess: 3,
		readability: 4,
		helpfulness: 2,
	},
	{
		place: "David's Cookies",
		braille: 5,
		openess: 2,
		readability: 4,
		helpfulness: 5,
	},
	{
		place: "Alexis's Ale",
		braille: 1,
		openess: 1,
		readability: 1,
		helpfulness: 5,
	},
	{
		place: "Eleni's Eggplants",
		braille: 4,
		openess: 3,
		readability: 4,
		helpfulness: 2,
	},
];
