import React from "react";

const ProductList = ({ products, user, handleFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const isFavorited = user?.favorites?.includes(product._id);

        return (
          <div
            key={product._id}
            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 bg-white flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                ${product.price}
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-bold text-lg mb-1 line-clamp-1">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

              {user && (
                <button
                  onClick={() => handleFavorite(product._id)}
                  className={`mt-auto text-white py-2 rounded transition-colors duration-300 ${
                    isFavorited
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isFavorited ? "Unfavorite" : "Favorite"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;