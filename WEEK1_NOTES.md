# WEEK 1 NOTES

##  Project Overview

This project was initialized using React + TypeScript with Vite. The goal of Week 1 was to set up a scalable frontend architecture with proper tooling, responsiveness, testing, and developer experience.

---

## Responsive Breakpoint Strategy

The application follows a **mobile-first responsive design approach** using Tailwind CSS.

###  Custom Breakpoints

| Breakpoint | Size   |
| ---------- | ------ |
| xs         | 480px  |
| sm         | 640px  |
| md         | 768px  |
| lg         | 1024px |
| xlg        | 1280px |

---

## Approach

* Designed UI starting from **mobile view**
* Gradually enhanced layout for larger screens
* Used Tailwind responsive utilities like:

  * `xs:p-5`
  * `sm:p-6`
  * `md:p-8`
  * `lg:p-10`
  * `xlg:p-12`
* Maintained consistent spacing and layout scaling

---

## Shared UI Architecture

A reusable layout component was created:

### `ResponsivePageShell`

* Provides consistent layout across pages
* Handles:

  * Responsive padding
  * Centered content (`max-width`)
  * Background styling
  * Optional page title
* Ensures uniform UI structure across application

---

##  Styling Strategy

* Tailwind CSS used for utility-first styling
* SCSS Modules used for component-level styling where needed
* Ensured clean and maintainable styling approach

---

##  Internationalization (i18n)

* Implemented using `react-i18next`
* Supported languages:

  * English (en)
  * Spanish (es)
* Language switch implemented with persistence using `localStorage`

---

##  Testing Setup

* Vitest used as test runner
* React Testing Library used for UI testing
* Coverage configured using `@vitest/coverage-v8`
* Tests focus on user behavior and UI rendering

---

##  API Mocking

* MSW (Mock Service Worker) used to mock API calls
* Allows frontend development without backend dependency
* Ensures consistent and testable API responses

---

## Developer Tooling

* ESLint for code quality
* Prettier for code formatting
* Husky for pre-commit hooks:

  * Lint check
  * Type check
  * Unit tests

---

##  Storybook

* Used for isolated UI component development
* Added stories for shared components
* Configured with i18n support

---

##  Conclusion

Week 1 focused on building a strong foundation with:

* Scalable architecture
* Clean code practices
* Responsive UI
* Testing and tooling setup

The project is now ready for further feature development in upcoming weeks.
