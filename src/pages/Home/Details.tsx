import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import moment from "moment";
import { BsCalendar2Date, BsGearWideConnected } from "react-icons/bs";
import { CiBarcode } from "react-icons/ci";
import { HiColorSwatch } from "react-icons/hi";
import { IoIosResize } from "react-icons/io";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { VscVersions } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { GetById } from "../../Hooks/useBikes";
import EmptyCase from "../../components/Details/EmptyCase";
import Map from "../../components/Details/Map";
import DetailsStats from "../../components/Details/Stats";
import Loader from "../../components/Loader";
import EmptyImage from "../../assets/EmptyImage.svg";

const Details = () => {
  document.title = "Bike details";
  const { id } = useParams();
  const Bike = GetById(parseInt(id!));
  if (Bike.isFetching) return <Loader />;

  const renderValue = (value: any) => (value ? value : "-");

  return (
    <>
      {Bike.status === "error" && <EmptyCase />}
      {Bike.status === "success" && (
        <>
          <Card className="p-4 my-4 w-full mx-auto">
            <div className="flex flex-col sm:flex-col md:flex-col xl:flex-row justify-between">
              <div className="flex-1 w-full pb-5">
                <div className="text-2xl uppercase font-bold mb-10">
                  <Chip color={Bike.data.status === "stolen" ? "danger" : "success"} size="sm" className="!text-white">
                    {Bike.data.status === "stolen" ? "Stolen" : "Found"}
                  </Chip>
                </div>
                <p className="text-lg uppercase font-bold mb-2">{renderValue(Bike.data.title)}</p>
                <small className="text-default-500 text-base">
                  <span className="font-bold">{renderValue(Bike.data.status)}&nbsp;</span>
                  {Bike.data.date_stolen ? moment(new Date(Bike.data.date_stolen * 1000)).format("hh:mm A") : "-"}
                  <span className="font-bold">&nbsp;&nbsp;from:&nbsp;</span>
                  {renderValue(Bike.data.stolen_location)}
                </small>
                <Divider className="my-4 max-w-screen-sm" />
                <p className="text-base uppercase font-bold">Description</p>
                <small className="text-default-500 text-md">{renderValue(Bike.data.description)}</small>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5 py-2">
                  {[
                    { icon: <CiBarcode className="w-6 h-6" />, value: Bike.data.serial, label: "Serial" },
                    { icon: <VscVersions className="w-6 h-6" />, value: Bike.data.frame_model, label: "Model" },
                    { icon: <MdOutlinePrecisionManufacturing className="w-6 h-6" />, value: Bike.data.manufacturer_name, label: "Manufacturer" },
                    { icon: <BsCalendar2Date className="w-6 h-6" />, value: Bike.data.year, label: "Year" },
                    { icon: <IoIosResize className="w-6 h-6" />, value: Bike.data.frame_size, label: "Frame size" },
                    { icon: <BsGearWideConnected className="w-6 h-6" />, value: Bike.data.frame_material_slug, label: "Frame material" },
                    { icon: <HiColorSwatch className="w-6 h-6" />, value: Bike.data.frame_colors ? Bike.data.frame_colors.join(", ") : "-", label: "Primary colors" },
                  ].map((stat, index) => (
                    <DetailsStats
                      key={index}
                      icon={stat.icon}
                      value={<span className="max-w-[100px] overflow-hidden text-ellipsis hover:max-w-full hover:whitespace-normal">{renderValue(stat.value)}</span>}
                      label={stat.label}
                    />
                  ))}
                </div>
              </div>

              <div className="sm:w-full md:w-full xl:w-1/2 flex justify-center">
                <img
                  alt="Card background"
                  className="object-cover max-h-[500px] rounded-xl bg-[#F8F8F8]"
                  src={Bike.data.large_img || EmptyImage}
                />
              </div>
            </div>

            <Divider className="my-4" />
            <p className="text-base uppercase font-bold mb-4">Location</p>
            {Bike?.data?.stolen_coordinates ? (
              <Map center={Bike.data.stolen_coordinates} />
            ) : (
              "Not located on map."
            )}
          </Card>
        </>
      )}
    </>
  );
};

export default Details;