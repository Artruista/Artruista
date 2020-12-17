import * as types from '../actionsTypes/actionsTypes.js';

export const AddingStory = (data) => ({
	type: types.ADDING_STORY,
	payload: data,
});
