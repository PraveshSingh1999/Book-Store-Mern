import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import Spinner from "../components/Spinner";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-indigo-400 hover:bg-indigo-600 px-6 py-1 rounded-md text-white"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-indigo-400 hover:bg-indigo-600 px-6 py-1 rounded-md text-white"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-5xl my-8 font-normal text-yellow-700">
          Books List
        </h1>
        <Link to="/books/create">
          <IoMdAddCircleOutline className="text-indigo-700 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === "table" ? (<BooksTable books={books} />) : (<BooksCard books={books}/>)}
    </div>
  );
};

export default Home;
