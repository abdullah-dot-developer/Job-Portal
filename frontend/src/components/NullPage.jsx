import React from "react";
import { Link } from "react-router-dom";

const NullPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NullPage;
