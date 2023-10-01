// // import React, { useEffect, useState } from "react";
// // import Layout from "../../components/Layout";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { Select } from "antd";
// // import AdminMenu from "./AdminMenu";
// // import { useNavigate, useParams } from "react-router-dom";
// // const { Option } = Select;

// // const UpdateProduct = () => {
// //   const [categories, setCategories] = useState([]);
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [quantity, setQuantity] = useState("");
// //   const [shipping, setShipping] = useState("");
// //   const [image, setImage] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [id, setId] = useState("");
// //   const params = useParams();

// //   const navigate = useNavigate();

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const productData = new FormData();
// //       productData.append("product_name", name);
// //       productData.append("product_description", description);
// //       productData.append("product_price", price);
// //       productData.append("product_quantity", quantity);
// //       productData.append("product_shipping", shipping);
// //       image && productData.append("product_image", image);
// //       productData.append("categoryId", category);

// //       //   const product_id = p
// //       const res = await axios.patch(`/product/${id}`, productData);

// //       if (res.status === 200) {
// //         console.log(id);

// //         toast.error(res.data?.message);
// //       } else {
// //         console.log("id", id);

// //         toast.success(`${name} product updated successfully`);
// //         navigate("/admin/products");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Something went wrong in updating product");
// //     }
// //   };

// //   const getSingleProduct = async () => {
// //     try {
// //       const res = await axios.get(`/product/${params.slug}`);
// //       setName(res.data.product.product_name);
// //       setDescription(res.data.product.product_description);
// //       setPrice(res.data.product.product_price);
// //       setQuantity(res.data.product.product_quantity);
// //       setShipping(res.data.product.product_shipping);
// //       setImage(res.data.product.product_image);
// //       setCategory(res.data.product.categoryId);
// //       setId(res.data.product.product_id);
// //       console.log("id1", res.data.product.product_id);

// //       console.log("id", id);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getSingleProduct();
// //     //eslint-disable-next-line
// //   }, [id]);

// //   const getAllCategories = async () => {
// //     try {
// //       const res = await axios.get(`/categories`);
// //       //   console.log("API Response:", res.data);
// //       //   console.log(categories.length);
// //       //   console.log(res.data.category);

// //       //   console.log(categories);

// //       if (res.status === 200) {
// //         setCategories(res.data?.category);
// //         // console.log(res.data.categories.category_name);
// //         // toast.success("Categories fetched successfully");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Something went wrong in fetching categories");
// //     }
// //   };

// //   const handleClearImage = () => {
// //     setImage(null); // Clear the selected image
// //   };

// //   useEffect(() => {
// //     getAllCategories();
// //   }, []);

// //   return (
// //     <Layout>
// //       <div className="container-fluid">
// //         <div className="row">
// //           <div className="col-md-3">
// //             <AdminMenu />
// //           </div>
// //           <div className="col-md-9">
// //             <h2>Update Product</h2>
// //             <div className="m-3">
// //               <Select
// //                 bordered={false}
// //                 placeholder="Select a category"
// //                 size="large"
// //                 showSearch
// //                 className=" mb-5 w-100 border"
// //                 onChange={(value) => {
// //                   //   console.log("Selected Category Value:", value);
// //                   setCategory(value);
// //                 }}
// //                 value={category}
// //               >
// //                 {categories?.map((cat) => (
// //                   <Option key={cat.category_id} value={cat.category_id}>
// //                     {cat.category_name}
// //                   </Option>
// //                 ))}
// //               </Select>

// //               <div className="mb-4">
// //                 <label className="btn btn-dark">
// //                   {image ? image.name : "Upload Image"}
// //                   <input
// //                     type="file"
// //                     name="image"
// //                     hidden
// //                     accept="image/*"
// //                     onChange={(e) => setImage(e.target.files[0])}
// //                   />
// //                 </label>
// //               </div>
// //               <div className="mb-4">
// //                 {image ? (
// //                   <div className="text-center">
// //                     <button
// //                       type="button"
// //                       className="btn-close top-0 end-0"
// //                       aria-label="Close"
// //                       onClick={handleClearImage}
// //                     ></button>
// //                     <img
// //                       src={URL.createObjectURL(image)}
// //                       alt="product"
// //                       height={"200px"}
// //                       className="img img-responsive"
// //                     />
// //                   </div>
// //                 ) : (
// //                   <div className="text-center">
// //                     <button
// //                       type="button"
// //                       className="btn-close top-0 end-0"
// //                       aria-label="Close"
// //                       onClick={handleClearImage}
// //                     ></button>
// //                     <img
// //                       src={`/product-image/${id}`}
// //                       alt="product"
// //                       height={"200px"}
// //                       className="img img-responsive"
// //                     />
// //                   </div>
// //                 )}
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="name" className="form-label">
// //                   Enter product name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={name}
// //                   className="form-control"
// //                   placeholder="Eg. Television"
// //                   onChange={(e) => setName(e.target.value)}
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="description" className="form-label">
// //                   Enter product description
// //                 </label>
// //                 <textarea
// //                   value={description}
// //                   className="form-control"
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   placeholder="Eg. New television in market under 20K"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="price" className="form-label">
// //                   Enter product price
// //                 </label>
// //                 <input
// //                   type="number"
// //                   value={price}
// //                   className="form-control"
// //                   onChange={(e) => setPrice(e.target.value)}
// //                   placeholder="Eg. 20,000"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <label htmlFor="quantity" className="form-label">
// //                   Enter product quantity
// //                 </label>
// //                 <input
// //                   type="number"
// //                   value={quantity}
// //                   className="form-control"
// //                   onChange={(e) => setQuantity(e.target.value)}
// //                   placeholder="Eg. 5"
// //                 />
// //               </div>
// //               <div className="mb-4">
// //                 <Select
// //                   bordered={false}
// //                   placeholder="Select Shipping "
// //                   size="large"
// //                   showSearch
// //                   className=" mb-5 w-100 border"
// //                   onChange={(value) => {
// //                     setShipping(value);
// //                   }}
// //                   value={shipping ? "Shipped" : "Not Shipped"}
// //                 >
// //                   <Option value="1">Shipped</Option>
// //                   <Option value="0">Not Shipped</Option>
// //                 </Select>
// //               </div>

