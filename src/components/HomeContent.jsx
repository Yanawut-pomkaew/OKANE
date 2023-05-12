import React from 'react';
import './Style.css';
import calculator from '../../public/img/calculator.png';
import management from "../../public/img/management.png";
import saveMoney from "../../public/img/save-money.png";
import rock from "../../public/img/rock.gif";
import pooh from "../../public/img/pooh.jpg";
import nick from "../../public/img/Nick.jpg";

function HomeContent() {
    return(
        <div className="homeContent-area ">
            <div className="grid gap-x-6 gap-y-4 grid-cols-3 text-center overflow-auto text-slate-100">
                <div className="function-blog">
                    <img src={calculator} />
                    <h2>ตัวช่วยในการจัดสรรงบประมาณ</h2>
                </div>

                <div className="function-blog">
                    <img src={management} />
                    <h2>คำนวณรายรับ-รายจ่าย</h2>
                </div>

                <div className="function-blog">
                    <img src={saveMoney} />
                    <h2>คำนวณการออมเงินรายเดือน</h2>
                </div>
            </div> 

            <h1 className="review-notation">รีวิวจากผู้ใช้งานจริง</h1>

                <div className="reviews-area">
                    <div className="review-card">
                        <img className="review-profile" src={rock} />
                        <h3>Dwayne Johnson</h3>
                        <p >พ๋มเลือกชายเว็บนี้เพราะมันเจ๋งมาก มันช่วยพ๋มปายัดเงินเวลาได่เงินจากการเลนหนัง สุดยอดมากคับพ๋ม</p>
                    </div>

                    <div className="review-card">
                        <img className="review-profile" src={pooh} />
                        <h3>Xi Jinpooh</h3>
                        <p >อั๋วให้คะแนนการออกแบบเว็บนี้ 10/10.</p>
                    </div>

                    <div className="review-card">
                        <img className="review-profile" src={nick} />
                        <h3>Vitthawin Khantichaimongkol</h3>
                        <p >"เว็๋บแม่งเหี้ยสัส5555555"</p>
                    </div>

                </div>
  

               
        </div>
    )
}

export default HomeContent;