import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [confirm, confirmPass] = useState('');


    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllUsers').then((response) => {
            setUserData(response.data);
        })
    }, []);


    return (
        <div className="overflow-hidden">
            <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                <Link to={'/'}>
                    <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                </Link>
            </div>

            <div className="text-center text-4xl mt-10 font-semibold">

                <p>Register</p>
            </div>

            <form className="mt-14  flex flex-col gap-y-4 " method="POST" action={`http://localhost:3000/addUser?name=${name}&email=${email}&password=${pass}`}>
                <label className="pl-14" htmlFor="name">Username </label>
                <input className="border-2 border-slate-300 p-2 w-11/12 ml-auto mr-auto" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="username" />
                <label className="pl-14" htmlFor="email">Email</label>
                <input className="border-2 border-slate-300 p-2 w-11/12 ml-auto mr-auto" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="cs369@gmail.com" id="email" name="email" />
                <label className="pl-14" htmlFor="password">Password &nbsp;&nbsp;&nbsp;{pass === confirm
                    ? (
                        <>
                        </>
                    )
                    : (
                        <>
                            <span><small className="text-red-600">รหัสผ่านต้องตรงกัน</small></span>
                        </>
                    )
                }</label>
                <input className="border-2 border-slate-300 p-2 w-11/12 ml-auto mr-auto" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <label className="pl-14" htmlFor="confirm">Confirm password&nbsp;&nbsp;&nbsp;{pass === confirm
                    ? (
                        <>
                        </>
                    )
                    : (
                        <>
                            <span><small className="text-red-600">รหัสผ่านต้องตรงกัน</small></span>
                        </>
                    )
                }</label>

                <input className="border-2 border-slate-300 p-2 w-11/12 ml-auto mr-auto" value={confirm} onChange={(e) => confirmPass(e.target.value)} type="password" placeholder="********" id="confirm" name="confirm" />
                {error
                    ? (
                        <>
                            <p className="pl-14 text-red-700">ขออภัย! มีผู้ใช้ใช้ชื่อผู้ใช้หรืออีเมลนี้สมัครไปแล้ว</p>
                        </>
                    )
                    : (
                        <>
                        </>
                    )
                }

                {pass === confirm
                    ? (
                        <button className="mt-4 text-white ease-in-out duration-300 hover:bg-sky-700" onClick={async (e) => {
                            e.preventDefault();
                            await fetch(`http://localhost:3000/addUser?name=${name}&email=${email}&password=${pass}`, { method: 'POST' })
                                .then((res) => {
                                    if (!res.ok) {
                                        setError(true);
                                    } else {
                                        setError(false);
                                        window.location.replace(`http://localhost:5173/login`);

                                    }

                                })

                            console.log(error);
                        }}>Register</button>
                    )
                    : (
                        <>
                        </>
                    )
                }

            </form>
            <button className="flex ml-auto mr-auto mt-6 mb-16 text-sky-800 underline"><Link to={'http://localhost:5173/login'}>Already have an account? Login here.</Link></button>
        </div>
    )
}

export default Register;
