import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [select, setSelect] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/category`, {
        category_name: name,
      });

      if (res.status === 200) {
        toast.success(`${name} category created successfully`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/category/${select.category_id}`, {
        category_name: updateName,
      });

      if (res.status === 200) {
        setSelect(null);
        setUpdateName("");
        setIsModalOpen(false);
        getAllCategories();
        toast.success(`${updateName} category updated successfully`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating category");
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await axios.get(`/categories`);
      // console.log("API Response:", data);
      // console.log(categories.length);
      // console.log(data.category);

      // console.log(categories);

      if (res.status === 200) {
        setCategories(res.data?.category);
        toast.success("Categories fetched successfully");
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  const handleDelete = async (category_id) => {
    try {
      const res = await axios.delete(`/category/${category_id}`);

      if (res.status === 200) {
        getAllCategories();
        toast.success(`Category deleted successfully`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting category");
    }
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
            <h2>Create category</h2>
            <div className="p-5">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr key="headings">
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.length === 0 ? (
                    <tr key="no-categories">
                      <td colSpan="2">No categories found</td>
                    </tr>
                  ) : (
                    categories?.map((cat) => (
                      <tr key={cat.category_id}>
                        <td>{cat.category_name}</td>
                        <td>
                          <button
                            className="btn btn-dark"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdateName(cat.category_name);
                              setSelect(cat);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(cat.category_id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              open={isModalOpen}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
