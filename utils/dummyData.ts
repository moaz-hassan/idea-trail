export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readingTime: number;
  tags: string[];
  category: string;
  featuredImage: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', postCount: 5 },
  { id: '2', name: 'Design', slug: 'design', postCount: 3 },
  { id: '3', name: 'Development', slug: 'development', postCount: 4 },
  { id: '4', name: 'Tutorial', slug: 'tutorial', postCount: 6 },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    slug: 'future-of-web-development-2024',
    content: `# The Future of Web Development in 2024

Web development continues to evolve at a rapid pace. As we move through 2024, several key trends are shaping the landscape:

## 1. Server-Side Rendering Renaissance

Server-side rendering (SSR) is making a strong comeback with frameworks like Next.js, Nuxt.js, and SvelteKit leading the charge. The benefits are clear:

- Improved SEO performance
- Faster initial page loads
- Better user experience on slower devices

## 2. Edge Computing Integration

Edge computing is becoming more accessible to web developers. Services like Cloudflare Workers and Vercel Edge Functions allow us to run code closer to users.

## 3. AI-Powered Development Tools

AI tools are revolutionizing how we write code:

- GitHub Copilot for code completion
- ChatGPT for problem-solving
- AI-powered design tools

## Conclusion

The future of web development is bright, with new technologies making development faster and more accessible than ever before.`,
    excerpt: 'Exploring the latest trends and technologies shaping web development in 2024, from server-side rendering to AI-powered tools.',
    author: 'Moaz Hassan',
    publishDate: '2024-01-15',
    readingTime: 8,
    tags: ['web development', 'technology', 'trends'],
    category: 'Technology',
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    featured: true,
  },
  {
    id: '2',
    title: 'Mastering React Hooks: A Complete Guide',
    slug: 'mastering-react-hooks-guide',
    content: `# Mastering React Hooks: A Complete Guide

React Hooks revolutionized how we write React components. Let's dive deep into the most important hooks and how to use them effectively.

## useState Hook

The useState hook is the foundation of state management in functional components:

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook

useEffect handles side effects in your components:

\`\`\`javascript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Custom Hooks

Creating custom hooks allows you to reuse stateful logic:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  
  return { count, increment, decrement };
}
\`\`\`

## Best Practices

1. Always use the dependency array in useEffect
2. Extract complex logic into custom hooks
3. Use useCallback and useMemo for performance optimization

Hooks make React development more intuitive and powerful!`,
    excerpt: 'A comprehensive guide to React Hooks, covering useState, useEffect, custom hooks, and best practices for modern React development.',
    author: 'Mike Chen',
    publishDate: '2024-01-12',
    readingTime: 12,
    tags: ['react', 'hooks', 'javascript', 'tutorial'],
    category: 'Development',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    featured: true,
  },
  {
    id: '3',
    title: 'Design Systems: Building Consistent UIs',
    slug: 'design-systems-consistent-uis',
    content: `# Design Systems: Building Consistent UIs

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build applications.

## Why Design Systems Matter

Design systems provide:

- **Consistency** across products and teams
- **Efficiency** in design and development
- **Scalability** for growing organizations
- **Maintainability** of design decisions

## Key Components

### 1. Design Tokens
Design tokens are the visual design atoms of the design system:

- Colors
- Typography
- Spacing
- Shadows
- Border radius

### 2. Component Library
Reusable UI components:

- Buttons
- Form inputs
- Cards
- Navigation elements

### 3. Documentation
Clear guidelines on:

- When to use components
- How to implement them
- Design principles

## Popular Design Systems

- **Material Design** by Google
- **Ant Design** for React
- **Chakra UI** for modern React apps
- **Tailwind CSS** utility-first approach

## Building Your Own

Start small and grow organically:

1. Define core design tokens
2. Build basic components
3. Document usage patterns
4. Iterate based on team feedback

Design systems are investments that pay dividends in the long term!`,
    excerpt: 'Learn how to build and maintain design systems that create consistent, scalable user interfaces across your applications.',
    author: 'Emily Rodriguez',
    publishDate: '2024-01-10',
    readingTime: 10,
    tags: ['design', 'ui/ux', 'components'],
    category: 'Design',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    featured: false,
  },
  {
    id: '4',
    title: 'Getting Started with TypeScript',
    slug: 'getting-started-typescript',
    content: `# Getting Started with TypeScript

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to JavaScript.

## Why TypeScript?

### Benefits
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring, navigation
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confidence when changing code

## Basic Types

\`\`\`typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Objects
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe"
};
\`\`\`

## Functions

\`\`\`typescript
// Function with typed parameters and return type
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const add = (a: number, b: number): number => a + b;
\`\`\`

## Generics

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");
\`\`\`

## Getting Started

1. Install TypeScript: \`npm install -g typescript\`
2. Create a \`.ts\` file
3. Compile with \`tsc filename.ts\`
4. Run the generated JavaScript

TypeScript makes JavaScript development more reliable and maintainable!`,
    excerpt: 'A beginner-friendly introduction to TypeScript, covering basic types, functions, and how to get started with type-safe JavaScript development.',
    author: 'David Kim',
    publishDate: '2024-01-08',
    readingTime: 7,
    tags: ['typescript', 'javascript', 'tutorial'],
    category: 'Development',
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    featured: false,
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: When to Use What',
    slug: 'css-grid-vs-flexbox',
    content: `# CSS Grid vs Flexbox: When to Use What

Both CSS Grid and Flexbox are powerful layout systems, but they excel in different scenarios. Understanding when to use each is crucial for modern web development.

## Flexbox: The One-Dimensional Layout Master

Flexbox excels at:

### Strengths
- **One-dimensional layouts** (row or column)
- **Content-based sizing**
- **Space distribution**
- **Alignment control**

### Perfect for:
- Navigation bars
- Button groups
- Centering content
- Form layouts

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 1rem;
}
\`\`\`

## CSS Grid: The Two-Dimensional Layout Powerhouse

CSS Grid excels at:

### Strengths
- **Two-dimensional layouts** (rows and columns)
- **Grid-based designs**
- **Complex layouts**
- **Precise positioning**

### Perfect for:
- Page layouts
- Card grids
- Complex forms
- Magazine-style layouts

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 250px 1fr;
  gap: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Decision Framework

### Use Flexbox when:
- Dealing with a single row or column
- Content determines the layout
- You need to distribute space
- Centering items

### Use Grid when:
- Creating two-dimensional layouts
- You know the structure beforehand
- Building complex page layouts
- You need precise control

## Can You Use Both?

Absolutely! They work great together:

\`\`\`css
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

Understanding both tools gives you the flexibility to choose the right solution for each layout challenge!`,
    excerpt: 'Learn the key differences between CSS Grid and Flexbox, and discover when to use each layout system for maximum effectiveness.',
    author: 'Lisa Wang',
    publishDate: '2024-01-05',
    readingTime: 9,
    tags: ['css', 'layout', 'flexbox', 'grid'],
    category: 'Development',
    featuredImage: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    featured: false,
  },
];

export const popularPosts = blogPosts.slice(0, 3);

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
  );
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
