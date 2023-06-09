import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { PrdouctCardCotnainer, Name, Price, Footer} from './product-card.styles'
import { CategoryItem } from '../../store/categories/category.types';
import { FC } from 'react';


type CardProductProps = {
    product:CategoryItem
};


const ProductCard:FC<CardProductProps> = ({product}) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl} = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems,product));

    return(
        <PrdouctCardCotnainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to card</Button>
        </PrdouctCardCotnainer>
    );
};

export default ProductCard; 