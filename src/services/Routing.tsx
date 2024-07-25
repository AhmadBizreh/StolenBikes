import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Index from "../pages/Home/Index";
import FilteringResult from "../pages/FilteringResult/FilteringResult";


export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/searchresult" element={<FilteringResult />} />
          <Route path="/" element={<Index />} />
          <Route path="/*" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
