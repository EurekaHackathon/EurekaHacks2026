"use client";

import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { Icon } from "@iconify/react";
import ApplicationSkeleton from "@/components/ApplicationSkeleton";
import SubmittedApplication from "@/components/SubmittedApplication";
import { Suspense } from "react";
import Application from "@/components/Application";

export default function ApplicationPage() {
  const { applicationStatus } = useDashboardCtx();

  return (
    <>
      {applicationStatus?.status && <SubmittedApplication />}
      {(applicationStatus === null ||
        applicationStatus.status === "unsubmitted") && (
        <Suspense fallback={<ApplicationSkeleton />}>
          <Application />
        </Suspense>
      )}
    </>
  );
}

