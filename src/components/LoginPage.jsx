import './login.css';
import {Link} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import React , {useState , useEffect} from 'react';
import './style.css'

function LoginPage() {

   const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        } , 500)

       
    }, []);


   return(
      <div class="center">
         <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
            <Link to={'/'}>
                  <h1 className="text-2xl font-bold pl-8">OKANE</h1>
            </Link>
         </div>

         <div className="w-full dark:bg-slate-800 overflow-auto">
         {loading ? (
            <div className="spinner">
            <ClipLoader 
   
            size={150}
            color={"#123abc"}
            loading={loading}  
            />
            </div>
         ) : (

            <div class="container">
         
            <div class="text">
               
               <p>Login Form</p>
            </div>
            <form action="#">
               <div class="data">
                  <label>Username</label>
                  <input type="text" required />
               </div>
               <div class="data">
                  <label>Password</label>
                  <input type="password" required />
               </div>
               <div class="forgot-pass">
                  <a href="#">Forgot Password?</a>
               </div>
               <div class="btn">
                  <div class="inner"></div>
                  <button type="submit">login</button>
               </div>
               <div class="signup-link">
                  Not a member? <a href="#">Signup now</a>
               </div>
            </form>
         </div>

         )}
         </div>
      
         
      </div>
   )

}

export default LoginPage;


      // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