// //               {/* {shipping !== null && (
// //                 <div className="mb-4">
// //                   <p>
// //                     Previous Shipping Status:
// //                     {shipping ? "Shipped" : "Not Shipped"}
// //                   </p>
// //                 </div>
// //               )} */}
// //               <div className="mb-4">
// //                 <button className="btn btn-dark" onClick={handleUpdate}>
// //                   UPDATE Product
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </Layout>
// //   );
// // };

// // export default UpdateProduct;

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Select } from "antd";
// import AdminMenu from "./AdminMenu";
// import { useNavigate, useParams } from "react-router-dom";
// const { Option } = Select;

// const UpdateProduct = () => {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("0"); // Initialize as 0 for "Not Shipped"
//   const [image, setImage] = useState(null); // Initialize as null
//   const [category, setCategory] = useState("");
//   const [id, setId] = useState("");
//   //   const [select, setSelect] = useState(null);

//   const params = useParams();

//   const navigate = useNavigate();

//   const getAllCategories = async () => {
//     try {
//       const res = await axios.get(`/categories`);
//       if (res.status === 200) {
//         setCategories(res.data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in fetching categories");
//     }
//   };

//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   const handleClearImage = () => {
//     setImage(null); // Clear the selected image
//   };

//   //   const handleUpdate = async (e) => {
//   //     e.preventDefault();
//   //     try {
//   //       const res = await axios.patch(`/category/${select.category_id}`, {
//   //         category_name: updateName,
//   //       });

//   //       if (res.status === 200) {
//   //         setSelect(null);
//   //         setUpdateName("");
//   //         setIsModalOpen(false);
//   //         getAllCategories();
//   //         toast.success(`${updateName} category updated successfully`);
//   //       } else {
//   //         toast.error(res.data.message);
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //       toast.error("Something went wrong while updating category");
//   //     }
//   //   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const productData = {
//         product_id: id,
//         product_name: name,
//         product_description: description,
//         product_price: price,
//         product_quantity: quantity,
//         product_shipping: shipping === "1", // Convert "1" to true, "0" to false
//         categoryId: category,
//         product_image: image,
//       };
//       // productData.append("product_id", id);
//       // productData.append("product_name", name);
//       // productData.append("product_description", description);
//       // productData.append("product_price", price);
//       // productData.append("product_quantity", quantity);
//       // productData.append("product_shipping", shipping);
//       // if (image) {
//       //   productData.append("product_image", image, image.name);
//       // }
//       // // image && productData.append("product_image", image);
//       // productData.append("categoryId", category);

//       // console.log("FormData: ", productData);

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data", // Set the content type to FormData
//         },
//       };

//       const res = await axios.patch(`/product/${id}`, productData, config);
//       console.log(res.data.product.product_id);

//       console.log(name);
//       console.log(description);

//       if (res.status === 200) {
//         toast.success(`${name} product updated successfully`);
//         navigate("/admin/products");
//       } else {
//         toast.error(res.data?.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong in updating product");
//     }
//   };

//   useEffect(() => {
//     const getSingleProduct = async () => {
//       try {
//         const res = await axios.get(`/product/${params.slug}`);
//         const productData = res.data.product;
//         setName(productData.product_name);
//         setDescription(productData.product_description);
//         setPrice(productData.product_price);
//         setQuantity(productData.product_quantity);
//         setShipping(productData.product_shipping ? 1 : 0);
//         setCategory(productData.categoryId);
//         setId(productData.product_id);

//         // console.log("Name", name);
//         // console.log("Id", id);
//         // console.log(res.data.product.product_id);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getSingleProduct();
//   }, [params.slug]);

