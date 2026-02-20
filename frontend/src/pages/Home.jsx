import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList.jsx";

const Home = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/get-products?search=${search}&page=${page}&limit=8`,
        { withCredentials: true }
      );

      setProducts(data.data.products);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      console.error(err);
      setProducts([]); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleFavorite = async (productId) => {
    if (!user) {
      alert("Login to add favorites");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/v1/products/${productId}/favorite`,
        {},
        { withCredentials: true }
      );
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  console.log("products",products);
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl text-center font-bold mb-6">
        Welcome to Micro Marketplace
      </h1>

      <div className="flex justify-center mb-6">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {products.length > 0 ? (
        <ProductList
          products={products}
          user={user}
          handleFavorite={handleFavorite}
        />
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No items found
        </p>
      )}

      {products.length > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded">{page}</span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
