import { BikeLogo } from "../components/BikeLogo";
const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <div className="animate-pulse z-50">
        <BikeLogo fill={'#000'} />
      </div>
    </div>
  );
};

export default Loader;
