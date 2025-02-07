"use client";

import React, { Suspense } from "react";
import TabRenderer from "@/components/tab-renderer";

const DashboardPage = () => {
  return (
    <main>
      <Suspense>
        <TabRenderer />
      </Suspense>
    </main>
  );
};

export default DashboardPage;
