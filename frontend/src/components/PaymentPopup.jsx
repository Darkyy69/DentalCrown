import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ACCESS_TOKEN } from "/src/constants";
import api from "/src/api";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/components/ui/use-toast";
const currency = "DA";

export function PaymentPopup({
  open,
  setOpen,
  model_data,
  fetchNotifications,
}) {
  //   const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Payment</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
            <DialogDescription>
              Please make a payment to continue using the application.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm model_data={model_data} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Edit Payment</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Payment</DrawerTitle>
          <DrawerDescription>
            Please make a payment to continue using the application.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm
          className="px-4"
          model_data={model_data}
          setOpen={setOpen}
          fetchNotifications={fetchNotifications}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ model_data, setOpen, fetchNotifications }) {
  const { toast } = useToast();
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));

  const [formData, setFormData] = useState({
    patient: model_data?.patient?.id,
    dentist: model_data?.dentist?.id,
    treatment: model_data?.treatment?.id,
    current_user: token.user_id,
    date: Date.now(),
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    // Add your form submission logic here
    try {
      const res = await api.post("/api/payments/", formData);
      console.log(res.data);
      toast({
        variant: "success",
        title: "Payment added successfully",
        description: "Payment has been added successfully.",
      });
      setOpen(false);
      fetchNotifications();
    } catch (error) {
      console.error("Error adding payment:", error);
      toast({
        variant: "destructive",
        title: "Error adding payment",
        description: error.response.data.error,
      });
    }
  }

  return (
    <form className="grid items-start gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="patient">Patient</Label>
        <Input
          type="text"
          id="patient"
          defaultValue={model_data?.patient.full_name}
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="dentist">Dentist</Label>
        <Input
          id="dentist"
          defaultValue={model_data?.dentist.full_name}
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="treatment">Treatment</Label>
        <Input
          id="treatment"
          defaultValue={model_data?.treatment.diagnostic.name}
          disabled
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <>
          <Label htmlFor="amount">Amount</Label>
          <Label htmlFor="amount">Total Treatment Price</Label>
        </>
        <>
          <Input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder={`2000 ${currency}`}
          />
          <Input type="number" value={model_data?.treatment.price} disabled />
        </>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="submit">Make Payment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Check the amount and click on the
              Make Payment button to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit">Make Payment</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
