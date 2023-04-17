import { Link } from "react-router-dom";

function Header() {
    return(
     <div className="w-screen bg-blue-400 p-6 text-slate-50 subpixel-antialiased flex">
        <Link to={'/'}>
            <h1 className="text-2xl font-bold pl-8">OKANE</h1>
        </Link>
        <Link className="ml-auto pr-4 border-2 border-white-500 pl-4 rounded mr-8 cursor-pointer" to={`/login`}>
            <p >เข้าสู่ระบบ</p>
        </Link>
     </div>
     
    )
}

export default Header;