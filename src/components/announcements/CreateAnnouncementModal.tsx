import React, { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

/* ================= TYPES ================= */

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
  onSubmit: (
    announcement: Omit<Announcement, "id" | "postedDate" | "author">
  ) => void;
}

/* ================= REUSABLE SELECT ================= */

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function Select({
  label,
  value,
  placeholder,
  options,
  onChange
}: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full rounded-md border px-3 py-2 text-left focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              value ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {value
              ? options.find((o) => o.value === value)?.label
              : placeholder}

            <ChevronUpDownIcon className="pointer-events-none absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </Listbox.Button>

          <Listbox.Options className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg p-1">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-3 py-2 rounded-md ${
                    active ? "bg-blue-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    {option.label}
                    {selected && <CheckIcon className="h-4 w-4" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

/* ================= MODAL ================= */

export default function CreateAnnouncementModal({
  open,
  onClose,
  onSubmit
}: CreateAnnouncementModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    audience: "",
    sendOption: "",
    schedule: ""
  });

  const resetForm = () =>
    setFormData({
      title: "",
      description: "",
      priority: "",
      category: "",
      audience: "",
      sendOption: "",
      schedule: ""
    });

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;
    onSubmit(formData as any);
    handleClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-4xl rounded-lg bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between bg-[#121212] px-6 py-4 text-white rounded-t-lg">
                <Dialog.Title className="text-lg font-semibold">
                  Create New Announcement
                </Dialog.Title>
                <button onClick={handleClose}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Top selects */}
                <div className="grid grid-cols-3 gap-4">
                  <Select
                    label="Type"
                    placeholder="Select Type"
                    value={formData.category}
                    onChange={(v) =>
                      setFormData({ ...formData, category: v })
                    }
                    options={[
                      { label: "Alert", value: "Alert" },
                      { label: "Announcement", value: "Announcement" },
                      { label: "Promotion", value: "Promotion" }
                    ]}
                  />

                  <Select
                    label="Target Audience"
                    placeholder="Select Audience"
                    value={formData.audience}
                    onChange={(v) =>
                      setFormData({ ...formData, audience: v })
                    }
                    options={[
                      { label: "Drivers", value: "drivers" },
                      { label: "Passengers", value: "passengers" },
                      { label: "All Users", value: "both" }
                    ]}
                  />

                  <Select
                    label="Priority Level"
                    placeholder="Select Priority"
                    value={formData.priority}
                    onChange={(v) =>
                      setFormData({ ...formData, priority: v })
                    }
                    options={[
                      { label: "High", value: "High" },
                      { label: "Medium", value: "Medium" },
                      { label: "Low", value: "Low" }
                    ]}
                  />
                </div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Title *
  </label>

  <input
    type="text"
    value={formData.title}
    onChange={(e) =>
      setFormData({ ...formData, title: e.target.value })
    }
    className="
      w-full
      rounded-md
      border
      border-gray-300
      px-3
      py-2
      text-gray-900
      placeholder-gray-400
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
    "
    required
  />
</div>


<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Description *
  </label>

  <textarea
    rows={4}
    value={formData.description}
    onChange={(e) =>
      setFormData({
        ...formData,
        description: e.target.value
      })
    }
    className="
      w-full
      rounded-md
      border
      border-gray-300
      px-3
      py-2
      text-gray-900
      placeholder-gray-400
      resize-none
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:border-blue-500
    "
    required
  />
</div>


                {/* Bottom selects */}
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Send Options"
                    placeholder="Select Send Option"
                    value={formData.sendOption}
                    onChange={(v) =>
                      setFormData({ ...formData, sendOption: v })
                    }
                    options={[
                      { label: "Email", value: "email" },
                      { label: "In App", value: "inApp" },
                      { label: "SMS", value: "sms" }
                    ]}
                  />

                  <Select
                    label="Schedule"
                    placeholder="Select Schedule"
                    value={formData.schedule}
                    onChange={(v) =>
                      setFormData({ ...formData, schedule: v })
                    }
                    options={[
                      { label: "Send Immediately", value: "now" },
                      { label: "Set Schedule", value: "later" }
                    ]}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md border px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Create Announcement
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
