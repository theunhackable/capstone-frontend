"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { User } from "@/types";
import { toast } from "sonner";
import useAxiosPrivate from "@/hooks/userAxiosPrivate";

export default function ConfirmActionDialog({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(user.blocked);
  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await axiosPrivate.put(`/users/${user.id}`, {
        ...user,
        blocked: !blocked,
      }); // API endpoint to block/unblock
      setBlocked((prev) => !prev);
      toast.success("Updated User", {
        description: `Successfully updated the user.`,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error while blocking/unblocking user.");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Button to open the dialog */}
      <Button
        variant={blocked ? "outline" : "destructive"}
        onClick={() => setIsOpen(true)}
      >
        {blocked ? "Unblock" : "Block"} User
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{blocked ? "Unblock User" : "Block User"}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to {blocked ? "unblock" : "block"} this user?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant={blocked ? "default" : "destructive"}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : blocked ? (
                "Unblock"
              ) : (
                "Block"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
