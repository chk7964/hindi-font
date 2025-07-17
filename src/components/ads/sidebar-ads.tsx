import { env } from "@/config/env";
import AdBanner from "./ad-banner-main";

export default function SidebarAds() {
  const ads =
    '<ins class="adsbygoogle" style=" display: block"  data-ad-client="ca-pub-3023867784333989"data-ad-slot="8560354984"data-ad-format="auto"data-full-width-responsive="true"></ins>';
  const status = false;
  return (
    <>
      {ads && status && env.NODE_ENV === "production" && (
        <AdBanner>{ads}</AdBanner>
      )}
    </>
  );
}
