import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import ProjCard from './card.tsx';

import s from './list.module.scss';

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
  const [isStackOpen, setIsStackOpen] = createSignal(false);

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

  // クライアントサイドでのみイベントリスナーを安全に設定
  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
        setIsStackOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  return (
    <>
      {/* 原則CSS Modulesを使う */}
      <div class={s.searchRoot}>
        {/* キーワード検索バー */}
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class={s.textInput}
        />

        {/* ドロップダウンメニューのコンテナ */}
        <div class={s.dropdownContainer} ref={dropdownRef}>
          <button onClick={() => setIsStackOpen(!isStackOpen())} class={s.dropdownButton}>
            <span>技術スタック</span>
            <span class=":uno: text-xs">▼</span>
          </button>

          <Show when={isStackOpen()}>
            <div class={s.showDropdownRoot}>
              <div>
                <span>選択肢</span>
                <button onClick={() => setSelectedTechs([])}>選択をクリア</button>
              </div>

              <For each={allTechList()}>
                {(tech) => {
                  const isChecked = () => selectedTechs().includes(tech);
                  return (
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked()}
                        onChange={() => toggleTech(tech)}
                      />
                      <span>{tech}</span>
                    </label>
                  );
                }}
              </For>
            </div>
          </Show>
        </div>
      </div>
      {/* 原則CSS Modulesを使う おわり */}

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
