import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import AdminMenu from "./AdminMenu";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("product_name", name);
      productData.append("product_description", description);
      productData.append("product_price", price);
      productData.append("product_quantity", quantity);
      productData.append("product_shipping", shipping);
      productData.append("product_image", image);
      productData.append("categoryId", category);

      const res = await axios.post(`/product`, productData);

      if (res.status === 200) {
        toast.success(`${name} product created successfully`);
        navigate("/admin/products");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in creating product");
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`/categories`);
      //   console.log("API Response:", res.data);
      //   console.log(categories.length);
      //   console.log(res.data.category);

      //   console.log(categories);

      if (res.status === 200) {
        setCategories(res.data?.category);
        // toast.success("Categories fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  const handleClearImage = () => {
    setImage(null); // Clear the selected image
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Create Product</h2>
            <div className="m-3">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className=" mb-5 w-100 border"
                onChange={(value) => {
                  //   console.log("Selected Category Value:", value);
                  setCategory(value);
                }}
              >
                {categories?.map((cat) => (
                  <Option key={cat.category_id} value={cat.category_id}>
                    {cat.category_name}
                  </Option>
                ))}
              </Select>

              <div className="mb-4">
                <label className="btn btn-dark">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
              <div className="mb-4">
                {image && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn-close top-0 end-0"
                      aria-label="Close"
                      onClick={handleClearImage}
                    ></button>
                    <img src={URL.createObjectURL(image)} alt="product" />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Enter product name
                </label>
                <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Eg. Television"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="form-label">
                  Enter product description
                </label>
                <textarea
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Eg. New television in market under 20K"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="form-label">
                  Enter product price
                </label>
                <input
                  type="number"
                  value={price}
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Eg. 20,000"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="form-label">
                  Enter product quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Eg. 5"
                />
              </div>
              <div className="mb-4">
                <Select
                  bordered={false}
                  placeholder="Select Shipping Status "
                  size="large"
                  showSearch
                  className=" mb-5 w-100 border"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="1">Shipped</Option>
                  <Option value="0">Not Shipped</Option>
                </Select>
              </div>
              <div className="mb-4">
                <button className="btn btn-dark" onClick={handleCreate}>
                  ADD Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
