import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import Index from "../pages/Home/Index";
import Details from "../pages/Home/Details";


export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/Case/:id" element={<Details />} />
          <Route path="/*" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
