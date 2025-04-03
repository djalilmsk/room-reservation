import { Outlet } from "react-router-dom";
import meetingTable from "@/assets/meetingTable3.png";
import meetingTable2 from "@/assets/meetingTable4.png";

function Body() {
  return (
    <div className="relative">
      <div className="absolute flex h-[50dvh] w-full items-center justify-center overflow-hidden bg-[#3792DE20] max-md:hidden">
        <img
          src={meetingTable}
          alt="Meeting Table"
          className="absolute bottom-1/2 left-3/5 h-[90dvh] max-w-full translate-y-4/11 object-contain mix-blend-darken dark:mix-blend-multiply dark:opacity-50 xl:left-3/6 2xl:left-3/7"
        />
        <img
          src={meetingTable2}
          alt="Meeting Table"
          className="absolute bottom-1/2 left-3/5 h-[90dvh] max-w-full translate-y-4/11 object-contain xl:left-3/6 2xl:left-3/7 hidden dark:block"
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Body;
