import * as types from './actionsTypes/actionsTypes';

const initialState = {
	counter: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.INCREASE:
			return {
				...state,
				counter: state.counter + 1,
			};

		default:
			return state;
	}
};

export default reducer;
