import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import moment from "moment";
import EmptyImage from "../assets/EmptyImage.svg";
const HomeCard = (props: any) => {
  return (
    <Card className="p-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <a
          className="font-bold text-large hover:underline hover:cursor-pointer line-clamp-1"
          href={`/Case/${props.data.id}`}
        >
          {props.data.title}
        </a>
        <small className="text-small text-default-500 line-clamp-2 h-10">
          {props.data.description}
        </small>
      </CardHeader>
      <CardBody>
        <img
          alt="Bike Image"
          className={`object-cover rounded-xl flex justify-center max-w-[350] max-h-[200px] ${!props.data.large_img && "bg-[#F7F7F7]"
            } `}
          onError={({ currentTarget }) => {
            currentTarget.src = `${EmptyImage}`;
          }}
          src={props.data.large_img ? props.data.large_img : EmptyImage}
        />
      </CardBody>
      <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="font-semibold text-default-500 text-small">

          <Chip color={props.data.status === "stolen" ? "danger" : "success"} size="sm" className="!text-white">
            {props.data.status === "stolen" ? "Stolen" : "Found"}
          </Chip>

        </div>
        <div className="flex justify-end text-sm">
          <span className="font-semibold">Theft date:&nbsp;</span>
          <span className="text-[#7849C3]">{moment(new Date(props.data.date_stolen * 1000)).format("DD-MM-YYYY")}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HomeCard;
