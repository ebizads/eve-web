import Modal from "../modal";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AddDriverModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    licenseNumber: "",
    contactNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    emergencyContact: "",
    address: "",
    driverLicense: null as File | null,
    insuranceDocument: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Clear errors and reset form shortly after modal closes
  useEffect(() => {
    if (!open) {
      // wait until dialog close animation finishes, then fully clear form+errors
      const timer = setTimeout(() => {
        resetForm();
      }, 300); // 300ms delay to avoid visible clearing during close

      return () => clearTimeout(timer);
    }
  }, [open]);

  const isFormEmpty = (): boolean => {
    return (
      !formData.fullName &&
      !formData.licenseNumber &&
      !formData.contactNumber &&
      !formData.emailAddress &&
      !formData.dateOfBirth &&
      !formData.emergencyContact &&
      !formData.address &&
      !formData.driverLicense &&
      !formData.insuranceDocument
    );
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      licenseNumber: "",
      contactNumber: "",
      emailAddress: "",
      dateOfBirth: "",
      emergencyContact: "",
      address: "",
      driverLicense: null,
      insuranceDocument: null,
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    if (!isFormEmpty()) {
      setShowConfirmation(true);
    } else {
      // just close; form will be reset shortly by the effect above
      setOpen(false);
    }
  };

  const handleConfirmClose = () => {
    resetForm();
    setShowConfirmation(false);
    setOpen(false);
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: "driverLicense" | "insuranceDocument",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fileType]: file,
      }));
      // Clear error for this field
      if (errors[fileType]) {
        setErrors((prev) => ({
          ...prev,
          [fileType]: "",
        }));
      }
    }
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Check required text fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License Number is required";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required";
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        newErrors.dateOfBirth = "Driver must be at least 18 years old";
      }
    }
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency Contact is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.driverLicense) {
      newErrors.driverLicense = "Driver's License is required";
    }
    if (!formData.insuranceDocument) {
      newErrors.insuranceDocument = "Insurance Document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Form Data:", formData);
      // Handle form submission
      resetForm();
      setOpen(false);
    }
  };

  return (
    <>
      <Modal
        header={
          <div className="cursor-default">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold"></span>
              <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                Driver Registration
              </Typography>
            </div>
            <Typography
              sx={{ fontSize: "13px", color: "#666", marginTop: "4px" }}
            >
              Add a new driver to the fleet
            </Typography>
          </div>
        }
        open={open}
        setOpen={handleCloseModal}
        headerBgColor="#1a1a1a"
        headerClassname="!text-white"
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { maxHeight: "90vh" } }}
      >
        <div className="p-6 overflow-y-auto">
          {/* Driver Information Section */}
          <div className="mb-8">
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#000",
              }}
            >
              Driver Information
            </Typography>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="John Smith"
                  required
                  error={!!errors.fullName}
                />
                {errors.fullName && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.fullName}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  label="License Number"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="D03-2023-4567"
                  required
                  error={!!errors.licenseNumber}
                />
                {errors.licenseNumber && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.licenseNumber}
                  </Typography>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="+63 0917 123 4567"
                  required
                  error={!!errors.contactNumber}
                />
                {errors.contactNumber && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.contactNumber}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  label="Email Address"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="john.smith@gmail.com"
                  required
                  type="email"
                  error={!!errors.emailAddress}
                />
                {errors.emailAddress && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.emailAddress}
                  </Typography>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <TextField
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="dd/mm/yyyy"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  required
                  error={!!errors.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.dateOfBirth}
                  </Typography>
                )}
              </div>
              <div>
                <TextField
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                  placeholder="+63 0908 123 4567"
                  required
                  error={!!errors.emergencyContact}
                />
                {errors.emergencyContact && (
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#d32f2f",
                      marginTop: "4px",
                    }}
                  >
                    {errors.emergencyContact}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
                placeholder="123 Main Street, City, State, ZIP"
                required
                error={!!errors.address}
              />
              {errors.address && (
                <Typography
                  sx={{ fontSize: "12px", color: "#d32f2f", marginTop: "4px" }}
                >
                  {errors.address}
                </Typography>
              )}
            </div>
          </div>

          {/* Documents Section */}
          <div className="mb-8">
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#000",
              }}
            >
              Documents
            </Typography>

            <div className="mb-4">
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Driver's License
              </Typography>
              <div
                className={`flex items-center gap-3 border rounded-md p-3 ${
                  errors.driverLicense ? "border-red-500" : "border-gray-300"
                }`}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC300",
                    color: "#000",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#FFB700",
                    },
                  }}
                  component="label"
                >
                  Choose File
                  <input
                    hidden
                    type="file"
                    onChange={(e) => handleFileChange(e, "driverLicense")}
                  />
                </Button>
                <Typography sx={{ fontSize: "13px", color: "#666" }}>
                  {formData.driverLicense?.name || "Insert file here"}
                </Typography>
              </div>
              {errors.driverLicense && (
                <Typography
                  sx={{ fontSize: "12px", color: "#d32f2f", marginTop: "4px" }}
                >
                  {errors.driverLicense}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "8px",
                }}
              >
                Insurance Document
              </Typography>
              <div
                className={`flex items-center gap-3 border rounded-md p-3 ${
                  errors.insuranceDocument
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC300",
                    color: "#000",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#FFB700",
                    },
                  }}
                  component="label"
                >
                  Choose File
                  <input
                    hidden
                    type="file"
                    onChange={(e) => handleFileChange(e, "insuranceDocument")}
                  />
                </Button>
                <Typography sx={{ fontSize: "13px", color: "#666" }}>
                  {formData.insuranceDocument?.name || "Insert file here"}
                </Typography>
              </div>
              {errors.insuranceDocument && (
                <Typography
                  sx={{ fontSize: "12px", color: "#d32f2f", marginTop: "4px" }}
                >
                  {errors.insuranceDocument}
                </Typography>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              variant="outlined"
              sx={{
                borderColor: "#000",
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#000",
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FFC300",
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#FFB700",
                },
              }}
              onClick={handleRegister}
            >
              Register Driver
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        onClose={handleCancelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          Discard Changes?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#666" }}>
            You have unsaved changes. Are you sure you want to close this form?
            All data will be lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} sx={{ color: "#000" }}>
            Keep Editing
          </Button>
          <Button
            onClick={handleConfirmClose}
            sx={{ color: "#d32f2f", fontWeight: "bold" }}
            autoFocus
          >
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
