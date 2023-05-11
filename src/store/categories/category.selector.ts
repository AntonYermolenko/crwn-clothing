import { createSelector } from "reselect";
import { CategoriesState } from "./category.redcuer";
import { Rootstate } from "../store";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state:Rootstate): CategoriesState => state.categories;

export const selectCategeories = createSelector(
        [selectCategoryReducer],
        (categoriesSlice) => categoriesSlice.categories
);


export const cateogrySelector = createSelector(
        [selectCategeories],
        (categories):CategoryMap => {
                console.log('selector fired');
                return categories.reduce((acc, category) => {
                        const {title, items} =category;
                        acc[title.toLowerCase()] = items; 
                        return acc;}, {} as CategoryMap);
                }
)


export const selectCategoriesIsLoading = createSelector(
        [selectCategoryReducer],
        (categoriesSlice) => categoriesSlice.isLoading
)