import Header from './Header';
import HeroSection from "./HeroSection"
import HomeContent from "./HomeContent"
import React , {useState , useEffect} from 'react'
import './Style.css'
import ClipLoader from "react-spinners/ClipLoader";

function Home() {

    const [loading , setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        } , 1500)

       
    }, []);

    return(
        <div >
            <div className="w-full dark:bg-slate-800 overflow-auto" >
                {  
                loading ? (
                    <div className="spinner">
                    <ClipLoader 
           
                    size={150}
                    color={"#123abc"}
                    loading={loading}  
                    />
                    </div>
                )
                : (
                    <div>
                        <div>
                        <Header />
                        </div>

                        <div>
                        <HeroSection/>
                        </div>

                        <div>
                        <HomeContent /> 
                        </div>
                        
                    </div>
                )
                }
            </div>
        </div>
        ) 
}

export default Home;