export default function CoinsUsed() {
  return (
    <section className="w-full mb-[50px] lg:mb-[100px] max-w-[1700px]">
      <h1 className="text-[40px] lg:text-[45px] font-bold w-full text-center">
        COINS USED
      </h1>
      <div className="flex md:flex-row flex-col gap-y-5 lg:gap-y-0 justify-between my-10 lg:my-20">
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2 flex items-center justify-center text-[20px] lg:text-[30px]">
          BitCoin
        </div>
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2 flex items-center justify-center text-[20px] lg:text-[30px]">
          Etherium
        </div>
        <div className="w-[100%] h-[60px] md:w-[347px] md:h-[359px] lg:w-[347px] lg:h-[359px] bg-[#1E1E1E] rounded-2xl p-2 flex items-center justify-center text-[20px] lg:text-[30px]">
          Doge
        </div>
      </div>
    </section>
  );
}
