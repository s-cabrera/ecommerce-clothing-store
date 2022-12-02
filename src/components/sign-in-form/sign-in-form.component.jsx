//React
import { useState, } from 'react';

//Firebase methods
import { 
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup, 
    //signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils'

//Components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

//Styling
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) { alert("Missing input field") }
        else {
            try {
                const {user} = await signInAuthUserWithEmailAndPassword(email, password);
                // setCurrentUser(user);
                resetFormFields();
            } catch (error) {
                switch(error.code){
                    case "auth/wrong-password": 
                        alert("Incorrect Password");
                        break;

                    case "auth/user-not-found":
                        alert("User not found");
                        break;
                    default: console.log(error);
                }
            }

        }
    }

    return (
        <div className='sign-in-form-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    inputOptions={{
                        type: "email",
                        required: true,
                        onChange: handleChange,
                        name: "email",
                        value: email
                    }}

                />

                <FormInput
                    label="Password"
                    inputOptions={{
                        type: "password",
                        required: true,
                        onChange: handleChange,
                        name: "password",
                        value: password
                    }}
                />
                <div className='buttons-container'>
                    <Button 
                        type="submit" 
                        buttonType='default' 
                        onClick={signInAuthUserWithEmailAndPassword}>
                            Sign In
                    </Button>
                    
                    <Button 
                        type="button"
                        buttonType='google' 
                        onClick={signInWithGoogle}>
                            Google Sign In 
                    </Button>
                
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;