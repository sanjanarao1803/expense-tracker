import {auth,provider} from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate,Navigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
// import { useEffect } from "react";

export const Auth = () => {
    const navigate=useNavigate();
    const {isAuth} = useGetUserInfo();
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth,provider)
        console.log(results);
        const authInfo = {
            userID:results.user.uid,
            name:results.user.displayName,
            profilePhoto:results.user.photoURL,
            isAuth:true,
        };
        localStorage.setItem("auth",JSON.stringify(authInfo));
        navigate("/expense-tracker");
    };
    if(isAuth) {
        return <Navigate to="/expense-tracker" />;
    }
    // useEffect(()=>{
    //     if(isAuth){
    //         navigate("/expense-tracker");
    //     }
    //     else{
    //         navigate("/");
    //     }
    // })

    return (
        <div className="login-page">
            <p className="sign-in">Sign In with Google</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign In with Google
            </button>
        </div>
    );
}