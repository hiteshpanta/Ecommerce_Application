import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./features/home/Home"
import RootLayout from "./components/RootLayout"
import Login from "./features/authentication/Login"
import Register from "./features/authentication/Register"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: < Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Register />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
