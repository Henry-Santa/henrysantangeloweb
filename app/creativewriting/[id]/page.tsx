import RootLayoutWithSidebar from "../../../components/RootLayoutWithSidebar";
import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return data.Stories.map((_: unknown, index: number) => ({ id: index.toString() }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const storyIndex = parseInt(params.id, 10);
  const story = data.Stories[storyIndex];

  if (!story) {
    return { title: 'Story Not Found' };
  }

  return { title: story.title };
}

export default function CreativeWritingPage({ params }: { params: { id: string } }) {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const storyIndex = parseInt(params.id, 10);
  const story = data.Stories[storyIndex];

  if (!story) {
    return (
      <RootLayoutWithSidebar>
        <div className="w-full max-w-2xl mx-auto mt-16 bg-white/95 border border-blue-100 rounded-xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Story not found</h1>
          <Link href="/creativewriting" className="inline-flex items-center gap-2 text-blue-500 hover:underline mt-4">
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
      <div className="w-full max-w-2xl mx-auto mt-12 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl shadow-md p-8 relative">
        <Link href="/creativewriting" className="absolute -top-8 left-0 flex items-center gap-2 text-blue-500 hover:underline">
          <FaArrowLeft /> Back
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-blue-800 font-serif">{story.title}</h1>
        <p className="text-gray-500 italic mb-6 text-sm">{story.date}</p>
        <article className="prose prose-lg max-w-none prose-p:font-serif prose-p:text-justify prose-p:my-6 prose-p:text-gray-800">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdownContent}</ReactMarkdown>
        </article>
      </div>
    </RootLayoutWithSidebar>
  );
}