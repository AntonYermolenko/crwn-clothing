import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { withMatcher,Action,ActionWithPayload } from "../reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import createAction from "../../utils/firebase/reducer/reducer.utils";



const addCartItem = (cartItems : CartItem[], productToAdd: CategoryItem): CartItem[] => {
    const exisstingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (exisstingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem
        );
    }
    return [...cartItems, {...productToAdd, quantity:1}]
}


const removeCartItem = (cartItems : CartItem[], cartItemToRemove : CategoryItem): CartItem[] => {
    const exisstingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if(exisstingCartItem && exisstingCartItem.quantity === 1 ){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
    );
}

export const deleteCartItem = ( cartItems : CartItem[] , cartItemToDelete : CategoryItem ): CartItem[] => {
return cartItems.filter(cartItem => cartItem.id !== cartItemToDelete.id);
    
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((bool:boolean): SetIsCartOpen => ({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool}));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => ({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems}))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const removeItemToCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
};

export const deleteItemToCart = (cartItems: CartItem[], cartItemToDelete: CartItem ) => {
    const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
    return setCartItems(newCartItems);
};


