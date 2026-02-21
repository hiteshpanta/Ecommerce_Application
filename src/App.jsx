import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./features/home/Home"
import RootLayout from "./components/RootLayout"
import Login from "./features/authentication/Login"
import Register from "./features/authentication/Register"
import AdminPanel from "./features/admin/AdminPanel"
import ProductAddForm from "./features/admin/ProductAddForm"
import ProductEdit from "./features/admin/ProductEdit"
import ProductDetail from "./features/products/ProductDetail"
import CheckOut from "./features/carts/CheckOut"


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
        },
        {
          path: 'admin-panel',
          element: <AdminPanel />
        },
        {
          path: 'products/:id',
          element: <ProductDetail />
        },
        {
          path: 'product-add',
          element: <ProductAddForm />
        },
        {
          path: 'product-edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'checkout',
          element: <CheckOut />
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
