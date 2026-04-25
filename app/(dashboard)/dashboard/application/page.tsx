"use client";

import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { Icon } from "@iconify/react";
import ApplicationSkeleton from "@/components/ApplicationSkeleton";
import SubmittedApplication from "@/components/SubmittedApplication";
import { Suspense } from "react";
import Application from "@/components/Application";
import { applicationsClosed } from "@/lib/applications-deadline";

export default function ApplicationPage() {
  const { applicationStatus } = useDashboardCtx();
  const closed = applicationsClosed();

  return (
    <>
      {applicationStatus?.status && <SubmittedApplication />}
      {(applicationStatus === null ||
        applicationStatus.status === "unsubmitted") &&
        (closed ? (
          <div className="flex flex-col justify-center items-center h-screen text-gray-100 px-12 lg:px-20">
            <div className="min-h-24">
              <Icon
                className="text-6xl text-error-500 mb-8"
                icon="fluent:dismiss-circle-28-regular"
              />
            </div>
            <h1 className="text-5xl font-semibold">Applications closed</h1>
            <p className="text-lg mt-4">
              Hacker applications for EurekaHACKS 2026 are now closed.
            </p>
          </div>
        ) : (
          <Suspense fallback={<ApplicationSkeleton />}>
            <Application />
          </Suspense>
        ))}
    </>
  );
}

