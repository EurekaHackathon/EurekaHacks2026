"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/Dialog";

const ACTION_CONFIG: Record<
  string,
  {
    label: string;
    icon: string;
    buttonClass: string;
    confirmTitle: string;
    confirmDescription: string;
    confirmClass: string;
  }
> = {
  rejected: {
    label: "Reject",
    icon: "fluent:dismiss-circle-32-regular",
    buttonClass: "border-error-600 border text-error-600",
    confirmTitle: "Reject this application?",
    confirmDescription:
      "A rejection email will be sent. You can undo this by resetting the status, BUT THE EMAIL CANNOT BE UNSENT. USE THIS FOR FINAL DECISIONS ONLY.",
    confirmClass: "bg-red-600 hover:bg-red-700 text-white",
  },
  waitlisted: {
    label: "Waitlist",
    icon: "fluent:clock-12-regular",
    buttonClass: "border-orange-500 border text-orange-500",
    confirmTitle: "Waitlist this application?",
    confirmDescription:
      "A waitlist email will be sent. You can undo this by resetting the status, BUT THE EMAIL CANNOT BE UNSENT. USE THIS FOR FINAL DECISIONS ONLY",
    confirmClass: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  accepted: {
    label: "Accept",
    icon: "fluent:checkmark-circle-12-regular",
    buttonClass: "border-green-500 border text-green-500",
    confirmTitle: "Accept this application?",
    confirmDescription:
      "An acceptance email will be sent. You can undo this by resetting the status, BUT THE EMAIL CANNOT BE UNSENT. USE THIS FOR FINAL DECISIONS ONLY.",
    confirmClass: "bg-green-600 hover:bg-green-700 text-white",
  },
  submitted: {
    label: "Reset status",
    icon: "fluent:arrow-reset-20-filled",
    buttonClass: "border-secondary-50 border text-secondary-50",
    confirmTitle: "Reset this application's status?",
    confirmDescription:
      "Status goes back to 'Submitted'. No email will be sent.",
    confirmClass: "bg-secondary-600 hover:bg-secondary-700 text-white",
  },
};

export function ApplicationActionsForm({ id }: { id: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const updateStatus = async (status: string) => {
    setIsLoading(status);
    setPendingAction(null);

    const formData = new FormData();
    formData.append("applicationId", id.toString());
    formData.append("status", status);

    const response = await fetch("/api/application/update-status", {
      method: "POST",
      body: formData,
    });

    setIsLoading(null);

    if (response.ok) {
      router.refresh();
      toast({
        variant: "success",
        title: "Success",
        description: "Application status updated",
      });
    } else {
      toast({
        variant: "error",
        title: "Error",
        description: "Failed to update application status",
      });
    }
  };

  const config = pendingAction ? ACTION_CONFIG[pendingAction] : null;

  return (
    <div className="mt-8">
      <Icon icon="eos-icons:loading" className="hidden" />
      <h1 className="text-xl font-semibold">Actions</h1>
      <div className="grid xl:grid-cols-4 gap-4 mt-4">
        {Object.entries(ACTION_CONFIG).map(([status, cfg]) => (
          <button
            key={status}
            onClick={() => setPendingAction(status)}
            disabled={isLoading !== null}
            className={`py-2 rounded-lg flex items-center gap-2 justify-center duration-200 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${cfg.buttonClass}`}
          >
            {isLoading === status ? (
              <Icon
                icon="eos-icons:loading"
                className="text-2xl animate-spin"
              />
            ) : (
              <Icon icon={cfg.icon} className="text-2xl" />
            )}
            {cfg.label}
          </button>
        ))}
      </div>

      <Dialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) setPendingAction(null);
        }}
      >
        <DialogContent className="bg-[#151c2b] border-gray-700 text-secondary-50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-secondary-50">
              {config?.confirmTitle}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 text-sm">{config?.confirmDescription}</p>
          <DialogFooter className="gap-2 mt-2">
            <DialogClose asChild>
              <button className="px-4 py-2 rounded-lg border border-gray-600 text-secondary-50 hover:bg-white/5 duration-150">
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={() => pendingAction && updateStatus(pendingAction)}
              className={`px-4 py-2 rounded-lg font-semibold duration-150 ${config?.confirmClass}`}
            >
              Confirm
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
