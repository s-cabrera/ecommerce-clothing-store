//Imports

import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';


import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect, 
    createUserDocFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

const SignIn = () => {

    useEffect(async() => {
        const response = await getRedirectResult(auth)
        if(response){
            const userDocRef = await createUserDocFromAuth(response.user)
        }
    }, [])
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user)
    };

    return (
        <>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In with Google Redirect</button>
            <SignUpForm />
        </>
        
    );
}

export default SignIn