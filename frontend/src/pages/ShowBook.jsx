import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => { 
    setLoading(false);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 ">show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-indigo-400 rounded-lg w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Id</span>
            <span className="font-normal">{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Title</span>
            <span className="font-normal">{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Author</span>
            <span className="font-normal">{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Publish Year</span>
            <span  className="font-normal">{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Create Time</span>
            <span  className="font-normal">{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 font-medium">Last Update Time</span>
            <span  className="font-normal">{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
