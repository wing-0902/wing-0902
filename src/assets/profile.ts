// src/assets/profile.ts

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
