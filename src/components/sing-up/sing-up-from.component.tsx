import {  ChangeEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer,ButtonsContainer } from "./sign-up-form.styles";
import { FormEvent, } from "react";
import { AuthError,AuthErrorCodes } from "firebase/auth";


const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword:  ""
}

function SignUpForm(){
    const [formFields, setFormFields] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formFields;
    const disptach = useDispatch();
 
    console.log("hit");

    const resetFromFields = () => {
        setFormFields(defaultFormField);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }; 
    

    async function handleSumbit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (password !== confirmPassword){
            alert("Password do not match");
            return;
        }try{
            disptach(signUpStart(email, password, displayName))
            resetFromFields();  
        }catch(error){
            if((error as AuthError).code == AuthErrorCodes.EMAIL_EXISTS){
                alert('Cannot create user, email already in use');
            }
            console.log(error);
        }

                
    }
    
    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up wiht your email and password</span>
            <form onSubmit={handleSumbit}>

                <FormInput label="Dispaly Name" required type="text" onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />
 
                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                
                <Button type="submit" >Sign Up</Button>
            </form>
        </SignUpContainer>
        )
    }

export default SignUpForm;