import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';

const Oauth = () => {
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;
            console.log(userEmail);

            const response = await fetch('/auth/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            const data = await response.json();
            if (data.success) {
                window.location.href = '/homepage';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handleGoogleClick}>Sign in with Google</button>
    );
};

export default Oauth;
