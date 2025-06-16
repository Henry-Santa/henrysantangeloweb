import RootLayoutWithSidebar from "../components/RootLayoutWithSidebar";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function CreativeWritingIndex() {
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  return (
    <RootLayoutWithSidebar>
      <div className="w-full max-w-3xl mx-auto py-8 px-2">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 drop-shadow">Creative Writing</h1>
        <div className="flex flex-col gap-6">
          {data.Stories.map((story, index) => (
            <Link key={index} href={`/creativewriting/${index}`} className="group">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl shadow-md p-6 flex flex-col gap-1 hover:scale-[1.01] hover:shadow-lg transition-all cursor-pointer">
                <h2 className="text-xl font-bold text-blue-800 mb-1 group-hover:underline leading-tight font-serif">{story.title}</h2>
                <p className="text-gray-500 italic mb-1 text-sm">{story.date}</p>
                <p className="text-gray-700 font-serif leading-relaxed text-base line-clamp-3">{story.Description}</p>
                <span className="mt-2 text-blue-600 font-medium group-hover:underline text-sm">Read Story →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </RootLayoutWithSidebar>
  );
}