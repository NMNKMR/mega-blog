import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = ()=> {
        authService.logout().then(()=> {
            dispatch(logout());
            navigate('/login');
        })
    }
  return (
    <button
    className="inline-bock px-6 py-2 duration-200 text-[#EEF5DB] hover:text-black"
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn