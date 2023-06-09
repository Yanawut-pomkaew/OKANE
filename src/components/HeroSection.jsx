import './Style.css';
import heroImg from '../../public/img/heroSection-img.jpg';
import logo from '../../public/img/mascot.png';

import { Link } from "react-router-dom";

function HeroSection() {
    return(
        <div >
                <div className="heroSection">
                    <img src={heroImg}/>
                    <div className="heroText">
                        <h1>OKANE จะช่วยให้คุณสามารถจัดการการออมเงินและวางแผนในการซื้อสินค้าโปรด
                        วางแผนซื้อตั๋วคอนเสิร์ตศิลปินที่คุณชื่นชอบหรือวางแผนเดินทางท่องเที่ยวรอบโลก!
                        </h1>

                        <h3><span className="okane">"OKANE"</span> <span className="okane-postfix">MAKE YOUR  LIFE BETTER</span></h3>
                        
                        <div className="button-hero-section"> 
                            <img className="logo" src={logo} />
                            <Link className="start" to={`/login`}><button className="st">Get Start</button></Link>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default HeroSection;