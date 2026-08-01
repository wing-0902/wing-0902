import { createSignal, For } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import ProjCard from './card.tsx';

interface ProjectItem {
  slug: string;
  data: CollectionEntry<'projectsJa'>['data'];
}

interface ProjListProps {
  projects: ProjectItem[];
}

export default function ProjList(props: ProjListProps) {
  const [searchQuery, setSearchQuery] = createSignal('');

  const filteredProjects = () => {
    const query = searchQuery().toLowerCase().trim();
    if (!query) return props.projects;

    // 空文字を除外したキーワードの配列を作成 (例: "astro solid" -> ["astro", "solid"])
    const keywords = query.split(/[\s\u3000]+/).filter(Boolean);
    if (keywords.length === 0) return props.projects;

    return props.projects.filter((proj) => {
      const title = proj.data.title?.toLowerCase() || '';
      const description = proj.data.description?.toLowerCase() || '';

      const targetText = `${title} ${description}`;

      return keywords.every((keyword) => targetText.includes(keyword));
    });
  };

  return (
    <>
      <div class=":uno: mb-6 max-w-md mx-auto px-3">
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class=":uno: w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class=":uno: w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] grid grid-cols-[repeat(auto-fit,minmax(min(calc(50%-16px),250px),1fr))] gap-4 px-3">
        <For
          each={filteredProjects()}
          fallback={
            <p class=":uno: text-center col-span-full text-gray-500">
              プロジェクトが見つかりませんでした．
            </p>
          }
        >
          {(proj) => <ProjCard project={proj} />}
        </For>
      </div>
    </>
  );
}
