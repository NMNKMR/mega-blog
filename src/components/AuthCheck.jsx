import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthCheck({children, authentication = true}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state)=> state.auth.userStatus);

    useEffect(()=> {
        if(authentication && !authStatus) navigate('/login');
        else if(!authentication && authStatus) navigate('/');
        setLoader(false);
    }, [])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default AuthCheck