import React from "react";
import HeroSection from "@/components/heroSection/HeroSection";
import Gallery from "@/components/gallery/Gallery";
import NewsLetter from "@/components/newsLetter/NewsLetter";
import { getFeaturedRoom } from "@/libs/apis";
import FeaturedRoom from "@/components/featuredRoom/FeaturedRoom";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom();
  return (
    <>
      <HeroSection/>
      <FeaturedRoom featuredRoom={featuredRoom}/>
      <Gallery />
      {/* <NewsLetter />  Hírlevél komponens meghívása*/}
    </>
  );
};
export default Home;
