import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="max-w-[1700px] flex items-center justify-center flex-col lg:gap-y-[40px] gap-y-[20px] ">
      <h1 className="text-[35px] md:text-[48px] lg:text-[56px] w-[100%]  lg:w-[800px] bungee-regular uppercase text-center font-bold">
        Track real-time stock and crypto data.
      </h1>
      <p className="inter text-[22px] text-center text-[#D4D4D8]">
        Get the latest market updates, instantly and dynamically displayed.
      </p>
      <button className="lg:w-[130px] lg:h-[64px] w-[130px] h-[45px]  bg-[#A855F7] rounded">
        Start Now
      </button>
    </section>
  );
}
