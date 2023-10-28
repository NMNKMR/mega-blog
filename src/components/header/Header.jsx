import {Logo, LogoutBtn, Container} from "../c.index";
import {Link, NavLink} from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state)=> state.auth.userStatus);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/register",
      active: !authStatus,
  },
  {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-3 w-full shadow fixed z-10 bg-[#4F6367]'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='50px'   />
            </Link>
          </div>
          <ul className='flex ml-auto items-center font-semibold'>
            {navItems.map((item)=> (
              item.active && 
              <li key={item.name}>
                <NavLink
                to={item.slug}
                className={({isActive})=> 
                `inline-bock px-6 py-2 duration-200
                 ${isActive ? "bg-blue-100 text-black rounded-full" : "text-[#EEF5DB] hover:text-black"}  `}
                >{item.name}</NavLink>
              </li>
            ))}
            {authStatus && (
              <li><LogoutBtn/></li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header