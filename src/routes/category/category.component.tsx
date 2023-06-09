import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { cateogrySelector, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import {Spinner} from '../../components/spinner/spinner.component'
import { CategoryContainer,CategoryTitle } from './category.styles';

type CategoryRouteParams = {
    category: string;

} 

const Category = () => {
    const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap  = useSelector(cateogrySelector);
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProucts ] = useState(categoriesMap[category]);
    
    useEffect(() => {
        setProucts(categoriesMap[category])
    }, [category,categoriesMap])

    return(
        <>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        {
            isLoading ? <Spinner /> :
            <CategoryContainer>
                {   products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />  )
                }
            </CategoryContainer>
        }
        </>
    )
   
}; 

export default Category;