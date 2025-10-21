import Link from 'next/link';
import RootLayoutWithSidebar from './components/RootLayoutWithSidebar';
import fs from 'fs';
import path from 'path';

interface Story {
  title: string;
  date: string;
  Description: string;
  file: string;
}

interface Repo {
  author: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  html_url?: string;
}

/**
 * HomePage (Server Component)
 * ---------------------------
 * Fetches the latest creative-writing entries (first 3) and the six most
 * recently updated GitHub repositories for the user `henry-santa`, then
 * displays them in an engaging dashboard-style layout.
 */

export default async function HomePage() {
  // 1) Load story previews (build-time read).
  const dataPath = path.join(process.cwd(), 'public', 'creativewriting', 'data.json');
  const { Stories }: { Stories: Story[] } = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const latestStories = Stories.slice(0, 3);

  // Fetch pinned repositories (revalidate every hour).
  const repoRes = await fetch('https://pinned.berrysauce.dev/get/henry-santa', {
    next: { revalidate: 3600 }
  });
  let repos: Repo[] = [];
  if (repoRes.ok) {
    const all = (await repoRes.json()) as Repo[];
    repos = all.slice(0,3).map(r => ({ ...r, html_url: `https://github.com/${r.author}/${r.name}` }));
  }

  return (
    <RootLayoutWithSidebar>
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto animate-fadeIn mb-20 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-keppel-600 mb-4">Welcome 👋</h1>
        <p className="text-lg md:text-xl text-onyx-700 font-medium mb-8">
          I&rsquo;m Henry, a storyteller and developer. Below I have some of my stories and some of my coding projects.
        </p>
      </section>

      {/* Latest Stories */}
      <section className="mb-24 w-full max-w-7xl mx-auto px-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Latest Stories</h2>
          <Link href="/creativewriting" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {latestStories.map((story, idx) => (
            <Link key={idx} href={`/creativewriting/${idx}`} className="group">
              <div className="bg-white border border-onyx-400 rounded-2xl shadow-md p-6 flex flex-col gap-2 transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <h3 className="text-lg font-semibold text-onyx-700 mb-1 group-hover:underline leading-tight font-serif line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-onyx-600 italic mb-2 text-xs">{story.date}</p>
                <p className="text-onyx-700 font-serif leading-relaxed text-sm line-clamp-3">
                  {story.Description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      { /* KUMO HACKATHON PAGE */}
      <section className="mb-24 w-full max-w-7xl mx-auto px-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Kumo Hackathon: College Matcher</h2>
          <Link href="https://github.com/Henry-Santa/hackathon_kumo" target="_blank" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View Code
          </Link>
        </div>
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-onyx-400 shadow-md bg-black">
            <iframe
              src="https://drive.google.com/file/d/1j7PChPqkmek5jQDhUcFfj1jiZMcxm9Xq/preview"
              className="w-full h-full"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-onyx-700">
              Demo video and source for my Kumo Hackathon submission, a college matching app with a FastAPI backend and React frontend!
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://drive.google.com/file/d/1j7PChPqkmek5jQDhUcFfj1jiZMcxm9Xq/view?usp=sharing"
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Open Video
              </Link>
              <Link
                href="https://github.com/Henry-Santa/hackathon_kumo"
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg border border-onyx-400 hover:bg-white/60"
              >
                GitHub Repository
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Repositories */}
      <section className="mb-20 w-full max-w-7xl mx-auto px-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">Recent Code</h2>
          <Link href="https://github.com/henry-santa" target="_blank" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View GitHub
          </Link>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.html_url}
              href={repo.html_url}
              target="_blank"
              className="block bg-white border border-onyx-400 rounded-2xl shadow-md p-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl w-full"
            >
              <h3 className="text-lg font-semibold text-keppel-700 mb-1 line-clamp-1">{repo.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3 min-h-[48px]">
                {repo.description ?? 'No description'}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  <span>{repo.language ?? 'N/A'}</span>
                </div>
                <span>★ {repo.stars}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </RootLayoutWithSidebar>
  );
}
