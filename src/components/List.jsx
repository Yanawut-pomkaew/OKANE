import './Style.css'
import './login.css'
import React , {useState , useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {Link , useParams , useLocation , useSearchParams , useNavigate} from 'react-router-dom';
import { Pie } from "@nivo/pie";
import { ThemeProvider, SvgWrapper } from "@nivo/core";
import plus from '../../public/img/plus.png'
import axios from 'axios';

function List() {

    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        } , 950)

       
    }, []);

    const [postsData , setPostsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/fetchAllPosts').then((response) => {
            setPostsData(response.data);
        })
    }, [])

    let { userId } = useParams();

    var listItems = [];
    const [filter , setFilter] = useState("all");

    postsData.map( data => {
        
        if( data.userId == userId && (filter==data.status.toString() || filter==="all")) {
            
            listItems.push(data);
        }
    })
    
    const allLists = listItems.map( data => {
        return (
            
            <div key={data._id}>
                
                
                <Link to={`/list/${userId}/${data._id}`} >
                <div className="list-card">

                   
                <button className="delete" onClick={(e) => {
   
                        const url = 'http://localhost:3000/list/' + data.userId + "/" + data._id + "/delete";
                        fetch(url,  {method : 'DELETE'})
                            .then((res) => {
                                if(!res.ok) {
                                    throw new Error("Error, Please try again.");
                                }
                               
                                navigate(`/list/${data.userId}`);
                            })
                            .catch((e) => {
                                console.log(e);
                            })
                    }}>
                      
                            <p>X</p>
                        
                    </button>

                    <img src={data.img} alt={`${data.img} image`}/>
                    <h2>{data.name}</h2>

                    {data.status === true
                    ? (
                        <div>
                            <p className="text-green-500 text-center mb-4 text-2xl">เสร็จสิ้น</p>
                        </div>
                    )
                    : (
                        <div>
                        <p>เหลืออีก <span className="leftPrice">{data.price - data.amountOfSaving}</span> บาท</p>
                    {
                        data.des.length > 28 
                        ? <p>{`${data.des.substring(0,28)}...`}</p>
                        : <p>{`${data.des}`}</p>
                    }
                    </div>
                    )
                    }
                    
                    
                    
                    <small>{data.startDate} - {data.endDate}</small>

                </div>
                </Link>
            </div>
        );
    })

    const [popup , setPopup] = useState(false);

    function setStatusPopup() {
        
        setPopup(!popup);

        if(popup === false) {
            window.scrollTo({top: 0, left: 0});
            document.body.style.overflow = "hidden";
            
        }else {
            document.body.style.overflow = "visible";
        }   
    }

    let maxId = 0;

    postsData.map( data => {
        if(data.id > maxId) {
            maxId = data.id;
        }
    })

    const [userName , setUserName] = useState('');
    const [userPrice , setUserPrice] = useState();
    const [des , setDes] = useState("");
    const [img , setImg] = useState({});
    const [imgName , setImgName] = useState("");
    const [endDate , setEndDate] = useState();

    function handleName(e) {
        setUserName(e.target.value);
    }

    function handleDes(e) {
        setDes(e.target.value);
    }

    function handlePrice(e) {
        setUserPrice(e.target.value);
    }

    function handleEndDate(e) {
        setEndDate(e.target.value);
    }


    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        const reader = new FileReader(); 
      
        reader.onloadend = () => { 
            setImg(file);
            setImgName(fileName);
     
        }
        reader.readAsDataURL(file);
       
       
    }


    
 
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

                <div className="w-full min-h-screen dark:bg-slate-800 overflow-x-hidden ">
                <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                    <Link to={'/'}>
                        <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                    </Link>
                    <Link className="ml-auto pr-4 mr-8 mt-1 cursor-pointer hover:text-indigo-900 " to={`/`}>
                        <span >Exit</span>
                    </Link>

                </div>

                <div className="add-list-area">
                            <button>
                                <div className="add-list" onClick={() => {setStatusPopup()}}>
                                    <img src={plus} />
                                </div>
                            </button>
                        
                </div>

                <div className="blog">
                    <div className="tap">
                        <a href={`/List/${userId}`} >รายการออมเงิน</a>
                        <a href={`/InfoSaving/${userId}`} >ข้อมูลการออมเงิน</a>
                    </div>
                   
                    
                    <div className="mt-10">
                        <div className="mb-8">
                    
                            <select name="listType" id="listType" value={filter} onChange={(e) => {setFilter(e.target.value); console.log(filter)}}>
                                <option value="all" >ทั้งหมด</option>
                                <option value="true" >รายการที่เสร็จสิ้น</option>
                                <option value="false" >รายงานยังไม่เสร็จ</option>
                            </select>
                        </div>
                        <div className="lists-area">
                            {allLists}
                          
                        </div>
                       

                    </div>

                    { popup === true 
                    ?
                    <div className="main">
                        <div className="popup">
                            <div className="popup-header">
                                <h1>เพิ่มรายการ</h1>
                                <p onClick={() => {setStatusPopup()}}>X</p>
                            </div>

                            <div className="popup-content">
                            
                                <form method="POST"  action={`http://localhost:3000/dataListItems/${userId}/post?name=${userName}&price=${userPrice}&des=${des}&img=${img}&endDate=${endDate}`} encType="multipart/form-data">
                                    <div className="data">
                                        <label>ชื่อรายการ</label>
                                        <input onChange={(e) => {handleName(e)}} id="name" name="name" type="text" required />
                                    </div>

                                    <div className="data">
                                        <label>ราคา</label>
                                        <input onChange={(e) => {handlePrice(e)}} id="price" name="price" type="number" required />
                                    </div>

                                    <div className="data">
                                        <label>รูปภาพ</label>
                                        
                                    </div>
                                    <input id="img" className="file-input" name="img" type="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={handleUploadImage} required />


                                    <div className="data">
                                        <label>คำอธิบาย</label><br></br>
                                        <textarea onChange={(e) => {handleDes(e)}} id="des" name="des" rows="3" cols="50"></textarea>
                                    </div>  

                                    <div className="data">
                                        <label>วันสิ้นสุดการออม</label>
                                        <input onChange={(e) => {handleEndDate(e)}} id="endDate" className="date-input" name="endDate" type="date" required />
                                    </div>

                                    
                                    <div className="break"></div>
                          
                                    <button>เพิ่มรายการ</button>
                             
                                    
                                </form>
                            </div>

                        </div>
                    </div>

                    : <></>

                    }
                    
                </div>
            </div>

                )
            }
            
            
        </div>
    )

    
}

export default List;