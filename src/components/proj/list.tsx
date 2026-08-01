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
  return (
    <>
      <div class=":uno: w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] grid grid-cols-[repeat(auto-fit,minmax(min(calc(50%-16px),250px),1fr))] gap-4 px-3">
        {props.projects.map((proj) => (
          <>
            <ProjCard project={proj} />
          </>
        ))}
      </div>
    </>
  );
}
