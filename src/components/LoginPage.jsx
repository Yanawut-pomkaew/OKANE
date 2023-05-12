import './login.css';
import {Link  , useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import React , {useState , useEffect} from 'react';
import './style.css'
import axios from 'axios';


function LoginPage() {
 
   const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        } , 500)

       
    }, []);

    const [userName , setUserName] = useState("");
    const [password, setPassword] = useState("");


    const [userData, setUserData] = useState([]);

   useEffect(() => {
         axios.get('http://localhost:3000/fetchAllUsers').then((response) => {
            setUserData(response.data);
         })
   }, []);

   // function checkUser(e) {
   //    userData.map( data => {
   //       if(data.name === userName && data.password === md5(password)) {
   //          return ;
   //       }
   //    })

   //    e.preventDefault();
   // }

   const [error , setError] = useState(false);



   return(
      <div className="center">
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

            <div className="container">
         
            <div className="text">
               
               <p>Login Form</p>
            </div>
            <form>
               <div className="data">
                  <label>Username</label>
                  <input name="username" type="text" onChange={(e) => {setUserName(e.target.value)}} required />
               </div>
               <div className="data">
                  <label>Password</label>
                  <input name="password" type="password" onChange={(e) => {setPassword(e.target.value)}} required />
               </div>
               {error
               ?(
                  <>
                  <p className="alert-login">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</p>
                  </>
               )
               :(
                  <>
                  
                  </>
               )

               }
               <div className="btn">
                  <div className="inner"></div>
                  <button onClick={ async (e) => {
                     e.preventDefault();
                     await fetch(`http://localhost:3000/login?userName=${userName}&password=${password}` , {method : 'GET'})
                     .then(( res) => {
                        if(!res.ok) {
                           setError(true);
                        }else {
                           setError(false);

                           userData.map( data => {
                              if(data.name === userName) {
                                 window.location.replace(`http://localhost:5173/list/${data._id}`);
                              }
                           })
                        }
                      
                     })
               
                     console.log(error);
                  }} >login</button>
               </div>
               <div className="signup-link">
                  Not a member? <Link to={`http://localhost:5173/register`}>Signup now</Link>
               </div>
            </form>
         </div>

         )}
         </div>
      
         
      </div>
   )

}

export default LoginPage;


   