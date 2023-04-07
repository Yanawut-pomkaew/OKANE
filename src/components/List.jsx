import './Style.css'

function List() {
    return(
        <div>
            <div className="w-full min-h-screen dark:bg-slate-800">
                <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
                    <h1 className="text-2xl font-bold pl-8">OKANE</h1>
                </div>

                <div className="blog">
                    <div className="tap">
                        <a href="#" >ข้อมูลการออมเงิน</a>
                        <a href="#" >รายการออมเงิน</a>
                    </div>

                    <div className="content-List">
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default List;