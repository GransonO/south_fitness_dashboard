import React from "react"
import { Redirect } from "react-router-dom"

// Pages Component
import Chat from "../pages/Chat/Chat"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

// User profile
import UserProfile from "../pages/Authentication/UserProfile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Institute from "../pages/Dashboard-institute/admin_institute";
import Admin from "../pages/Dashboard/admin_main"

import Trainer from "../pages/dashboard-trainer/admin_trainer";
import UploadVideos from "../pages/dashboard-trainer/UplodVideos";
import NewBlog from "../pages/dashboard-trainer/NewBlog";
import TrainerChat from "../pages/dashboard-trainer/TrainerChat";
import VideoCallDisplay from "../pages/dashboard-trainer/VideoCallDisplay";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/admin", component: Admin },
  { path: "/institute", component: Institute },
  { path: "/trainer", component: Trainer },
  //chat
  { path: "/chat", component: Chat },
  { path: "/trainer_chat", component: TrainerChat },
  //profile
  { path: "/profile", component: UserProfile },
  { path: "/video-upload", component: UploadVideos },
  { path: "/video-call", component: VideoCallDisplay },



  //calendar
  { path: "/calendar", component: Calendar },
  { path: "/new-blog", component: NewBlog },


  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { authProtectedRoutes, publicRoutes }
