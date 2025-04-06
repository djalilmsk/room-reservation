import { Outlet } from "react-router-dom";
import meetingTable from "@/assets/meetingTable3.png";
import meetingTable2 from "@/assets/meetingTable4.png";

function Body() {
  return (
    <div className="relative">
      <ImageBackground />
      <div className="xl:w-6xl max-xl:w-[90%] max-md:w-full mx-auto ">
      <Outlet />
      </div>
    </div>
  );
}

function ImageBackground() {
  return (
    <div className="absolute flex h-[50dvh] w-full items-center justify-center overflow-hidden bg-[#3792DE20] max-md:hidden">
      <img
        src={meetingTable}
        alt="Meeting Table"
        className="absolute bottom-1/2 left-3/5 h-[90dvh] max-w-full translate-y-4/11 object-contain mix-blend-darken xl:left-3/5 2xl:left-2/4 dark:opacity-50 dark:mix-blend-multiply"
      />
      <img
        src={meetingTable2}
        alt="Meeting Table"
        className="absolute bottom-1/2 left-3/5 hidden h-[90dvh] max-w-full translate-y-4/11 object-contain xl:left-3/5 2xl:left-2/4 dark:block"
      />
    </div>
  );
}

export default Body;
