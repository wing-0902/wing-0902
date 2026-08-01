import s from './card.module.scss';

import { For } from 'solid-js';

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
      <div class={s.cardRoot}>
        <a class={s.mainLink}>
          <div class={s.imgSlot}></div>
          <div class={s.content}>
            <h3 class={s.title}>
              {data.title}
              <small class={s.category}>{data.category.join(', ')}</small>
            </h3>
            <p m-0>{data.description}</p>

            <ul class={s.stack}>
              {data.techStack.map((tech) => (
                <li>{tech}</li>
              ))}
            </ul>
          </div>
        </a>
        <div class={s.links}>
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
