import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import profilepic from "../../public/img/TORAE.jpeg";

function SavingData() {

    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllPosts').then((response) => {
            setPostsData(response.data);
        })
    }, []);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllUsers').then((response) => {
            setUserData(response.data);
        })
    }, []);

    let { userId } = useParams();

    var listItems = [];
    var listUser = [];

    userData.map(data => {
        if (data._id == userId) {

            listUser.push(data);
        }
    })

    postsData.map(data => {
        console.log(data.userId);
        console.log(userId);
        if (data.userId == userId) {

            listItems.push(data);
        }
    })

    const user = listUser.map(data => {
        return (
            <div key={data.id}>
                <p>{data.name}</p>

            </div>
        );
    });
    const email = listUser.map(data => {
        return (
            <div key={data.id}>
                <p>{data.email}</p>

            </div>
        );
    });

    let allAmountOfSaving = 0;
    let tasksOfDone = 0;
    let tasksOfNotDone = 0;
    let percentTasksOfDone = 0;

    const data = listItems.map(data => {
        allAmountOfSaving += data.amountOfSaving;
        if (data.status === true) {
            tasksOfDone += 1;
            percentTasksOfDone = (percentTasksOfDone + 1) / tasksOfDone * 100;
        } else {
            tasksOfNotDone += 1;
        }
        return (
            <div key={data._id}>
                <p>{data.allAmountOfSaving}</p>
            </div>
        )
    })

    return (
        <>
            <div>

                <div className="w-full min-h-screen dark:bg-slate-800 overflow-x-hidden ">
                    <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                        <Link to={'/'}>
                            <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                        </Link>
                        <Link className="ml-auto pr-4 mr-8 mt-1 cursor-pointer hover:text-indigo-900 " to={`/`}>
                            <span >Exit</span>
                        </Link>

                    </div>
                    <div className="blog">
                        <div className="tap">
                            <a href={`/List/${userId}`} >รายการออมเงิน</a>
                            <a href={`/InfoSaving/${userId}`} >ข้อมูลการออมเงิน</a>
                        </div >
                        <br></br><br></br>

                        <figure className=" border-2 border-white p-0 flex-col md:flex-row justify-center ml-auto mr-auto w-fit  ">
                            <img className="object-fill w-70 h-70 " id="profilepic" src={profilepic} width="500" height="10" />
                            <div className="pt-4 text-left space-y-5">
                                <blockquote>
                                <br></br>
                                    <p class="text-lg font-medium px-9">
                                    <p><b>จำนวนเงินที่ออมทั้งหมด</b> : {allAmountOfSaving}</p>
                                    <p><b>จำนวน task ที่ยังไม่เสร็จแล้ว</b> : {tasksOfNotDone} </p>
                                    <p><b>Percent task ที่ทำเสร็จ</b> : {percentTasksOfDone}%</p>
                                    </p>
                                </blockquote>
                                <figcaption class="font-medium px-9">
                                    <div class="text-sky-500 dark:text-sky-400">
                                        {user}
                                    </div>
                                    <div class="text-slate-700 dark:text-slate-500 ">
                                        {email}
                                    </div>
                                </figcaption>
                                <br></br>
                            </div>
                        </figure>
                        <br></br><br></br>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SavingData;