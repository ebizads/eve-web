import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Typography,
  SelectChangeEvent
} from "@mui/material";
import { Campaign, Close } from "@mui/icons-material";

interface Announcement {
  id: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  title: string;
  description: string;
  postedDate: string;
  author: string;
  audience: "drivers" | "passengers" | "both";
}

interface CreateAnnouncementModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (announcement: Omit<Announcement, 'id' | 'postedDate' | 'author'>) => void;
}

export default function CreateAnnouncementModal({
  open,
  onClose,
  onSubmit
}: CreateAnnouncementModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    category: "",
    audience: "both" as "drivers" | "passengers" | "both"
  });

  const handleClose = () => {
    onClose();
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      category: "",
      audience: "both"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string) => (event: SelectChangeEvent) => {
    setFormData(prev => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return; // Basic validation
    }

    onSubmit(formData);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <DialogTitle className="flex items-center justify-between bg-[#121212] text-white">
        <div className="flex items-center gap-3">
          <Campaign className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-semibold">Create New Announcement</span>
        </div>
        <Button onClick={handleClose} size="small" className="text-white hover:bg-white/10">
          <Close className="text-white" />
        </Button>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
 <div className="grid grid-cols-3 gap-4">
  {/* Type */}
  <div>
    <Typography variant="body2" className="mb-1 font-medium text-gray-700">
      Type
    </Typography>
  <FormControl fullWidth>
  <Select
    value={formData.priority}
    onChange={handleSelectChange("priority")}
    variant="outlined"
    sx={{
      borderRadius: "0.375rem",
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "0.375rem",
      },
    }}
  >
    <MenuItem value="Alert">Alert</MenuItem>
    <MenuItem value="Announcement">Announcement</MenuItem>
    <MenuItem value="Low">Promotion</MenuItem>
  </Select>
</FormControl>

  </div>

  {/* Target Audience */}
  <div>
    <Typography variant="body2" className="mb-1 font-medium text-gray-700">
      Target Audience
    </Typography>
    <FormControl fullWidth>
      <Select
        value={formData.audience}
        onChange={handleSelectChange("audience")}
        variant="outlined"
      >
        <MenuItem value="drivers">Drivers</MenuItem>
        <MenuItem value="passengers">Passengers</MenuItem>
        <MenuItem value="both">All Users</MenuItem>
      </Select>
    </FormControl>
  </div>

  {/* Priority Level */}
  <div>
    <Typography variant="body2" className="mb-1 font-medium text-gray-700">
      Priority Level
    </Typography>
    <FormControl fullWidth>
      <Select
        value={formData.priority}
        onChange={handleSelectChange("priority")}
        variant="outlined"
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </Select>
    </FormControl>
  </div>
</div>


          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            variant="outlined"
            placeholder="Enter announcement title"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter detailed description"
          />

          
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., System Alert, Policy Update, General"
            variant="outlined"
          />
        </DialogContent>

        <DialogActions className="p-6">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Create Announcement
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}