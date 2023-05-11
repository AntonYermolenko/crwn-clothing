import ProductCard from '../product-card/product-card.component';
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {

    return(
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>
                    <span className='title'>{title.toUpperCase()}</span>
                </Title>
            </h2>
            <Preview className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                    .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;