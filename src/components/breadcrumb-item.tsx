import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { type Breadcrumb_Itype } from "@/types/types";
import Link from "next/link";
import { Card } from "./ui/card";
import { Fragment } from "react";
import { env } from "@/config/env";

const BreadcrumbsItem = ({ data }: { data: Breadcrumb_Itype[] }) => {
  const list = [{ name: "Home", slug: "" }, ...data];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => {
      const isLastItem = index === list.length - 1;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(isLastItem
          ? {}
          : {
              item: `${env.NEXT_PUBLIC_SITE_URL}${item.slug}`,
            }),
      };
    }),
  };

  return (
    <Card className="px-2 py-0">
      <Breadcrumb className="">
        <BreadcrumbList>
          {list.map((item: Breadcrumb_Itype, index: number) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {index === list.length - 1 ? (
                  <BreadcrumbPage>
                    {item.name.length > 35
                      ? item.name.slice(0, 35) + " ..."
                      : item.name}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={`${env.NEXT_PUBLIC_SITE_URL}${item.slug}`}>
                        {item.name}
                      </Link>
                    </BreadcrumbLink>
                  </>
                )}
              </BreadcrumbItem>
              {index < list.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Add schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Card>
  );
};

export default BreadcrumbsItem;
