"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function TestingUserSessionComponent() {
  const { data: session, status } = useSession();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
