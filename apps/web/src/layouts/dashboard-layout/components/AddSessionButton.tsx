import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const AddSessionButton = () => (
  <Link
    to="/auth"
    className="h-12 flex items-center justify-center cursor-pointer bg-white bg-opacity-10 w-full rounded-full hover:bg-opacity-30 transition-colors"
  >
    <IoMdAdd size={24} />
  </Link>
);

export default AddSessionButton;
