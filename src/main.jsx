import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Clubs from './pages/Clubs.jsx';
import ClubProfile from './pages/ClubProfile.jsx';
import PostDetails from './pages/PostDetails.jsx';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx'
import Login from './pages/Login.jsx';
import Moderation from './pages/Moderation.jsx';
import Register from './pages/Register.jsx';
import MyProfile from './pages/MyProfile.jsx';
import RoleProtectedRoute from './context/RoleProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App wraps all pages
    children: [
      { path: '/', element: <Home /> },
      { path: '/clubs', element: <Clubs /> },
      { path: '/clubs/:clubId', element: <ClubProfile /> },
      { path: '/posts/:postId', element: <PostDetails /> },
      {
        path: '/create',
        element: (
          <RoleProtectedRoute allowedRoles={['club-owner']}>
            <CreatePost />
          </RoleProtectedRoute>
        )
      },
      {
        path: '/edit',
        element: (
          <RoleProtectedRoute allowedRoles={['club-owner']}>
            <EditPost />
          </RoleProtectedRoute>
        )
      },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/moderation',
        element: (
          <RoleProtectedRoute allowedRoles={['moderator']}>
            <Moderation />
          </RoleProtectedRoute>
        )
      },
      {
        path: '/account',
        element: (
          <RoleProtectedRoute allowedRoles={['club-owner', 'moderator']}>
            <MyProfile />
          </RoleProtectedRoute>
        )
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
