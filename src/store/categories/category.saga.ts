import {takeLatest, all, call, put} from 'typed-redux-saga/macro';
import { getCategoiresAndDocuemnts } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess } from './category.action';
import { fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try{
        const categoriesArray = yield* call(getCategoiresAndDocuemnts);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    }
    catch(error){
        yield* put(fetchCategoriesFailed(error as Error));
    }

}

export function* onFetchCategories() {
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync )
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)])
}