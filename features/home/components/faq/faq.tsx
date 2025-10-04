import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: 'How do I get started with courses?',
    answer:
      'Simply create your free account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately with our intuitive platform.',
    value: 'item-1',
  },
  {
    question: 'Are the certificates recognized by employers?',
    answer:
      "Yes! Our certificates are industry-recognized and designed in partnership with leading companies. They demonstrate practical skills and knowledge that employers value in today's job market.",
    value: 'item-2',
  },
  {
    question:
      'Can I access courses offline or do I need constant internet connection?',
    answer:
      'With our Pro and Enterprise plans, you can download course materials and videos for offline viewing. The Basic plan requires an internet connection to access content.',
    value: 'item-3',
  },
  {
    question: "What if I'm not satisfied with a course?",
    answer:
      "We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied with your learning experience, we'll provide a full refund, no questions asked.",
    value: 'item-4',
  },
  {
    question: 'Do you provide career support and job placement assistance?',
    answer:
      'Absolutely! Our Pro and Enterprise plans include career guidance sessions, resume reviews, interview preparation, and access to our job placement network with partner companies.',
    value: 'item-5',
  },
  {
    question: 'How long do I have access to course materials?',
    answer:
      'Once you enroll in a course, you have lifetime access to all course materials, including future updates. You can learn at your own pace and revisit content whenever you need to.',
    value: 'item-6',
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{' '}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{' '}
        <Link
          rel="noreferrer noopener"
          href="#contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact our support team
        </Link>
      </h3>
    </section>
  );
};
