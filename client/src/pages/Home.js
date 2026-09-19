import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";
import Banner from "../components/Home/Banner";
import Products from "../components/Home/Products";

const Home = () => {
 

  return (
    <Layout>
     <Banner/>
     <Products/>
    </Layout>
  );
};

export default Home;
