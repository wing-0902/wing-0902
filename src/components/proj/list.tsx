import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
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
  const [selectedTechs, setSelectedTechs] = createSignal<string[]>([]);
  const [isOpen, setIsOpen] = createSignal(false);

  let dropdownRef: HTMLDivElement | undefined;

  const allTechList = () => {
    const techSet = new Set<string>();
    props.projects.forEach((proj) => {
      proj.data.techStack?.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  };

  const toggleTech = (tech: string) => {
    const current = selectedTechs();
    if (current.includes(tech)) {
      setSelectedTechs(current.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...current, tech]);
    }
  };

  const filteredProjects = () => {
    const query = searchQuery().toLowerCase().trim();
    const keywords = query ? query.split(/[\s\u3000]+/).filter(Boolean) : [];
    const techFilters = selectedTechs();

    return props.projects.filter((proj) => {
      const projTechs = proj.data.techStack || [];

      if (techFilters.length > 0) {
        const matchesAllTechs = techFilters.every((tech) => projTechs.includes(tech));
        if (!matchesAllTechs) return false;
      }

      if (keywords.length > 0) {
        const title = proj.data.title?.toLowerCase() || '';
        const description = proj.data.description?.toLowerCase() || '';
        const techStackStr = projTechs.join(' ').toLowerCase();
        const targetText = `${title} ${description} ${techStackStr}`;

        const matchesQuery = keywords.every((keyword) => targetText.includes(keyword));
        if (!matchesQuery) return false;
      }

      return true;
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <>
      <div class=":uno: mb-6 max-w-2xl mx-auto px-3 flex flex-col gap-4">
        {/* キーワード検索バー */}
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class=":uno: w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* ドロップダウンメニューのコンテナ */}
        <div class=":uno: relative" ref={dropdownRef}>
          {/* メニューを開閉するトリガーボタン */}
          <button
            onClick={() => setIsOpen(!isOpen())}
            class=":uno: w-full sm:w-auto px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span>
              技術スタックで絞り込み
              {selectedTechs().length > 0 && ` (${selectedTechs().length}選択中)`}
            </span>
            <span class=":uno: text-xs">▼</span>
          </button>

          {/* ドロップダウンの中身 */}
          <Show when={isOpen()}>
            <div class=":uno: absolute z-10 mt-2 w-full sm:w-72 max-h-60 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-2 flex flex-col gap-1">
              {/* すべてクリアするボタン */}
              <div class=":uno: flex justify-between items-center px-2 py-1 border-b border-gray-200 dark:border-gray-700 mb-1 text-xs">
                <span class=":uno: text-gray-500">選択肢</span>
                <button
                  onClick={() => setSelectedTechs([])}
                  class=":uno: text-blue-600 dark:text-blue-400 hover:underline"
                >
                  選択をクリア
                </button>
              </div>

              {/* チェックボックス付きのタグ一覧 */}
              <For each={allTechList()}>
                {(tech) => {
                  const isChecked = () => selectedTechs().includes(tech);
                  return (
                    <label class=":uno: flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-200">
                      <input
                        type="checkbox"
                        checked={isChecked()}
                        onChange={() => toggleTech(tech)}
                        class=":uno: rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span class=":uno: flex-1 truncate">{tech}</span>
                    </label>
                  );
                }}
              </For>
            </div>
          </Show>
        </div>
      </div>

      <div class=":uno: w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] grid grid-cols-[repeat(auto-fit,minmax(min(calc(50%-16px),250px),1fr))] gap-4 px-3">
        <For
          each={filteredProjects()}
          fallback={
            <p class=":uno: text-center col-span-full text-gray-500">
              プロジェクトが見つかりませんでした。
            </p>
          }
        >
          {(proj) => <ProjCard project={proj} />}
        </For>
      </div>
    </>
  );
}
