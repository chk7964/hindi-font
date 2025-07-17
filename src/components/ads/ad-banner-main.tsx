"use client";

import { useEffect } from "react";
import { Card } from "../ui/card";

const AdBanner = ({ children }: any) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Card className="my-2">
      <p className="mt-0! text-center underline underline-offset-2">
        Advertisement
      </p>
      <div dangerouslySetInnerHTML={{ __html: children }}></div>
    </Card>
  );
};

export default AdBanner;
