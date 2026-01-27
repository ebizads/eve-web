import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string | number;
}

interface TableProps {
  columns: Column[];
  rows: Record<string, any>[];
  height?: string | number;
  maxHeight?: string | number;
}

export default function Table({
  columns,
  rows,
  height = "auto",
  maxHeight = "600px",
}: TableProps) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedRows = rows.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  return (
    <div className="flex flex-col justify-between w-full h-full ">
      <TableContainer
        sx={{
          width: "100%",
          height: height,
          maxHeight: maxHeight,
          overflow: "auto",
        }}
      >
        <MuiTable stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFFFFF" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{
                    width: column.width,
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                hover
                sx={{ backgroundColor: "#F7F6FE" }}
              >
                {columns.map((column) => {
                  let cellContent = row[column.id];

                  // Handle driverName column with image
                  if (column.id === "driverName") {
                    cellContent = (
                      <div className="flex items-center gap-3">
                        <img
                          src={row.image || "https://via.placeholder.com/40"}
                          alt="driver"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{row[column.id]}</span>
                      </div>
                    );
                  }

                  // Handle actions column with icon button
                  if (column.id === "actions") {
                    cellContent = (
                      <IconButton
                        size="small"
                        sx={{
                          color: "#424242",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </IconButton>
                    );
                  }

                  return (
                    <TableCell
                      key={`${rowIndex}-${column.id}`}
                      align={column.align || "left"}
                      sx={{
                        width: column.width,
                      }}
                    >
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <div className="flex justify-end py-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              aspectRatio: "1",
              minWidth: "44px",
              width: "44px",
              height: "44px",
              padding: 0,
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 500,
              border: "1px solid #e0e0e0",
            },
            "& .MuiPaginationItem-page": {
              backgroundColor: "#ffffff",
              color: "#424242",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#5C5E64",
              color: "#ffffff",
              border: "1px solid #5C5E64",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#4B4D52",
              },
            },
            "& .MuiPaginationItem-previousNext": {
              backgroundColor: "#ffffff",
              color: "#424242",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
