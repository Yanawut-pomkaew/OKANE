import React from 'react';
import './Style.css';
function HomeContent() {
    return(
        <div className="homeContent-area ">
            <div className="grid gap-x-6 gap-y-4 grid-cols-3 text-center overflow-auto text-slate-100">
                <div className="function-blog">
                    <h2>ตัวช่วยในการจัดสรรงบประมาณ</h2>
                </div>

                <div className="function-blog">
                    <h2>คำนวณรายรับ-รายจ่าย</h2>
                </div>

                <div className="function-blog">
                    <h2>คำนวณการออมเงินรายเดือน</h2>
                </div>

            </div>    
        </div>
    )
}

export default HomeContent;