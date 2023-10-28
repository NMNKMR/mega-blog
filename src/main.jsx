import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Login, Register, UserPosts, AddPost, EditPost, Post  } from './pages/p.index.js';
import AuthCheck from './components/AuthCheck.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthCheck authentication={false}>
                    <Login />
                </AuthCheck>
            ),
        },
        {
            path: "/register",
            element: (
                <AuthCheck authentication={false}>
                    <Register />
                </AuthCheck>
            ),
        },
        {
            path: "/my-posts",
            element: (
                <AuthCheck authentication>
                    {" "}
                    <UserPosts />
                </AuthCheck>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthCheck authentication>
                    {" "}
                    <AddPost />
                </AuthCheck>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthCheck authentication>
                    {" "}
                    <EditPost />
                </AuthCheck>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
