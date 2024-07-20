import Image from "next/image";
import bitcoinImage from "../public/bitcoin.png";
import liteImage from "../public/litecoin.png";
import ethImage from "../public/ethereum.png";

export default function CoinsUsed() {
  return (
    <section className="w-full mb-[50px] lg:mb-[100px] max-w-[1700px]">
      <h1 className="text-[40px] lg:text-[45px] font-bold w-full text-center">
        COINS USED
      </h1>
      <div className="flex md:flex-row flex-col gap-y-5 lg:gap-y-0 justify-between my-10 lg:my-20">
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2  text-[20px] lg:text-[30px] flex flex-col items-center justify-center hover:scale-110">
          <Image
            alt="bitcoin Image"
            src={bitcoinImage}
            width={200}
            height={200}
          ></Image>
          <p className="text-[20px] font-bold uppercase">BitCoin</p>
        </div>
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2  text-[20px] lg:text-[30px] flex flex-col items-center justify-center hover:scale-110">
          <Image
            alt="Eth Image"
            src={ethImage}
            width={200}
            height={200}
          ></Image>
          <p className="text-[20px] font-bold uppercase">ethereum</p>
        </div>
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2  text-[20px] lg:text-[30px] flex flex-col items-center justify-center hover:scale-110">
          <Image
            alt="lite Image"
            src={liteImage}
            width={200}
            height={200}
          ></Image>
          <p className="text-[20px] font-bold uppercase">Litecoin</p>
        </div>
      </div>
    </section>
  );
}
