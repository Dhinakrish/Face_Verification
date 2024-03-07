import Constants from '../../util/Constants';

let initialState = {
    isLoading: true,
}

const {ACTIONS} = Constants;

export const splashState = (state = initialState, action) => {
    const {type} = action;
    switch (type) {
        case ACTIONS.SHOW_LOADING:
            return{...state, isLoading: true}

        case ACTIONS.HIDE_LOADING:
            return{...state, isLoading: false}
        default:
            return state;
    }
};

export const splashIsLoading = state => state.splashState.isLoading;