import Header from './Header';
import HeroSection from "./HeroSection"
import HomeContent from "./HomeContent"

function Home() {
    return(
        <div>
            <div className="w-full dark:bg-slate-800 overflow-auto" >
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
            
        </div>
    )
}

export default Home;