import { type ReactNode, Suspense } from "react";
import Navbar from "@/app/(home)/_components/header-nav/main";
import Footer from "@/app/(home)/_components/footer-nav/main";
import Sidebar from "@/app/(home)/_components/sidebar/sidebar";
import { GoogleTagManager } from "@next/third-parties/google";

import { env } from "@/config/env";

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="custom-prose">
      {env.GTM_TAG && <GoogleTagManager gtmId={env.GTM_TAG} />}
      <Navbar />
      {/* {env.NODE_ENV === "production" && (
          <AdSense
            pId={env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID as string}
          />
        )} */}
      <div className="my-2 flex flex-col flex-wrap md:container md:flex-row md:px-12">
        <main className="min-h-screen w-full p-2 md:w-9/12">{children}</main>
        <aside className="mt-2 w-full p-2 md:mt-0 md:w-1/4">
          <Suspense fallback={"Loading.."}>
            <Sidebar />
          </Suspense>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
