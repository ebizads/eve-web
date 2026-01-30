import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogProps,
  SxProps,
  Theme,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

interface ModalProps {
  header?: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  headerClassname?: string;
  headerBgColor?: string;
  children: ReactNode;
  maxWidth?: DialogProps["maxWidth"];
  disablePortal?: boolean;
  sx?: SxProps<Theme>;
  borderRadius?: number | string;
  buttonClassname?: string;
}

export default function Modal({
  header,
  open,
  setOpen,
  headerClassname,
  headerBgColor,
  children,
  maxWidth = "md",
  disablePortal = false,
  sx,
  borderRadius,
  buttonClassname = "text-black",
}: ModalProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        minHeight: "fit",
        "& .MuiDialog-paper": {
          minHeight: "fit",
          borderRadius: borderRadius,
        },
        ...sx,
      }}
      disablePortal={disablePortal}
    >
      <DialogTitle
        id="alert-dialog-title"
        className={headerClassname + " flex justify-between items-center !p-5"}
        sx={{
          backgroundColor: headerBgColor,
        }}
      >
        <div className="w-full">{header}</div>
        <IconButton onClick={() => setOpen(false)}>
          <CancelIcon className={buttonClassname} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: 0,
          overflow: "auto",
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
