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
import { useTransition } from "react";
import { env } from "@/config/env";
import axios from "axios";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category name is required.",
    })
    .max(50, {
      message: "Category name must be less than 50 characters.",
    }),
  slug: z
    .string()
    .min(1, {
      message: "Slug is required.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase letters, numbers, and hyphens only.",
    }),
});

export default function CategoryForm({ propsData }: { propsData: any }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: propsData.name || "",
      slug: propsData.slug || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      id: propsData.id,
      slug: values.slug,
      name: values.name,
    };
    startTransition(async () => {
      try {
        const url = new URL(
          `${env.NEXT_PUBLIC_SITE_URL}/api/chk7964/category/add-edit-category`
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

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Category</h1>
        <p className="text-muted-foreground">
          Add a new category for organizing content.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter category name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      // Auto-generate slug from name
                      const slug = generateSlug(e.target.value);
                      form.setValue("slug", slug);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The display name of the category.
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
                  <Input placeholder="category-slug" {...field} />
                </FormControl>
                <FormDescription>
                  URL-friendly version of the category name. Auto-generated from
                  name.
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
                "Update Category"
              ) : (
                "Create Category"
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
