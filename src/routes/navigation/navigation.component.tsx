import { Fragment } from "react";
import { Outlet, Link} from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import  {NavigationContainer,LogoContainer,NavLink,NavLinks} from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

function Navigation() {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const disptach = useDispatch();
    const signOutUser = () => disptach(signOutStart());

    return (
        <Fragment>
            <NavigationContainer >
                    <LogoContainer to="/">
                        <CrwnLogo />
                    </LogoContainer>
                <NavLinks>
                    <Link to="/shop">SHOP</Link>
                    {
                        currentUser? 
                       ( <NavLink as="span" onClick={signOutUser}> SIGNOUT</NavLink>)
                        :
                       ( <NavLink  to="/auth">SIGN IN</NavLink>)
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
                
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
  }

export default Navigation