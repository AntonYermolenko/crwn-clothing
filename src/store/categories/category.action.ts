import { CATEGORIES_ACTION_TYPES,CategoryItem,Category } from "./category.types";
import { Action, ActionWithPayload } from "../reducer/reducer.utils";
import { withMatcher } from "../reducer/reducer.utils";

export type fetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type fetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;

export type fetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export type CategoryAction = fetchCategoriesStart | fetchCategoriesSuccess | fetchCategoriesFailed

export const fetchCategoriesStart = withMatcher((): fetchCategoriesStart => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START}))

export const fetchCategoriesSuccess = withMatcher((categoryArray: Category[]): fetchCategoriesSuccess => ({
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload:categoryArray
}) )

export const fetchCategoriesFailed = withMatcher((error:Error): fetchCategoriesFailed => ({
    type:CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    payload: error
}));

