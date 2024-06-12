import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack"

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar()

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book Deleted successfully!", {variant: "success"})
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please Check console");
        enqueueSnackbar("Error", {variant: "error"})
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-4xl my-4 ">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-red-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this Book?</h3>

        <button
          className="bg-red-600 p-4 text-white m-8 w-full text-2xl font-light rounded-md uppercase hover:bg-red-500 shadow"
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
