# EduSphere Ape LMS

A modern, full-featured Learning Management System (LMS) built with Next.js 15, featuring course management, secure payments, and a dual-interface dashboard system for administrators and students.

## 🌐 Live Demo

**[View Live Demo →](https://edusphere-ape-lms.vercel.app/)**

Deployed on Vercel with NeonDB (Serverless Postgres)

## Repository Info
This is the public release of a project originally developed in a private repository. The commit messages and development history from the private repository are not preserved in this public version.

## ✨ Current Features

### 🎓 For Students
- Browse and purchase courses via Stripe integration
- Access purchased courses in a dedicated student dashboard
- Track course progress and learning journey
- View course content organized into chapters and lessons

### 👨‍💼 For Administrators
- Complete course management (Create, Read, Update, Delete)
- Chapter management within courses
- Lesson management with rich content editing
- Separate admin dashboard for content management
- Full control over course structure and organization

## 🚀 Tech Stack & Why

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - Chosen for its:
   - App Router with React Server Components for optimal performance
   - Built-in API routes for backend functionality
   - Server-side rendering (SSR) and static site generation (SSG)
   - Turbopack for faster development builds (`--turbopack` flag)
   - File-based routing for intuitive project structure

- **[TypeScript](https://www.typescriptlang.org/)** - For type safety, better developer experience, and catching errors at compile time

- **[React 19](https://react.dev/)** - Latest React features with improved performance and concurrent rendering

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework for:
   - Rapid UI development
   - Consistent design system
   - PostCSS integration for custom styling
   - Built-in responsive design

- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, customizable components built on:
   - **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
   - Full control over component styling
   - No runtime overhead (components copied to your project)

- **[Lucide Icons](https://lucide.dev/)** & **[Tabler Icons](https://tabler-icons.io/)** - Beautiful, consistent icon sets
- **[tw-animate-css](https://www.npmjs.com/package/tw-animate-css)** - Tailwind CSS animations
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typography defaults for rich content

### Database & ORM
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM chosen for:
   - Type-safe database queries
   - Auto-generated TypeScript types
   - Easy database migrations
   - Excellent PostgreSQL support
   - Intuitive schema definition
   - Built-in connection pooling
   - Works seamlessly with serverless databases

- **PostgreSQL** - Robust, feature-rich relational database
   - **Local Development**: Self-hosted PostgreSQL
   - **Production**: [NeonDB](https://neon.tech/) - Serverless Postgres with:
      - Automatic scaling and branching
      - Built-in connection pooling
      - Generous free tier
      - Zero cold starts
      - Perfect for Vercel deployments

### Authentication & Security
- **[better-auth](https://better-auth.com/)** - Modern, type-safe authentication library chosen for:
   - Full TypeScript support with end-to-end type safety
   - Framework-agnostic core with excellent Next.js integration
   - Built-in session management with secure cookies
   - Flexible authentication methods (email/password, OAuth, magic links)
   - Customizable user schema that works seamlessly with Prisma
   - No vendor lock-in - you own your user data
   - Simple API with powerful customization options
   - Built-in CSRF protection and security best practices

- **[Arcjet](https://arcjet.com/)** - Security platform providing:
   - Rate limiting to prevent abuse (`@arcjet/next`)
   - Bot protection and IP intelligence (`@arcjet/ip`)
   - Request inspection and monitoring (`@arcjet/inspect`)
   - Protects authentication endpoints and API routes

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form library with:
   - Minimal re-renders
   - Easy integration with UI components
   - Built-in validation support

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation:
   - Runtime type checking
   - Integrates seamlessly with React Hook Form via `@hookform/resolvers`
   - Type inference for end-to-end type safety

### Rich Text Editing
- **[TipTap](https://tiptap.dev/)** - Headless editor framework built on ProseMirror:
   - `@tiptap/react` - React integration
   - `@tiptap/starter-kit` - Essential editing features
   - `@tiptap/extension-highlight` - Text highlighting
   - `@tiptap/extension-text-align` - Text alignment controls
   - `@tiptap/html` - HTML rendering
   - Full control over editor appearance and functionality
   - Perfect for creating and editing course content

### Drag & Drop
- **[@dnd-kit](https://dndkit.com/)** - Modern drag-and-drop toolkit:
   - Accessible by default
   - Performant and flexible
   - Modular architecture with core, sortable, and utilities packages
   - Used for reordering chapters and lessons

### Data Tables
- **[TanStack Table](https://tanstack.com/table/v8)** - Headless table library:
   - Framework-agnostic core
   - Full control over table markup and styling
   - Built-in sorting, filtering, and pagination
   - Perfect for displaying course and user data

### Charts & Analytics
- **[Recharts](https://recharts.org/)** - Composable charting library:
   - Built with React components
   - Responsive charts
   - Wide variety of chart types
   - Used for course analytics and progress tracking

### File Storage
- **[AWS SDK](https://aws.amazon.com/sdk-for-javascript/)** with **[Tigris.dev](https://www.tigrisdata.com/)**:
   - `@aws-sdk/client-s3` - S3-compatible object storage
   - `@aws-sdk/s3-request-presigner` - Generate presigned URLs for secure uploads
   - **Tigris.dev** - S3-compatible storage with better pricing and performance
   - Global edge caching for faster file delivery

  **Important Note**: If using other AWS S3 providers, update the URL construction in `lib/construct-url.ts`:
  ```typescript
  export const constructUrl = (path: string) => {
    return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${path}`;
  };
  ```
  Change `.t3.storage.dev` to your provider's domain (e.g., `.s3.amazonaws.com` for AWS S3).

### Payment Processing
- **[Stripe](https://stripe.com/)** - Complete payment platform:
   - Secure payment processing
   - Webhook support for real-time events
   - Subscription management capabilities
   - PCI-compliant by design

### Email
- **[Resend](https://resend.com/)** - Modern email API:
   - Developer-friendly API
   - High deliverability rates
   - Beautiful email templates
   - React email support

### Additional Utilities
- **[@t3-oss/env-nextjs](https://env.t3.gg/)** - Type-safe environment variables with runtime validation
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[sonner](https://sonner.emilkowal.ski/)** - Beautiful toast notifications
- **[canvas-confetti](https://www.kirilv.com/canvas-confetti/)** - Celebration effects (e.g., course completion)
- **[vaul](https://vaul.emilkowal.ski/)** - Drawer component for mobile-friendly UI
- **[slugify](https://github.com/simov/slugify)** - URL-friendly slug generation
- **[uuid](https://github.com/uuidjs/uuid)** - Unique identifier generation
- **[html-react-parser](https://github.com/remarkablemark/html-react-parser)** - Convert HTML to React elements
- **[react-dropzone](https://react-dropzone.js.org/)** - Drag-and-drop file uploads
- **[react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook)** - Keyboard shortcuts
- **[input-otp](https://input-otp.rodz.dev/)** - OTP/verification code input
- **[lodash.throttle](https://lodash.com/)** - Throttle function calls for performance

## 🛠️ Development Setup

### Prerequisites
- **Node.js 20+** (for Next.js 15 compatibility)
- **pnpm** (package manager)
- **PostgreSQL** database (local) or **NeonDB** account (serverless)
- **Tigris.dev account** (or other S3-compatible storage)
- **Stripe account** (for payment processing)
- **Resend API key** (for transactional emails)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/khidash8/edu-sphere-lms.git
   cd edu-sphere-lms
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```
   The `postinstall` script will automatically run `prisma generate`.

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   See the [Environment Variables](#-environment-variables) section below for required values.

4. **Set up the database**:
   ```bash
   npx prisma db push
   ```
   This creates the database schema. For production, use migrations:
   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Scripts

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production with Turbopack
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type             # Type-check with TypeScript
pnpm prisma-studio    # Open Prisma Studio (database GUI)
```

## 🏗️ Project Structure

```
jan-marshal-yt-lms/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes (login, register)
│   ├── dashboard/           # Admin dashboard (course management)
│   ├── student-dashboard/   # Student dashboard (purchased courses)
│   ├── api/                 # API routes (Stripe webhooks, etc.)
│   └── layout.tsx           # Root layout with providers
├── components/              # Reusable React components
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Custom components
├── features/                # Feature-based modules
│   ├── courses/             # Course-related components
│   ├── auth/                # Authentication components
│   └── ...                  # Other feature modules
├── lib/                     # Utility functions and configurations
│   ├── auth.ts              # better-auth configuration
│   ├── prisma.ts            # Prisma client
│   ├── stripe.ts            # Stripe configuration
│   ├── s3.ts                # S3 utilities (Tigris)
│   └── env.ts               # Environment variable validation
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 📝 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
# Local PostgreSQL:
DATABASE_URL="postgresql://user:password@localhost:5432/janmarshal_lms"
# OR NeonDB (Serverless):
# DATABASE_URL="postgresql://user:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require"

# Authentication (better-auth)
BETTER_AUTH_SECRET="your-secret-key-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"  # Change to your production URL

# AWS S3 (Tigris.dev)
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your-bucket-name"
AWS_ACCESS_KEY_ID="your-tigris-access-key"
AWS_SECRET_ACCESS_KEY="your-tigris-secret-key"
AWS_REGION="auto"  # Tigris uses 'auto'
AWS_ENDPOINT_URL="https://fly.storage.tigris.dev"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # From Stripe CLI or Dashboard

# Resend
RESEND_API_KEY="re_..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Arcjet (Rate Limiting & Security)
ARCJET_KEY="your-arcjet-key"
```

### Environment Variable Validation

This project uses `@t3-oss/env-nextjs` for type-safe environment variables. The validation schema is defined in `lib/env.ts`. If any required variable is missing or invalid, the app will fail at build time with a clear error message.

## 🚀 Deployment

### Building for Production

```bash
pnpm build
pnpm start
```

### Recommended Platforms

1. **[Vercel](https://vercel.com/)** (✅ Currently Used)
   - Zero-config deployment for Next.js
   - Automatic HTTPS and CDN
   - Built-in analytics
   - Connect your GitHub repository for automatic deployments
   - Perfect integration with NeonDB
   - **Live Demo**: [edusphere-ape-lms.vercel.app](https://edusphere-ape-lms.vercel.app/)

2. **[NeonDB](https://neon.tech/)** (✅ Currently Used for Database)
   - Serverless PostgreSQL
   - Automatic scaling and connection pooling
   - Database branching for preview deployments
   - Generous free tier (0.5 GB storage, 191 compute hours/month)
   - Zero cold starts
   - Perfect for Vercel deployments

3. **[Railway](https://railway.app/)**
   - Easy PostgreSQL setup
   - Environment variable management
   - One-click deployments

4. **[AWS](https://aws.amazon.com/)** / **[DigitalOcean](https://www.digitalocean.com/)**
   - Full control over infrastructure
   - Requires manual server setup

### Deployment Checklist

- [ ] Set all environment variables in your hosting platform
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] **For NeonDB**: Create a new database and copy the connection string
- [ ] **For Vercel**:
   - Connect your GitHub repository
   - Add environment variables in project settings
   - Enable automatic deployments
- [ ] Configure Stripe webhooks with your production URL
- [ ] Set up Tigris.dev bucket with proper CORS settings
- [ ] Configure Resend domain for email delivery
- [ ] Test payment flow in Stripe test mode before going live
- [ ] Update `BETTER_AUTH_URL` to your production domain

## 🔧 Configuration Notes

### NeonDB Setup (Production Database)

1. Create an account at [Neon.tech](https://neon.tech/)
2. Create a new project and database
3. Copy the connection string from the dashboard
4. Add to your `.env` or Vercel environment variables:
   ```
   DATABASE_URL="postgresql://user:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

**NeonDB Benefits for this Project**:
- Serverless architecture matches Vercel's serverless functions
- Built-in connection pooling (no need for PgBouncer)
- Database branching for preview deployments
- Automatic scaling based on usage
- No server management required

### Tigris.dev Setup

1. Create an account at [Tigris.dev](https://www.tigrisdata.com/)
2. Create a new bucket for images
3. Get your access credentials
4. Update `lib/construct-url.ts` if needed:
   ```typescript
   export const constructUrl = (path: string) => {
     return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${path}`;
   };
   ```

### Stripe Webhooks

For local development, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

For production, add your webhook endpoint in the Stripe Dashboard:
```
https://yourdomain.com/api/webhooks/stripe
```

Select these events:
- `checkout.session.completed`
- `payment_intent.succeeded`
- (Add others as needed)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (enforced by ESLint and Prettier)
- Write meaningful commit messages
- Update documentation for new features
- Test your changes thoroughly
- Run `pnpm lint` and `pnpm type` before committing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - For the amazing framework
- **[shadcn](https://twitter.com/shadcn)** - For the beautiful component library
- **[Prisma](https://www.prisma.io/)** - For the excellent ORM
- **[Vercel](https://vercel.com/)** - For Next.js and hosting solutions
- **[Tigris.dev](https://www.tigrisdata.com/)** - For cost-effective S3-compatible storage

## 📚 Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [NeonDB Documentation](https://neon.tech/docs/introduction)
- [Vercel Documentation](https://vercel.com/docs)
- [better-auth Documentation](https://better-auth.com/docs)
- [TipTap Documentation](https://tiptap.dev/docs/editor/introduction)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tigris.dev Documentation](https://www.tigrisdata.com/docs/)

## 🐛 Troubleshooting

### Common Issues

**Build fails with environment variable errors**
- Ensure all required variables are set in `.env`
- Check `lib/env.ts` for the complete list of required variables

**Database connection errors**
- Verify your `DATABASE_URL` is correct
- For **NeonDB**: Ensure `?sslmode=require` is appended to the connection string
- For **local PostgreSQL**: Ensure PostgreSQL is running
- Run `npx prisma db push` to sync the schema
- Check Neon dashboard for connection pooling settings

**Stripe webhook not working**
- Check that webhook secret is correct
- Verify endpoint URL in Stripe Dashboard
- Use Stripe CLI for local testing

**File uploads failing**
- Confirm Tigris credentials are correct
- Check bucket permissions and CORS settings
- Verify the `constructUrl` function matches your provider

## 📧 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/khidash8/edu-sphere-lms/issues)
- Check existing issues for solutions
- Review documentation links above

---

**Built with ❤️ using Next.js 15 and modern web technologies**
