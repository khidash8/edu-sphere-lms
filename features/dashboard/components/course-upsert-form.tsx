'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucidePlus, LucideSparkle } from 'lucide-react';
import slugify from 'slugify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/rich-text-editor/editor';
import { FileUploader } from '@/components/file-upload/file-uploader';
import { LoaderSpinner } from '@/components/loader-spinner';
import {
  categoryList,
  courseCreateSchema,
  CourseCreateSchemaType,
  courseLevelList,
  courseStatusList,
} from '@/features/dashboard/schemas/course-create-schema-type';

interface CreateCourseFormProps {
  onSubmit: (values: CourseCreateSchemaType) => void;
  isPending?: boolean;
  data?: CourseCreateSchemaType;
}

export const UpsertCourseForm = ({
  onSubmit,
  isPending = false,
  data,
}: CreateCourseFormProps) => {
  const form = useForm<CourseCreateSchemaType>({
    resolver: zodResolver(courseCreateSchema),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      fileKey: data?.fileKey || '',
      smallDescription: data?.smallDescription || '',
      slug: data?.slug || '',
      price: data?.price || 0,
      duration: data?.duration || 0,
      category:
        (data?.category as CourseCreateSchemaType['category']) || 'DEVELOPMENT',
      level: data?.level || 'BEGINNER',
      status: data?.status || 'ARCHIVED',
    },
  });

  const handleSubmit = (values: CourseCreateSchemaType) => {
    onSubmit(values);
  };

  const generateSlug = () => {
    const title = form.getValues('title');

    // Convert title to slug-compatible format
    const slugCompatibleTitle = title
      .toString()
      .toLowerCase()
      .trim()
      // Replace spaces and underscores with hyphens
      .replace(/[\s_]+/g, '-')
      // Remove special characters but keep hyphens
      .replace(/[^a-z0-9\\-]/g, '')
      // Remove consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');

    const slug = slugify(slugCompatibleTitle);
    form.setValue('slug', slug, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 p-4"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <div className="flex flex-col items-end gap-2">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="outline" onClick={generateSlug}>
            <LucideSparkle /> Generate slug
          </Button>
        </div>

        {/* Thumbnail URL */}
        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onChange={(key: string) => field.onChange(key)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Small Description */}
        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Small Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Small Description"
                  {...field}
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor fileKey={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price, Duration, Category, Level, Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Duration"
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      const value =
                        e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryList.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level */}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevelList.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseStatusList.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <LoaderSpinner label={data ? 'Updating...' : 'Creating...'} />
          ) : (
            <>
              {data ? (
                <>
                  <LucideSparkle /> Update Course
                </>
              ) : (
                <>
                  <LucidePlus /> Create Course
                </>
              )}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
