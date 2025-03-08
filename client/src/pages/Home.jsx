import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import HeroSection from "../components/Hero";
import Features from "../components/Features";
import Reviews from "../components/review";
const Home = () => {
  return (
    <>
    <Nav />
    <HeroSection />
    <Features/>
    <Reviews/>
    
   
    </>
  );
};

export default Home;
