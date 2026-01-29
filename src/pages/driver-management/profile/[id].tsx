import { useRouter } from "next/router";
import { driverManageRows } from "../../../lib/table";
import { Button } from "@mui/material";
import Image from "next/image";
export default function DriverProfile() {
  const router = useRouter();
  const { id } = router.query;

  // wait until id exists
  if (!id) return null;

  const driver = driverManageRows.find((driver) => driver.id === id);

  if (!driver) {
    return <p className="p-6">Driver not found</p>;
  }

  return (
    <div className="flex flex-col w-full h-full p-6 text-black">
      <div className="flex items-center w-full space-x-3">
        <Button
          variant="text"
          disableTouchRipple
          disableFocusRipple
          className="text-[#C4C4C4]"
          sx={{
            color: "#C4C4C4",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
            ":active": {
              color: "#D6B600",
            },
          }}
        >
          Driver Management
        </Button>
        <p className="cursor-default">&gt;</p>
        <p className="font-bold cursor-default">Profile</p>
      </div>
      <div className="flex flex-col lg:flex-row w-full h-full gap-4">
        {/* Left Column - Driver Profile Card */}
        <div className="flex flex-col w-full lg:w-1/3 p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg space-y-5">
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
            <div className="flex min-w-24 min-h-24 rounded-full bg-[#c4c4c4]"></div>
            <div className="flex flex-col justify-center">
              <p className="text-xl sm:text-2xl font-semibold">
                {driver.driverName}
              </p>
              <p className="text-sm sm:text-base">
                Driver ID: <span className="font-semibold">{driver.id}</span>
              </p>
            </div>
            <div className="flex items-center justify-center w-full sm:w-24 h-8 py-1 text-[#356A29] bg-[#C7FFC3] rounded-lg">
              {driver.status}
            </div>
          </div>
          <div className="border-[1px] border-[#BFBFBF]" />
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold text-[#BFBFBF]">
                License No.
              </p>
              <p className="text-lg sm:text-xl">{driver.licenseNo}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold text-[#BFBFBF]">
                Contact
              </p>
              <p className="text-lg sm:text-xl">{driver.contact}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold text-[#BFBFBF]">
                Date of Birth
              </p>
              <p className="text-lg sm:text-xl">{driver.dateofBirth}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg sm:text-xl font-bold text-[#BFBFBF]">
                Address
              </p>
              <p className="text-lg sm:text-xl">{driver.address}</p>
            </div>
          </div>
        </div>

        {/* Right Column - Stats, History, Documents & Feedbacks */}
        <div className="flex flex-col w-full lg:w-2/3 h-full gap-4">
          {/* Stats Cards Row */}
          <div className="flex flex-col sm:flex-row gap-4 h-1/5">
            <div className="flex flex-col flex-1 p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg">
              <p className="text-sm font-medium mb-2">Total Trips</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">23</p>
                <div className="text-2xl"></div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg">
              <p className="text-sm font-medium mb-2">Avg. Rating</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">4.6</p>
                <div className="text-2xl"></div>
              </div>
            </div>
          </div>

          {/* Trip History Section */}
          <div className="flex flex-col p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg h-2/5">
            <h2 className="text-xl font-bold mb-4">Trip History</h2>
            <div className="overflow-x-auto">
              <p className="text-gray-500">Trip history table placeholder</p>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant="text"
                sx={{
                  color: "#5C5E64",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                View All
              </Button>
            </div>
          </div>

          {/* Documents and Feedbacks Row */}
          <div className="flex flex-col sm:flex-row gap-4 h-2/5">
            <div className="flex flex-col flex-1 p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg">
              <h2 className="text-xl font-bold mb-4">Documents</h2>
              <div className="flex flex-col space-y-3">
                <p className="text-gray-500">Documents list placeholder</p>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="text"
                  sx={{
                    color: "#5C5E64",
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-5 px-7 border-[1px] border-[#BFBFBF] rounded-lg">
              <h2 className="text-xl font-bold mb-4">Feedbacks</h2>
              <div className="flex flex-col space-y-3">
                <p className="text-gray-500">Feedbacks list placeholder</p>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="text"
                  sx={{
                    color: "#5C5E64",
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  View All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
