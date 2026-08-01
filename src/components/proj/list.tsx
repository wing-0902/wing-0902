import { createSignal, For, Show, onMount, onCleanup } from 'solid-js';
import type { CollectionEntry } from 'astro:content';
import ProjCard from './card.tsx';

import s from './list.module.scss';
// 使っていない不要なインポートは削除するかそのままでもOKです

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
  const [selectedCategories, setSelectedCategories] = createSignal<string[]>([]);
  const [isStackOpen, setIsStackOpen] = createSignal(false);
  const [isCategoryOpen, setIsCategoryOpen] = createSignal(false);

  let stackDropdownRef: HTMLDivElement | undefined;
  let categoryDropdownRef: HTMLDivElement | undefined;

  const allTechList = () => {
    const techSet = new Set<string>();
    props.projects.forEach((proj) => {
      proj.data.techStack?.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  };

  // 【修正1】returnの位置をループの外側に修正
  const allCategoriesList = () => {
    const categorySet = new Set<string>();
    props.projects.forEach((proj) => {
      proj.data.category?.forEach((category) => categorySet.add(category));
    });
    return Array.from(categorySet).sort();
  };

  const toggleTech = (tech: string) => {
    const current = selectedTechs();
    if (current.includes(tech)) {
      setSelectedTechs(current.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...current, tech]);
    }
  };

  const toggleCategory = (category: string) => {
    const current = selectedCategories();
    if (current.includes(category)) {
      setSelectedCategories(current.filter((t) => t !== category));
    } else {
      setSelectedCategories([...current, category]);
    }
  };

  const filteredProjects = () => {
    const query = searchQuery().toLowerCase().trim();
    const keywords = query ? query.split(/[\s\u3000]+/).filter(Boolean) : [];
    const techFilters = selectedTechs();
    const categoryFilters = selectedCategories(); // 【修正2】カテゴリーのフィルターを取得

    return props.projects.filter((proj) => {
      const projTechs = proj.data.techStack || [];
      const projCategories = proj.data.category || []; // プロジェクトのカテゴリーを取得

      // 技術スタックのフィルター
      if (techFilters.length > 0) {
        const matchesAllTechs = techFilters.every((tech) => projTechs.includes(tech));
        if (!matchesAllTechs) return false;
      }

      // 【修正2】カテゴリー（タグ）のフィルターを追加
      if (categoryFilters.length > 0) {
        const matchesAllCategories = categoryFilters.every((cat) => projCategories.includes(cat));
        if (!matchesAllCategories) return false;
      }

      // キーワード検索のフィルター
      if (keywords.length > 0) {
        const title = proj.data.title?.toLowerCase() || '';
        const description = proj.data.description?.toLowerCase() || '';
        const targetText = `${title} ${description}`;

        const matchesQuery = keywords.every((keyword) => targetText.includes(keyword));
        if (!matchesQuery) return false;
      }

      return true;
    });
  };

  // クライアントサイドでのみイベントリスナーを安全に設定
  onMount(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stackDropdownRef && !stackDropdownRef.contains(e.target as Node)) {
        setIsStackOpen(false);
      }
      // 【おまけ】カテゴリー側のドロップダウンの外側クリックでも閉じるようにすると便利です
      if (categoryDropdownRef && !categoryDropdownRef.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    onCleanup(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
  });

  return (
    <>
      <div class={s.searchRoot}>
        {/* キーワード検索バー */}
        <input
          type="text"
          placeholder="検索..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          class={s.textInput}
        />

        {/* ドロップダウンメニュー 技術スタック */}
        <div class={s.dropdownContainer} ref={stackDropdownRef}>
          <button onClick={() => setIsStackOpen(!isStackOpen())} class={s.dropdownButton}>
            <span><i i-material-symbols-light-deployed-code /></span>
          </button>

          <Show when={isStackOpen()}>
            <div class={s.showDropdownRoot}>
              <div>
                <span>選択肢</span>
                <button onClick={() => setSelectedTechs([])}>クリア</button>
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

        {/* ドロップダウンメニュー カテゴリー */}
        <div class={s.dropdownContainer} ref={categoryDropdownRef}>
          {/* JSX内でのクリックハンドラーは大文字 camelCase の onClick に統一するのがおすすめです */}
          <button onClick={() => setIsCategoryOpen(!isCategoryOpen())} class={s.dropdownButton}>
            <span><i i-material-symbols-light-tag /></span>
          </button>

          <Show when={isCategoryOpen()}>
            <div class={s.showDropdownRoot}>
              <div>
                <span>選択肢</span>
                <button onClick={() => setSelectedCategories([])}>クリア</button>
              </div>
              <For each={allCategoriesList()}>
                {(category) => {
                  const isChecked = () => selectedCategories().includes(category);
                  return (
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked()}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
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
