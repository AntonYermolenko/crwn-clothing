import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen , selectCartCount } from '../../store/cart/cart.selector';

const CartIcon = () => {
    const disptach = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    const toggleIsCartOpen = () => disptach(setIsCartOpen(!isCartOpen));
    

    return(
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen} />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;