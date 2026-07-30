<!--
**wing-0902/wing-0902** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->

# Wing

## Who am I?

I'm a Japanese high school student, living in Osaka.

I'm interested in photograph, economics, and programming.

## `me.introduce`

```ts
class Engineer {
  name: string;
  role: string;
  skills: string[];
  hobbies: string[];

  constructor(name: string, role: string, skills: string[], hobbies: string[]) {
    this.name = name;
    this.role = role;
    this.skills = skills;
    this.hobbies = hobbies;
  }

  introduce(): void {
    console.log(`Hello! This is ${this.name}.`);
    console.log(`I'm usually ${this.role}`);
    console.log(`I can use the following stacks: ${this.skills.join(', ')}`);
    console.log(`My hobby is: ${this.hobbies.join(', ')}`);
  }
}

// express myself
const me = new Engineer(
  'Wing',
  'student',
  ['TypeScript', 'Svelte', 'SvelteKit', 'Vue', 'Nuxt', 'Astro'],
  ['Web Development', 'Photography', 'Cat', 'Trip']
);

me.introduce();

/* I haven't written such a complex code ever! */
```
