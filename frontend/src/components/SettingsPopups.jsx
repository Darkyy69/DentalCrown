import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const SettingsPopup = ({ onClose }) => {
  return (
    // <div style={settingsPopupStyles.overlay}>
    //   <div style={settingsPopupStyles.popup}>
    //     <button onClick={onClose} style={settingsPopupStyles.closeButton}>
    //       Close
    //     </button>
    //     <h2>Settings</h2>
    //     <nav className="grid gap-4 text-sm text-muted-foreground">
    //       <Link href="#" className="font-semibold text-primary">
    //         General
    //       </Link>
    //       <Link href="#">Security</Link>
    //       <Link href="#">Integrations</Link>
    //       <Link href="#">Support</Link>
    //       <Link href="#">Organizations</Link>
    //       <Link href="#">Advanced</Link>
    //     </nav>
    //   </div>
    // </div>

    <Dialog open onOpenChange={onClose}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            <div className="mt-2 h-0.5 bg-secondary rounded"></div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-start gap-4">
          <nav className="grid gap-4 min-w-28 text-sm text-muted-foreground">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#profile">Profile</Link>
            <Link href="#clinic">Clinic</Link>
            <Link href="#">Advanced</Link>
            <Link href="#">Logs</Link>
            <Link href="#">Support</Link>
          </nav>
          <div className="grid grid-cols-3 gap-4 items-center w-full">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="sm:col-span-1 sm:col-start-3"
            />
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="sm:col-span-1 sm:col-start-3"
            />
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="sm:col-span-1 sm:col-start-3"
            />
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="sm:col-span-1 sm:col-start-3"
            />
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="sm:col-span-1 sm:col-start-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const settingsPopupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

// ProfilePopup.js
export const ProfilePopup = ({ onClose }) => {
  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <button onClick={onClose} style={popupStyles.closeButton}>
          Close
        </button>
        <h2>Profile</h2>
        <p>Profile content goes here...</p>
      </div>
    </div>
  );
};

const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
};

export default ProfilePopup;
