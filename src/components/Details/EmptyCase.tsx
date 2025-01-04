import { Button } from "@nextui-org/react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import image from "../../assets/EmptyCase.svg";

const EmptyCase = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[86vh]">
        <img src={image} className="w-[60vh] m-auto" />
        <Button
          className="flex mx-auto mt-5"
          color="primary"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack />
          BACK HOME
        </Button>
      </div>
    </>
  );
};

export default EmptyCase;
