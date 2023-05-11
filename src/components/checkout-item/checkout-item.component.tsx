import { addItemToCart, deleteItemToCart, removeItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItemProps } from '../cart-item/cart-item.copmonent';
import { FC } from 'react';
import {CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles'


const CheckoutItem: FC<CartItemProps> = ({cartItem}) => {
    const disptach = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const {name, imageUrl, quantity, price} = cartItem;


    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
            <Arrow onClick={()=> disptach(removeItemToCart(cartItems,cartItem))}>
                &#10094;
            </Arrow>
            <Value>{quantity}</Value>
            <Arrow onClick={()=> disptach(addItemToCart(cartItems,cartItem))}>
                &#10095;
            </Arrow>
            </Quantity>

            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={()=> disptach(deleteItemToCart(cartItems,cartItem))}> &#10005; </RemoveButton>

        </CheckoutItemContainer>
    )

}

export default CheckoutItem;