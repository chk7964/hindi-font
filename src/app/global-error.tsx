"use client";

import "@/styles/globals-tailwind.css";
import ErrorComponent from "@/components/error-component";

export default function GlobalError({
  // error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="h-screen">
        <ErrorComponent reset={reset} />
      </body>
    </html>
  );
}
