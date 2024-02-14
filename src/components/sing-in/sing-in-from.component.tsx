import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useDispatch } from 'react-redux';
import { googleSignInStart,emailSignInStart } from '../../store/user/user.action';
import { SignInContainer,ButtonsContainer } from './sign-in-form.styles';
import { FormEvent,ChangeEvent } from 'react';

function SignInForm(){

    const disptach = useDispatch();

    const defaultFormField = {
        email: "",
        password: "",
    }

    const [formFields, setFormFields] = useState(defaultFormField);
    const {email, password} = formFields;
    const resetFromFields = () => {
        setFormFields(defaultFormField); 
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSumbit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try{
            disptach(emailSignInStart(email,password));
            resetFromFields();
        }catch(error){
            switch(error){
                default:
                    console.log(error);
            }
        }  
    };

    const signInWithGoogle = async() => {
        disptach(googleSignInStart());
    };
 
    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email</span>
            <form onSubmit={handleSumbit}>
                <FormInput label="email" required type="email" onChange={handleChange} name="email" value={email} />
                <FormInput label="password" required type="password" onChange={handleChange} name="password" value={password} />
                <ButtonsContainer>
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>SIGN IN </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
    }

export default SignInForm;