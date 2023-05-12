import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Detail() {


    const navigate = useNavigate();


    const [detailData, setDetailData] = useState([]);
    const [editShow, setEditShow] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllPosts').then((response) => {
            setDetailData(response.data);
        })
    }, [])

    let { userId, postId } = useParams();

    var listItems = [];
    const [amount, setAmount] = useState(0);

    detailData.map(data => {
        if (data.userId == userId && data._id == postId) {

            listItems.push(data);
        }
    })

    const [des, setDes] = useState("");



    const details = listItems.map(data => {
        return (
            <div key={data._id}>
                <br></br><br></br>
                <div className="text-center detail-describe border-2 border-white p-2 sm:p-7 flex-col md:flex-row justify-center ml-auto mr-auto w-fit lg:mt-100">
                    <img src={data.img} className="w-80 h-80" alt="post-img" />
                    <div className="detail-text ">
                        <h1>{data.name}</h1>
                        <div className="flex justify-center "><p>{data.startDate} - {data.endDate}</p></div>
                        <div ><p className='flex justify-center border-2 border-white'>"{data.des}"<img className="w-6 h-6 cursor-pointer ml-4 mt-2" src={'../../public/img/edit.png'} onClick={() => { setEditShow(!editShow) }} /></p></div>
                        {editShow
                            ? (
                                    <div className="flex flex-col w-1xl">

                                        <textarea name="des" id="des" row="4" column="50" onChange={(e) => { setDes(e.target.value) }}></textarea>
                                        <button id="submitUpdateDes" onClick={(e) => {
                                            const url = `http://localhost:3000/update/${data.userId}/${data._id}?des=${des}`;
                                            fetch(url, { method: 'PATCH' })
                                                .then((res) => {
                                                    if (!res.ok) {
                                                        throw new Error("Error, Please try again.");
                                                    }
                                                    window.location.reload();
                                                    navigate(`/list/${data.userId}/${data._id}`);
                                                })
                                                .catch((e) => {
                                                    console.log(e);
                                                })
                                        }}>แก้ไข</button>
                                    </div>
                            )
                            : (
                                <></>
                            )
                        }
                        {data.price - data.amountOfSaving <= 0

                            ? (

                                <div><br></br><p className="text-green-500 mb-4 mt-4 text-3xl">รายการนี้เสร็จสิ้นแล้ว</p></div>
                            )
                            : (
                                <div>
                                    <p>เหลืออีก <span className="text-red-600">{data.price - data.amountOfSaving}</span> บาท</p>
                                    <div>
                                        <label>ออมเงิน</label><br></br>
                                        <input className="input-amount" type="number" name="amountMoney" onChange={(e) => { setAmount(e.target.value) }} />

                                        <button className="addMoney" onClick={(e) => {
                                            console.log("WEHYYASDJFGH");
                                            const url = 'http://localhost:3000/list/' + data.userId + "/" + data._id + "/addMoney?amount=" + amount;
                                            fetch(url, { method: 'PATCH' })
                                                .then((res) => {
                                                    if (!res.ok) {
                                                        throw new Error("Error, Please try again.");
                                                    }
                                                    window.location.reload();
                                                    navigate(`/list/${data.userId}/${data._id}`);
                                                })
                                                .catch((e) => {
                                                    console.log(e);
                                                })
                                        }}>

                                            <p>เพิ่ม</p>

                                        </button>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>

                <br></br><br></br>
            </div>
        );
    })

    return (
        <>
            {listItems.map(data => {
                return (



                    <div>
                        <div className="w-full min-h-screen dark:bg-slate-900 overflow-x-hidden ">

                            <div id="okanet" className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                                <Link to={`/list/${data.userId}`}>
                                    <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                                </Link>
                                <Link className="ml-auto pr-4 mr-8 mt-1 cursor-pointer hover:text-indigo-900 " to={`/`}>
                                    <span >Exit</span>
                                </Link>

                            </div>
                            {details}
                        </div>
                    </div>
                    //</div>
                )

            })}




        </>

    );

}

export default Detail;