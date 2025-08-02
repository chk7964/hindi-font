"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition, useState } from "react";
import axios from "axios";
import { env } from "@/config/env";
import { type apiResponse } from "@/types/api-response";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Schema
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(100, { message: "Title must be less than 100 characters." }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  status: z.boolean({
    message: "Please select a status.",
  }),
  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase letters, numbers, and hyphens only.",
    }),
  category_id: z.number({
    message: "Please select a category",
  }),
  files: z.array(
    z.object({
      filename: z.string(),
      size: z.number(),
      category_id: z.number().optional(),
      mimetype: z.string(),
    })
  ),
});

export default function ContentForm({
  propsData,
  category,
}: {
  propsData: any;
  category: { slug: string; id: number; name: string }[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: propsData.title || "",
      content: propsData.content || "",
      status: propsData.status || false,
      slug: propsData.slug || "",
      category_id: propsData.category_id || 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: propsData.id,
      category_id: values.category_id,
      content: values.content,
      status: values.status,
      slug: values.slug,
      title: values.title,
      files: values.files,
    };
    console.log(values);
    startTransition(async () => {
      try {
        const url = new URL(
          `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/posts/add-edit-post`
        );
        const res = await axios.post(url.toString(), data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Failed");
      }
    });
  }

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  return (
    <div className="mx-auto min-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Post</h1>
        <p className="text-muted-foreground">
          Fill out the form below to create new content.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter content title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      const slug = generateSlug(e.target.value);
                      form.setValue("slug", slug);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The main title of your content.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your content here..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The main body of your content.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(val === "true")}
                    value={String(field.value)}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Current publication status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {category.map((item) => (
                        <SelectItem key={item.id} value={String(item.id)}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Content category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>File Upload</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".ttf"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (
                        file.type !== "font/ttf" &&
                        !file.name.endsWith(".ttf")
                      ) {
                        toast.error("Please upload a .ttf font file.");
                        return;
                      }
                      setUploading(true);
                      setUploadProgress(0);
                      try {
                        // Step 1: Get upload URL
                        const res = await fetch(
                          `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/upload`,
                          {
                            method: "POST",
                            body: JSON.stringify({
                              filename: file.name,
                              type: file.type,
                            }),
                            headers: { "Content-Type": "application/json" },
                          }
                        );
                        const upload = await res.json();
                        if (upload.success === true) {
                          await axios.put(upload.data, file, {
                            headers: {
                              "Content-Type": file.type,
                            },
                            onUploadProgress: (event) => {
                              if (event.total) {
                                const percent = Math.round(
                                  (event.loaded * 100) / event.total
                                );
                                setUploadProgress(percent);
                              }
                            },
                          });
                          toast.success("File uploaded successfully");
                          // Optionally update form value with file info
                          field.onChange([
                            {
                              filename: file.name,
                              size: file.size,
                              mimetype: file.type,
                            },
                          ]);
                        } else {
                          toast.error("Failed to get upload URL");
                        }
                      } catch (err) {
                        toast.error("File upload failed");
                      } finally {
                        setUploading(false);
                      }
                    }}
                  />
                </FormControl>
                {uploading && (
                  <div className="mt-2 h-2 w-full rounded bg-gray-200">
                    <div
                      className="h-2 rounded bg-blue-500"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {!uploading && uploadProgress === 100 && (
                  <div className="mt-1 text-xs text-green-600">
                    Upload complete!
                  </div>
                )}
                <FormDescription>
                  Upload an optional .ttf file for this post.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="content-slug" {...field} />
                </FormControl>
                <FormDescription>
                  URL-friendly version of the title. Auto-generated from title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : propsData.id ? (
                "Update Content"
              ) : (
                "Create Content"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
