export type InitialStateType = any;
type ActionsType = any;

const initialState: InitialStateType = {};

export const mainReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		default:
			return state;
	}
};
