import { Outlet } from "react-router-dom";
import Header from "../component/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* INI YANG NENTUIN HALAMAN MUNCUL */}
    </>
  );
}