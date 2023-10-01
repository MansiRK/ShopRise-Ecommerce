import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="container-fluid menu">
      <h2>Admin menu</h2>
      <nav class="nav flex-column options">
        <Link class="nav-link" aria-current="page" to={`/admin/products`}>
          Products
        </Link>
        <Link
          class="nav-link "
          aria-current="page"
          to={`/admin/create-product`}
        >
          Create Products
        </Link>
        <Link class="nav-link" to={`/admin/create-category`}>
          Create Category
        </Link>
        <Link class="nav-link" to={`/admin/orders`}>
          Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminMenu;
