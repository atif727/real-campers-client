import "./banner.css"
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <section className="backgroundFlowers flex justify-center items-center h-[90vh]">
      <div data-aos="zoom-in" className="text-center">
        <div className="md:text-8xl max-sm:text-5xl mb-2 font-bold font-sans text-shadowdoom">
          <h2>REAL CAMPERS</h2>
        </div>
        <p className="md:px-64 text-4xl max-sm:text-xl font-bold">
          Your Checkpoint For Camping
        </p>
        <Button type="primary" size="large" className="mt-5 text-black">
          <NavLink to={"/shop"}>Shop Now</NavLink>
        </Button>
      </div>
    </section>
  );
};

export default Banner;
