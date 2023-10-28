import { useEffect, useState } from "react"
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import{login, logout} from "./store/authSlice";
import {storeAllPosts} from "./store/postsSlice";
import dbService from "./appwrite/database";
import {Header, Footer, Loader} from "./components/c.index";
import {Outlet} from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=> {
    Promise.all([authService.getCurrentUser(), dbService.getAllPost()])
    .then(([userData, posts])=> {
      if(userData) dispatch(login({userData}));
      else dispatch(logout());

      if(posts) dispatch(storeAllPosts(posts.documents));
    })
    .finally(()=> setLoading(false));
  }, [])
  
  return (
    !loading ? 
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full h-screen flex flex-col justify-between">
        <Header/>
        <main className="pt-16">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div> : <div className="h-screen w-full flex justify-center items-center"><Loader/></div>
  )
}

export default App
