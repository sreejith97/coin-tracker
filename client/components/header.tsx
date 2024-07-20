import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#D9D9D9] h-[40px] lg:h-[70px] rounded-[75px] flex flex-row justify-between items-center text-[#000] my-3">
      <div className="flex flex-row justify-between items-center gap-4">
        <p className="w-[103px] text-center font-semibold hidden lg:block">
          Home
        </p>
        <p className="w-[103px] text-center font-semibold hidden lg:block">
          Live Data
        </p>
      </div>
      <div>
        <p>MarketWatch</p>
      </div>
      <div className="flex flex-row justify-between items-center gap-4">
        <p className="w-[103px] text-center font-semibold hidden lg:block">
          About
        </p>
        <p className="w-[103px] text-center font-semibold hidden lg:block">
          Contact
        </p>
      </div>
    </header>
  );
}
