import RootLayoutWithSidebar from "../../components/RootLayoutWithSidebar";
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import type { Metadata } from 'next';

/**
 * Story interface mirrors the JSON schema used in `public/creativewriting/data.json`.
 */
interface Story {
  title: string;
  date: string;
  Description: string;
  file: string;
}

// Using loose typing here because Next.js 15 wraps `params` in a Promise during
// the type-checking phase (see https://github.com/vercel/next.js/discussions/71997).
// Narrowing it causes a constraint mismatch, so we intentionally relax it and
// silence the explicit-any rule.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { params: any };

export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data: { Stories: Story[] } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return data.Stories.map((_: unknown, index: number) => ({ id: index.toString() }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data: { Stories: Story[] } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const { id } = await params;
  const storyIndex = parseInt(id, 10);
  const story = data.Stories[storyIndex];

  if (!story) {
    return { title: 'Story Not Found' };
  }

  return { title: story.title };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CreativeWritingPage({ params }: Props) {
  const { id } = await params;
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data: { Stories: Story[] } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const storyIndex = parseInt(id, 10);
  const story = data.Stories[storyIndex];

  if (!story) {
    return (
      <RootLayoutWithSidebar>
        <div className="w-full max-w-2xl mx-auto mt-16 bg-white/95 border border-onyx-400 rounded-xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Story not found</h1>
          <Link href="/creativewriting" className="inline-flex items-center gap-2 text-blue-800 hover:underline mt-4">
            <FaArrowLeft /> Back to Creative Writing
          </Link>
        </div>
      </RootLayoutWithSidebar>
    );
  }

  const markdownPath = path.join(process.cwd(), 'public', 'creativewriting', story.file);
  const markdownContent = fs.readFileSync(markdownPath, 'utf-8');

  return (
    <RootLayoutWithSidebar>
      <div className="w-full max-w-6xl mx-auto mt-12 bg-white/95 backdrop-blur-md border border-onyx-400 rounded-2xl shadow-2xl p-6 md:p-12 lg:p-16 relative animate-fadeIn">
        <Link href="/creativewriting" className="absolute -top-8 left-0 flex items-center gap-2 text-blue-800 hover:underline">
          <FaArrowLeft /> Back
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-keppel-700 font-serif leading-tight text-center">
          {story.title}
        </h1>
        <p className="text-onyx-600 italic mb-10 text-sm text-center">{story.date}</p>
        <article className="prose prose-xl max-w-none prose-p:font-serif prose-p:text-justify prose-p:my-8 prose-p:text-gray-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
        </article>
      </div>
    </RootLayoutWithSidebar>
  );
}