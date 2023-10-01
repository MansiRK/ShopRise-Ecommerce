import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import useCategory from "../custom/useCategoryHook";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout>
      <div className="container">
        <div className="categories">
          {categories?.map((cat) => (
            <Link
              to={`/category/${cat.category_slug}`}
              key={cat.category_id}
              className="badge rounded-pill text-bg-dark"
            >
              {cat.category_name}
            </Link>
          ))}
          {/* <span class="badge rounded-pill text-bg-success">Success</span>
          <span class="badge rounded-pill text-bg-danger">Danger</span>
          <span class="badge rounded-pill text-bg-warning">Warning</span>
          <span class="badge rounded-pill text-bg-info">Info</span>
          <span class="badge rounded-pill text-bg-light">Light</span>
          <span class="badge rounded-pill text-bg-dark">Dark</span> */}
        </div>
        {/* <div className="row">
          {categories.map((category) => (
            <div className="col-md-4">
              <div className="card">
                <Link to={`/category/${category.slug}`}>{category.name}</Link>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default Categories;
