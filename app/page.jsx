import Hero from "@/components/Hero"; 
import InfoBox from "@/components/InfoBox";
import HomeProperties from "@/components/HomeProperties";
import connectDB from "@/config/db";

export default async function HomePage(){
      await connectDB();
     return (
        <>
            <Hero />
            <InfoBox />
            <HomeProperties />
        </>
     )
}