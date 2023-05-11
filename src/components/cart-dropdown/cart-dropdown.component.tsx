import {CartDropDownContainer,EmptyMessage,CartItems} from './cart-dropdown.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.copmonent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';


const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
     
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return(
        <CartDropDownContainer>
            <CartItems>
                {
                    cartItems.length ?
                    (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item}/>
                    ))) :
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                }
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            </CartItems>
        </CartDropDownContainer>
    );
};

export default CartDropdown;