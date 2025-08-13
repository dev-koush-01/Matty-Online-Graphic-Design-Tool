import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Front_page from './Component/Before_login/front_page.jsx'
import About from './Component/About/About.jsx'
import Home from './Component/Home/Home.jsx'
import Contact from './Component/Contact/Contact.jsx'

import Profile from './Component/Profile/Profile.jsx'
import Administration from './Component/Administration/Administration.jsx'
import Finance from './Component/Finance/Finance.jsx'
import Feature from './Component/Feature/Feature.jsx'
import Setting from './Component/Setting/Setting.jsx'
import Chatbot from './Component/Chatbot/Chatbot.jsx'
import Canvas from './Component/Canvas/Canvas.jsx'
import Signup from './Component/Signup/Signup.jsx'
import Login from './Component/Login/Login.jsx'
import FeedbackForm from './Component/Feedback/Feedback.jsx'
import F_chat from './Component/Floating_chatbot/F_chat.jsx'






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      { path:"",
        element: <Front_page/>
       
      },
      {
            path: "/signup", 
            element: <Signup />,
          },
      {path:"/about",
        element: <About/>,
      },
      {path:"/home",
        element: <Front_page/>,
      },
      {path:"/contact",
        element: <Contact/>,
      },

     {path:"/profile",
        element: <Profile/>,
      },
     {path:"/administration",
        element: <Administration/>,
      },
     {path:"/finance",
        element: <Finance/>,
      },
      {path:"/feature",
        element: <Feature/>,
      },
      {path:"/setting",
        element: <Setting/>,
      },
      {path:"/chatbot",
        element: <Chatbot/>,
      },
      {path:"/canvas",
        element: <Canvas/>,
      },
       {path:"/login",
        element: <Login/>,
      },
     {
      path: "/feedback",
      element: <FeedbackForm />,
    },
    
     

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    {/* <App /> */}
    <F_chat/>

    <RouterProvider  router={router} />
    </>

  </StrictMode>,
)
