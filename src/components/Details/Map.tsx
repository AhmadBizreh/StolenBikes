import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
const Map = (props: any) => {
  return (
    <MapContainer
      center={props.center}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: "80vh", width: "100%", zIndex: 0, borderRadius: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circle
        center={props.center}
        radius={50}
        color="red"
        fillColor="red"
        stroke={false}
        fillOpacity={0.4}
      >
        <Popup>
          <span>Theft area</span>
        </Popup>
      </Circle>
    </MapContainer>
  );
};

export default Map;
