import Image from "next/image";
import Navbar from "./components/navbar";
import Base from "./components/home";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="bg-white h-screen ">
      <Navbar/>
      <Base/>
      <Footer/>
    </div>
  );
}
