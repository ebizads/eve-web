import { TextField, MenuItem, Button, Typography } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../../components/Table";

export default function DriverManagement() {
  const columns = [
    { id: "driverName", label: "Driver Name" },
    { id: "licenseNo", label: "License No." },
    { id: "contact", label: "Contact No." },
    { id: "dateofBirth", label: "Date of Birth" },
    { id: "status", label: "Status" },
    {
      id: "actions",
      label: "Actions",
      width: "60px",
      align: "center" as const,
    },
  ];

  const rows = [
    {
      image: "https://i.pravatar.cc/150?img=1",
      driverName: "John Doe",
      licenseNo: "D1234567",
      contact: "123-456-7890",
      dateofBirth: "1990-01-01",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=2",
      driverName: "Jane Smith",
      licenseNo: "D7654321",
      contact: "098-765-4321",
      dateofBirth: "1985-05-15",
      status: "Inactive",
    },
    {
      image: "https://i.pravatar.cc/150?img=3",
      driverName: "Michael Johnson",
      licenseNo: "D1111111",
      contact: "555-123-4567",
      dateofBirth: "1988-03-10",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=4",
      driverName: "Sarah Williams",
      licenseNo: "D2222222",
      contact: "555-234-5678",
      dateofBirth: "1992-07-22",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=5",
      driverName: "Robert Brown",
      licenseNo: "D3333333",
      contact: "555-345-6789",
      dateofBirth: "1987-11-08",
      status: "Inactive",
    },
    {
      image: "https://i.pravatar.cc/150?img=6",
      driverName: "Emily Davis",
      licenseNo: "D4444444",
      contact: "555-456-7890",
      dateofBirth: "1991-02-14",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=7",
      driverName: "David Miller",
      licenseNo: "D5555555",
      contact: "555-567-8901",
      dateofBirth: "1989-09-25",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=8",
      driverName: "Jessica Wilson",
      licenseNo: "D6666666",
      contact: "555-678-9012",
      dateofBirth: "1994-12-03",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=9",
      driverName: "Christopher Moore",
      licenseNo: "D7777777",
      contact: "555-789-0123",
      dateofBirth: "1986-06-18",
      status: "Inactive",
    },
    {
      image: "https://i.pravatar.cc/150?img=10",
      driverName: "Amanda Taylor",
      licenseNo: "D8888888",
      contact: "555-890-1234",
      dateofBirth: "1993-04-07",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=11",
      driverName: "James Anderson",
      licenseNo: "D9999999",
      contact: "555-901-2345",
      dateofBirth: "1990-08-30",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=12",
      driverName: "Lauren Thomas",
      licenseNo: "D1010101",
      contact: "555-012-3456",
      dateofBirth: "1995-01-12",
      status: "Active",
    },
    {
      image: "https://i.pravatar.cc/150?img=13",
      driverName: "Daniel Jackson",
      licenseNo: "D1111112",
      contact: "555-123-4567",
      dateofBirth: "1988-10-20",
      status: "Inactive",
    },
    {
      image: "https://i.pravatar.cc/150?img=14",
      driverName: "Sophia White",
      licenseNo: "D1212121",
      contact: "555-234-5678",
      dateofBirth: "1992-05-11",
      status: "Active",
    },
  ];

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
            columns={columns}
            rows={rows}
            height="auto"
            maxHeight="620px"
          ></Table>
        </div>
      </div>
    </div>
  );
}
