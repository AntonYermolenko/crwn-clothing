import { withMatcher,Action,ActionWithPayload } from "../reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";
import { User } from "firebase/auth";


export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export const setCurrentUser = withMatcher((user:UserData): SetCurrentUser =>( 
{type:USER_ACTION_TYPES.SET_CURRENT_USER, payload: user}));

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export const checkUserSession = withMatcher(():CheckUserSession => ({type: USER_ACTION_TYPES.CHECK_USER_SESSION}));

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export const googleSignInStart = withMatcher(():GoogleSignInStart => ({type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START}));

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string} >
export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => ({type:USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: {email, password}}));

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>;
export const signInSuccess = withMatcher((user:UserData & {id: string}):SignInSuccess => ({type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user}));

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>
export const signInFailed = withMatcher((error: Error):SignInFailed => ({type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error}));

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, {email: string, password: string, displayName: string}>;
export const signUpStart = withMatcher((email: string, password: string, displayName: string):SignUpStart => ({type: USER_ACTION_TYPES.SIGN_UP_START, payload : {email, password, displayName}}));

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user: User; additionalDetails: AdditionalInformation}>;
export const signUpSuccess = withMatcher((user:User, additionalDetails:AdditionalInformation): SignUpSuccess => ({type: USER_ACTION_TYPES.SIGN_UP_SUCCESS, payload:{ user, additionalDetails}}));

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED, Error>;
export const signUpFailed = withMatcher((error:Error):SignUpFailed => ({type: USER_ACTION_TYPES.SIGN_UP_FAILED, payload: error}));

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export const signOutStart = withMatcher(():SignOutStart => ({type:USER_ACTION_TYPES.SIGN_OUT_START}));

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>; 
export const signOutSuccess = withMatcher(():SignOutSuccess => ({type:USER_ACTION_TYPES.SIGN_OUT_SUCCESS}));

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;
export const signOutFailed = withMatcher((error:Error):SignOutFailed => ({type:USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error}));