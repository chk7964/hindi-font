import { Card } from "@/components/ui/card";

import NotFoundComponent from "@/components/404-not-found";

export const metadata = {
  title: "404 Not Found",
  // description: "",
};

export default async function NotFound() {
  return (
    <>
      <Card className="my-2 gap-0 p-2 text-center">
        <NotFoundComponent />
      </Card>
    </>
  );
}
