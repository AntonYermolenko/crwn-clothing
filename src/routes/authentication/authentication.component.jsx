import SignUpForm from '../../components/sing-up/sing-up-from.component';
import SignInForm from '../../components/sing-in/sing-in-from.component';
import './authentication.styles.scss'

function Authentication() {


    return(
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication;