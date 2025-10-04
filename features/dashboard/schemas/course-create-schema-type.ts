import { z } from 'zod';

export const categoryList = [
  'ART',
  'BUSINESS',
  'DESIGN',
  'DEVELOPMENT',
  'FINANCE',
  'HEALTH',
  'LIFESTYLE',
  'MARKETING',
  'MUSIC',
  'SCIENCE',
  'SPORTS',
  'TECHNOLOGY',
] as const;

export const courseLevelList = [
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
] as const;

export const courseStatusList = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;

export const courseLevelSchema = z.enum(courseLevelList);

export const courseStatusSchema = z.enum(courseStatusList);

export const courseCategorySchema = z.enum(categoryList);

export const courseCreateSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long'),
  fileKey: z.string().min(1, 'File key is required'),
  price: z.number().min(1, 'Price must be at least 1$'),
  duration: z
    .number()
    .min(1, 'Duration must be at least 1 hour')
    .max(50, 'Duration must be at most 50 hours'),
  level: courseLevelSchema,
  category: courseCategorySchema,
  smallDescription: z
    .string()
    .min(3, 'Small description must be at least 3 characters long')
    .max(500, 'Small description must be at most 100 characters long'),
  slug: z.string().min(1, 'Slug is required'),
  status: courseStatusSchema,
});

export const chapterCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  courseId: z.string().min(1, 'Course ID is required'),
});

export const lessonCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  chapterId: z.string().min(1, 'Chapter ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  videoKey: z.string().optional(),
  thumbnailKey: z.string().optional(),
});

export type CourseCreateSchemaType = z.infer<typeof courseCreateSchema>;
export type ChapterCreateSchemaType = z.infer<typeof chapterCreateSchema>;
export type LessonCreateSchemaType = z.infer<typeof lessonCreateSchema>;
