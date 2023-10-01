import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import UserDashboard from "./pages/user/UserDashboard";
import ProductsCategory from "./pages/ProductsCategory";
import PrivateUser from "./routes/PrivateUser";
import PrivateAdmin from "./routes/PrivateAdmin";
// import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import AllProducts from "./pages/admin/AllProducts";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import UserOrders from "./pages/user/UserOrders";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />}></Route>

        <Route path="/product/:slug" element={<ProductDetails />} />

        <Route path="/user" element={<PrivateUser />}>
          {/* <Route path="dashboard" element={<UserDashboard />} /> */}
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<UserOrders />} />
        </Route>

        <Route path="/admin" element={<PrivateAdmin />}>
          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="update-product/:slug" element={<UpdateProduct />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* <Route path="/categories" element={<Categories />} /> */}
        <Route path="/category/:slug" element={<ProductsCategory />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
