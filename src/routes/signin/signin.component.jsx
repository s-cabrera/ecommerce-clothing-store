//Imports
import { 
    signInWithGooglePopup, 
    createUserDocFromAuth 
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocFromAuth(user)
    };
    return (
        <>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </>
        
    );
}

export default SignIn