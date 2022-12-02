//React
import { useState } from 'react';

//Firebase
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocFromAuth } 
from '../../utils/firebase/firebase.utils'

//Components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

//Styling
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!displayName || !email || !password || !confirmPassword) { alert("Missing input field") }
        else if (password !== confirmPassword) {
            alert("Passwords do not match!");
        }
        else {
            try {
                const {user} = await createAuthUserWithEmailAndPassword(email, password);
                
                await createUserDocFromAuth(user, { displayName });
                resetFormFields();
            } catch (error) {
                if (error.code === 'auth/already-in-use') {
                    alert("Email already in use")
                }
                else {
                    alert("Failed: Create new user", error.message)
                }
                resetFormFields();
            }

        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Display Name"
                    inputOptions={{
                        type: "text",
                        required: true,
                        onChange: handleChange,
                        name: "displayName",
                        value: displayName
                    }}
                />

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

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type: "password",
                        required: true,
                        onChange: handleChange,
                        name: "confirmPassword",
                        value: confirmPassword
                    }}
                />

                <Button buttonType='default'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;