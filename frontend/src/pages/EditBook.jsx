import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack"

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState(2000);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((response) => {
        console.log(response);
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setPublishYear(response.data.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        alert("An error occured, check your console");
        console.log(error)
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:8000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book Edited successfully!", {variant: "success"})
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened, Please check console");
        enqueueSnackbar("Error", {variant: "error"})
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-indigo-500 rounded-xl w-[600px] p-4 mx-auto shadow">
        <div className="my-4 ">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="my-4 ">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="my-4 ">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
          />
        </div>
        <button
          className="p-2 bg-yellow-300 my-8 rounded-md active:scale-95"
          onClick={handleEditBook}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBook;
