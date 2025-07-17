import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// UI Components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// Custom hooks and utilities

import { SearchAction } from "./search-action";

import { cn } from "@/lib/utils";
import { useDebounceCallback } from "@/hooks/use-debounce-callback";

//Components

interface SearchProps {
  handleLinkClick: () => void;
}

export default function Search({ handleLinkClick }: SearchProps) {
  const [text, setText] = useState("");
  const debounced = useDebounceCallback(setText, 500);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!text) return;
    setIsLoading(true);
    try {
      const response = await SearchAction(text);
      setData(response.data.names);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  useEffect(() => {
    fetchData();
  }, [debounced, fetchData]);

  return (
    <>
      <Label className="font-bold">Search Name:</Label>
      {text}
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search Name..."
          onChange={(e) => (setIsLoading(true), debounced(e.target.value))}
          className={cn("pr-10", isLoading && "pr-10")}
        />
        {isLoading && (
          <Loader2 className="text-muted-foreground -ml-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {data.length ? (
        <ScrollArea className="mt-2 h-96 pt-2">
          {data.map((item: any) => (
            <Card className="my-2 p-2" key={item.id}>
              <Link
                prefetch={false}
                href={`/${item.name}`}
                onClick={handleLinkClick}
                className="flex flex-row flex-wrap gap-2 leading-3 hover:no-underline"
              >
                <b className="link">{item.name + " - "} </b>
                {item.stylish_names.map((item: any) => (
                  <div key={item.cuid} className="text-xs">
                    {"   " + item.sname}
                  </div>
                ))}
              </Link>
            </Card>
          ))}
        </ScrollArea>
      ) : (
        <>
          {!text ? (
            <></>
          ) : (
            data &&
            !data?.length && (
              <div className="pt-4 text-center font-bold underline ring-offset-4">
                No Result Found
              </div>
            )
          )}
        </>
      )}
    </>
  );
}
