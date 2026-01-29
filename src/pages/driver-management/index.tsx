import { TextField, MenuItem, Button, Typography } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../../components/Table";
import { useState } from "react";
import {
  driverManageColumns as columns,
  driverManageRows as rows,
} from "../../lib/table";
import AddDriverModal from "../../components/driver-management/AddMemberModal";
import { useRouter } from "next/router";

export default function DriverManagement() {
  const router = useRouter();
  const handleRowClick = (id: string) => {
    router.push(`/driver-management/profile/${id}`);
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full h-full p-6 text-black">
      <div className="flex flex-col w-full h-full shadow-2xl rounded-2xl p-5 px-7">
        {/* TextFields and Button */}
        <div className="flex flex-col lg:flex-row w-full h-fit gap-5">
          <div className="flex flex-col sm:flex-row w-full gap-5">
            <div className="flex flex-col flex-1 sm:flex-none sm:w-60">
              <p className="text-sm font-medium mb-2">
                Driver Name or Driver ID
              </p>
              <TextField
                id="driver-input"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>

            <div className="flex flex-col flex-1 sm:flex-none sm:w-60">
              <p className="text-sm font-medium mb-2">License No.</p>
              <TextField
                id="license-input"
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
            <div className="flex flex-col flex-1 sm:flex-none sm:w-48">
              <p className="text-sm font-medium mb-2">Status</p>
              <TextField
                select
                id="status-input"
                variant="outlined"
                size="small"
                label="Select status"
                fullWidth
              >
                {/* Options can be added here */}
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </div>
          </div>
          <div className="flex items-end w-full sm:w-fit">
            <Button
              variant="contained"
              className="flex w-full sm:w-fit items-center justify-center"
              sx={{
                borderRadius: "4px",
                whiteSpace: "nowrap",
                bgcolor: "#FFC300",
                color: "black",
                height: "40px",
                fontWeight: "bold",
              }}
              startIcon={<PlusIcon className="w-5 text-black font-bold" />}
              onClick={() => setOpen(true)}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Register Driver
              </Typography>
            </Button>
          </div>
        </div>
        {/* Table */}
        <div className="flex w-full h-full max-h-full mt-5 ">
          <Table
            onClick={handleRowClick}
            columns={columns}
            rows={rows}
            height="auto"
            maxHeight="620px"
          />
        </div>
      </div>
      <AddDriverModal open={open} setOpen={setOpen} />
    </div>
  );
}
