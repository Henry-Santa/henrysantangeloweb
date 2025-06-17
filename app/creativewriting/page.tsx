import RootLayoutWithSidebar from "../components/RootLayoutWithSidebar";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

/**
 * CreativeWritingIndex – Lists all short stories in a clean, responsive grid.
 * Stories are sourced from `public/creativewriting/data.json` so that adding
 * a new entry is as easy as updating the JSON file & dropping a markdown
 * document in the folder.
 */

interface Story {
  title: string;
  date: string;
  Description: string;
  file: string;
}

export default function CreativeWritingIndex() {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data: { Stories: Story[] } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return (
    <RootLayoutWithSidebar>
      <div className="w-full max-w-7xl mx-auto py-12 px-4 animate-fadeIn">
        <h1 className="text-5xl font-extrabold mb-12 text-center text-keppel-600 drop-shadow">Creative Writing</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.Stories.map((story: Story, index: number) => (
            <Link key={index} href={`/creativewriting/${index}`} className="group">
              <div className="bg-white border border-onyx-400 rounded-2xl shadow-md p-4 flex flex-col gap-3 transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <h2 className="text-lg font-bold text-onyx-700 group-hover:underline leading-tight font-serif line-clamp-2">
                  {story.title}
                </h2>
                <p className="text-onyx-600 italic mb-1 text-xs">{story.date}</p>
                <p className="text-onyx-700 font-serif leading-relaxed text-sm line-clamp-3">
                  {story.Description}
                </p>
                <span className="mt-2 text-keppel-700 font-medium group-hover:underline text-sm">
                  Read Story →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </RootLayoutWithSidebar>
  );
}