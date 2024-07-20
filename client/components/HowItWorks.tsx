export default function HowItWorks() {
  return (
    <section className="flex items-center justify-center lg:flex-row flex-col  w-full lg:my-[200px] my-[100px] md:my-[200px] max-w-[1700px] gap-y-9 lg:gap-y-0">
      <div className="lg:w-1/2 w-full flex justify-center flex-col items-center gap-y-[8px] lg:gap-y-[16px]">
        <div className="rounded-full w-[140px] h-[140px] bg-slate-200 hidden lg:block"></div>
        <h1 className="text-[40px] lg:text-[45px] font-bold w-full text-center">
          How IT Works
        </h1>
        <p className="text-center lg:text-start">
          Understanding our data fetching process.
        </p>
      </div>
      <div className="bg-[#1F2937] lg:w-1/2 w-full grid grid-cols-2 grid-rows-2 h-[320px] lg:p-[33px] p-[12px]">
        <div className="  flex items-start justify-center flex-col">
          <h3 className=" text-[18px] lg:text-[22px] text-[#F5F5F5] text-center lg:text-start w-full lg:px-4 px-2">
            Fetch Data
          </h3>
          <p className="text-[13px] lg:text-[14px] text-[#D4D4D8] text-center lg:text-start w-full px-4">
            Retrieve the latest entries.
          </p>
        </div>
        <div className="flex items-start justify-center flex-col">
          <h3 className=" text-[18px] lg:text-[22px] text-[#F5F5F5] text-center lg:text-start w-full lg:px-4 px-2">
            Display Data
          </h3>
          <p className="text-[13px] lg:text-[14px] text-[#D4D4D8] text-center lg:text-start w-full px-4">
            View data dynamically.
          </p>
        </div>
        <div className="flex items-start justify-center flex-col">
          <h3 className=" text-[18px] lg:text-[22px] text-[#F5F5F5] text-center lg:text-start w-full lg:px-4 px-2">
            Change Asset
          </h3>
          <p className="text-[13px] lg:text-[14px] text-[#D4D4D8] text-center lg:text-start w-full px-4">
            Switch between stocks or crypto.
          </p>
        </div>
        <div className="flex items-start justify-center flex-col">
          <h3 className=" text-[18px] lg:text-[22px] text-[#F5F5F5] text-center lg:text-start w-full lg:px-4 px-2">
            Get Alerts
          </h3>
          <p className="text-[13px] lg:text-[14px] text-[#D4D4D8] text-center lg:text-start w-full px-4">
            Receive real-time notifications.
          </p>
        </div>
      </div>
    </section>
  );
}