//   return (
//     <Layout>
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h2>Update Product</h2>
//             <div className="m-3">
//               <Select
//                 bordered={false}
//                 placeholder="Select a category"
//                 size="large"
//                 showSearch
//                 className=" mb-5 w-100 border"
//                 onChange={(value) => {
//                   setCategory(value);
//                 }}
//                 value={category}
//               >
//                 {categories?.map((cat) => (
//                   <Option key={cat.category_id} value={cat.category_id}>
//                     {cat.category_name}
//                   </Option>
//                 ))}
//               </Select>

//               <div className="mb-4">
//                 <label className="btn btn-dark">
//                   {image ? image.name : "Upload Image"}
//                   <input
//                     type="file"
//                     name="image"
//                     hidden
//                     accept="image/*"
//                     onChange={(e) => setImage(e.target.files[0])}
//                   />
//                 </label>
//               </div>
//               <div className="mb-4">
//                 {image ? (
//                   <div className="text-center">
//                     <button
//                       type="button"
//                       className="btn-close top-0 end-0"
//                       aria-label="Close"
//                       onClick={handleClearImage}
//                     ></button>
//                     <img
//                       src={URL.createObjectURL(image)}
//                       alt="product"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 ) : (
//                   <div className="text-center">
//                     <button
//                       type="button"
//                       className="btn-close top-0 end-0"
//                       aria-label="Close"
//                       onClick={handleClearImage}
//                     ></button>
//                     <img
//                       src={`/product-image/${id}`}
//                       alt="product"
//                       height={"200px"}
//                       className="img img-responsive"
//                     />
//                   </div>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="name" className="form-label">
//                   Enter product name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   className="form-control"
//                   placeholder="Eg. Television"
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="description" className="form-label">
//                   Enter product description
//                 </label>
//                 <textarea
//                   value={description}
//                   className="form-control"
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Eg. New television in market under 20K"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="price" className="form-label">
//                   Enter product price
//                 </label>
//                 <input
//                   type="number"
//                   value={price}
//                   className="form-control"
//                   onChange={(e) => setPrice(e.target.value)}
//                   placeholder="Eg. 20,000"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="quantity" className="form-label">
//                   Enter product quantity
//                 </label>
//                 <input
//                   type="number"
//                   value={quantity}
//                   className="form-control"
//                   onChange={(e) => setQuantity(e.target.value)}
//                   placeholder="Eg. 5"
//                 />
//               </div>
//               <div className="mb-4">
//                 <Select
//                   bordered={false}
//                   placeholder="Select Shipping "
//                   size="large"
//                   showSearch
//                   className=" mb-5 w-100 border"
//                   onChange={(value) => {
//                     setShipping(value);
//                   }}
//                   value={shipping ? "Shipped" : "Not Shipped"}
//                 >
//                   <Option value="1">Shipped</Option>
//                   <Option value="0">Not Shipped</Option>
//                 </Select>
//               </div>
//               <div className="mb-4">
//                 <button className="btn btn-dark" onClick={handleUpdate}>
//                   UPDATE Product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        if (response.status === 200) {
          setCategories(response.data.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch the product data to be updated when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${params.slug}`);
        if (response.status === 200) {
          const product = response.data.product;
          setName(product.product_name);
          setDescription(product.product_description);
          setPrice(product.product_price);
          setQuantity(product.product_quantity);
          setShipping(product.product_shipping ? "1" : "0");
          setCategory(product.categoryId);
          setId(product.product_id);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.slug]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        product_name: name,
        product_description: description,
        product_price: price,
        product_quantity: quantity,
        product_shipping: shipping === "1" ? true : false,
        categoryId: category,
        // product_image: image,
      };

      const response = await axios.patch(`/product/${id}`, updatedProduct);
      console.log(updatedProduct);

      if (response.status === 200) {
        toast.success(`${name} product updated successfully`);
        navigate("/admin/products");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong in updating product");
    }
  };

  // Handle clearing the image input
  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <div className="m-3">
              {/* Form elements go here */}
              <form onSubmit={handleUpdate}>
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className=" mb-5 w-100 border"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((cat) => (
                    <Option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </Option>
                  ))}
                </Select>

                <div className="mb-4">
                  <h3>Product Image</h3>
                  {/* <label className="btn btn-dark">
                    {image ? image.name : "Upload Image"}
                    <input
                      type="file"
                      name="image"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label> */}
                </div>
                <div className="mb-4">
                  {image ? (
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn-close top-0 end-0"
                        aria-label="Close"
                        onClick={handleClearImage}
                      ></button>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="product"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      {/* <button
                        type="button"
                        className="btn-close top-0 end-0"
                        aria-label="Close"
                        onClick={handleClearImage}
                      ></button> */}
                      <img
                        src={`/product-image/${id}`}
                        alt="product"
                        height={"200px"}
                        className="img img-responsive"
                      />
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
                    placeholder="Select Shipping "
                    size="large"
                    showSearch
                    className=" mb-5 w-100 border"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping}
                  >
                    <Option value="1">Shipped</Option>
                    <Option value="0">Not Shipped</Option>
                  </Select>
                </div>
                <div className="mb-4">
                  <button className="btn btn-dark" type="submit">
                    UPDATE Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
