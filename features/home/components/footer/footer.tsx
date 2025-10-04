import Link from 'next/link';
import { BookOpenText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  return (
    <footer id="footer" className="w-full">
      <Separator />

      <section className="container px-6 py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <BookOpenText />
            EduSphere
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div>
            <Link
              href="https://github.com/edusphere"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-60 hover:opacity-100"
            >
              Github
            </Link>
          </div>

          <div>
            <Link
              href="https://twitter.com/edusphere"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-60 hover:opacity-100"
            >
              Twitter
            </Link>
          </div>

          <div>
            <Link
              href="https://linkedin.com/company/edusphere"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Learning</h3>
          <div>
            <Link href="/courses" className="opacity-60 hover:opacity-100">
              Browse Courses
            </Link>
          </div>

          <div>
            <Link
              href="/learning-paths"
              className="opacity-60 hover:opacity-100"
            >
              Learning Paths
            </Link>
          </div>

          <div>
            <Link href="/certificates" className="opacity-60 hover:opacity-100">
              Certificates
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Support</h3>
          <div>
            <Link href="/help-center" className="opacity-60 hover:opacity-100">
              Help Center
            </Link>
          </div>

          <div>
            <Link href="/contact" className="opacity-60 hover:opacity-100">
              Contact Us
            </Link>
          </div>

          <div>
            <Link href="/faq" className="opacity-60 hover:opacity-100">
              FAQ
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div>
            <Link
              href="https://youtube.com/@edusphere"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-60 hover:opacity-100"
            >
              YouTube
            </Link>
          </div>

          <div>
            <Link
              href="https://discord.gg/edusphere"
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </Link>
          </div>

          <div>
            <Link href="/forums" className="opacity-60 hover:opacity-100">
              Forums
            </Link>
          </div>
        </div>
      </section>

      <section className="container text-center">
        <h3>
          &copy; 2024 EduSphere - Empowering learners worldwide.{' '}
          <Link
            href="/privacy"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Privacy Policy
          </Link>
          {' | '}
          <Link
            href="/terms"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Terms of Service
          </Link>
        </h3>
      </section>
    </footer>
  );
};
