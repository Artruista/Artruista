import * as types from './actionsTypes/actionsTypes';

const initialState = {
	userCard: [
		{
			firstName: 'Jon',
			lastName: 'A',
			story: 'I ate taco bell',
			help: 'My tummy hurted',
			lat: 33.684566,
			lng: -117.826508,
		},
		{
			firstName: 'Mai',
			lastName: 'N',
			story: 'wowow allala',
			help: "don't sleep",
			lat: 34.052235,
			lng: -118.243683,
		},
		{
			firstName: 'Seamus',
			lastName: 'r',
			story: 'something',
			help: 'blah',
			lat: 33.77005,
			lng: -118.193741,
		},
		{
			firstName: 'Jarryl',
			lastName: 'o',
			story: 'wowoow',
			help: 'meooow',
			lat: 33.835293,
			lng: -117.914505,
		},
	],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADDING_STORY:
			// creating userCard variable that will add new story input
			const userCard = [...state.userCard, action.payload];
			return {
				...state,
				userCard: userCard,
			};

		default:
			return state;
	}
};

export default reducer;
