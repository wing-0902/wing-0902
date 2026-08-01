import s from '~/assets/proj-card.module.scss';

import type { CollectionEntry } from 'astro:content';

interface ProjCardProps {
  project: {
    slug: string;
    data: CollectionEntry<'projectsJa'>['data'];
  };
}

function ProjCard(props: ProjCardProps) {
  const { slug, data } = props.project;

  return (
    <>
      <div class={s.cardRoot} w-full h-110>
        <a class={s.mainLink}>
          <div h-60></div>
          <div class={s.content} px-2 py-1>
            <h3 class={s.title} m-0>
              {data.title}
            </h3>
            <p m-0>{data.description}</p>

            <ul class={s.stack} gap-3 m-0 p-0>
              {data.techStack.map((tech) => (
                <li>{tech}</li>
              ))}
            </ul>
          </div>
        </a>
        <div class={s.links} gap-3 justify-center>
          {data.appUrl && (
            <a href={data.appUrl} target="_blank">
              <i i-material-symbols-light-open-in-new />
              App
            </a>
          )}
          {data.codeUrl && (
            <a href={data.codeUrl} target="_blank">
              <i i-hugeicons-github />
              GitHub
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjCard;
