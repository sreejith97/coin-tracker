import CardAndTable from "@/components/CardAndTable";
import CoinsUsed from "@/components/CoinsUsed";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Image from "next/image";

export default function Home() {
  // console.log("helloooo");

  // console.log("hello", process.env);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-[20px] lg:p-[40px] overflow-x-clip">
      <HeroSection />

      <HowItWorks />
      <CoinsUsed />
      <CardAndTable />
    </main>
  );
}
