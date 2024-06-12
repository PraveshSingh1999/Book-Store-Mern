import { BsArrowLeft } from "react-icons/bs";
import {Link} from "react-router-dom"

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-indigo-400 text-white px-4 py-1 rounded w-fit shadow"
      >
        <BsArrowLeft className="text-2xl"/>
      </Link>
    </div>
  );
};

export default BackButton;
