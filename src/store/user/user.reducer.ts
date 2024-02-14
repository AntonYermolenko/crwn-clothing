import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed,signUpFailed,signOutFailed,signOutSuccess,signInSuccess } from "./user.action";
import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INTINAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INTINAL_STATE, action: AnyAction) => {
    if (signInSuccess.match(action)){
        return {...state, currentUser: action.payload};
    }
    if(signOutSuccess.match(action)){
        return {...state, currentUser: null};
    }
    if(signInFailed.match(action) || signOutFailed.match(action)  || signUpFailed.match(action)){
        return {...state, error: action.payload};
    }
    return state


}

