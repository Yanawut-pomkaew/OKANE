import './Style.css'
import React , {useState , useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import FakeData from './FakeData.json';
import {Link , useParams } from 'react-router-dom';
import FakeDataAmount from './FakeDataAmout.json';
import { Pie } from "@nivo/pie";
import { ThemeProvider, SvgWrapper } from "@nivo/core";

function List() {

    const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        } , 950)

       
    }, []);

    var lists = [];

    let { userId } = useParams();
 
    FakeDataAmount.map( data => {
        if(data.userId === userId) {
      
            lists.push(data);


           
        }
    })



    const QW = [
        {
         id: "Item1",
         value: 410,
         color: "hsl(19, 70%, 50%)"
        },
        {
         id: "Item2",
         value: 175,
         color: "hsl(213, 70%, 50%)"
        },
        {
         id: "Item3",
         value: 128,
         color: "hsl(58, 70%, 50%)"
        }
    ];


    const graph = lists.map ( data => {
        return (
            <div key={data.id}>
                <h2>{data.month}</h2>
                {data.nameList.map( (d , index) => (
                    <div key={index}>
                        <p>{d}</p>
                    </div>
                ))}

                <Pie
                width={400}
                height={400}
                data={QW}
                margin={{
                    top: 40,
                    right: 80,
                    bottom: 80,
                    left: 80
                }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                borderColor="inherit:darker(0.9)"
                />
              
               

            </div>
        )
    })



    const data = FakeData.map( data => {

        return(
            <div key={data.id}>
                <h1>ชื่อ : <span>{data.name}</span></h1>
                <h1>id : <span>{data.id}</span></h1>
                <h1>email : <span>{data.email}</span></h1>
                <h1>รหัสผ่าน : <span>{data.password}</span></h1>
                <h1>เงินเดือน : <span>{data.salary}</span></h1>
            </div>
        )
    })
    

    return(
        <div>

            {
                loading ? (
                    <div className="w-full dark:bg-slate-800 overflow-auto">
                    <div className="spinner">
                    <ClipLoader 
           
                    size={150}
                    color={"#123abc"}
                    loading={loading}  
                    />
                    </div>
                    </div>
                ): (

                    <div className="w-full min-h-screen dark:bg-slate-800">
                <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                    <Link to={'/'}>
                        <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                    </Link>
                </div>

                <div className="blog">
                    <div className="tap">
                        <a href="/InfoSaving" >ข้อมูลการออมเงิน</a>
                        <a href="/ListSaving" >รายการออมเงิน</a>
                        
                    </div>
                    
                    <div className="mt-10">
                        {graph}
                        {data}
                    </div>
                    
                </div>
            </div>

                )
            }
            
            
        </div>
    )
}

export default List;