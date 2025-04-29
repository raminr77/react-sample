# React Sample

[![GitHub stars](https://img.shields.io/github/stars/raminr77/react_sample?style=social)](https://github.com/raminr77/react_sample/)
[![GitHub_forks](https://img.shields.io/github/forks/raminr77/react_sample?style=social)](https://github.com/raminr77/react_sample/)

# 🚀 React Sample Project

A simple and clean React + TypeScript + Vite starter project, configured with essential tools and structured with best practices gained from 7+ years of frontend development experience.
<br/>
This is a sample of the ReactJs project for starting easily and fast.
<br />

## 📁 Project Structure

```
scripts/                 # For Custom Scripts (Icon Generator, etc.)
public/                  # Application files (PWA, Icons, Splash Screens, etc.)
src/
 ├── pages/              # Application pages (auth, landing, main, etc.)
 ├── layout/             # Layout components and containers
 ├── shared/             # Shared logic: helpers, constants, services, types, store
 ├── styles/             # Global styles (SCSS & Tailwind)
 └── __test__/           # Unit tests
```

The project includes complete configurations for **ESLint**, **Prettier**, **Stylelint**, **Husky** (pre-commit hooks), and **CI/CD via GitHub Actions**.

In this project we're using `RTK Query` for API request system and `Redux Toolkit` for API cache system and state management.  

---

## ⚙️ Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Create the `.env` File

Create your local environment file by copying the example file:

```bash
cp .env.example .env
```

Then make sure to configure your **Firebase settings** required for push notifications inside `.env`.

If you're just testing the app and don't have Firebase set up, you can use dummy values for now.

---

## 🐳 Running with Docker

### Build and Run

```bash
docker build -t react-sample-app .
docker run -d -p 3000:80 react-sample-app
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📦 Using Docker Compose

```bash
docker-compose up --build
```

To stop and remove containers:

```bash
docker-compose down
```

---

## ✅ Testing

Unit tests can be added and placed under the `src/__test__` folder. You can use any preferred framework like Vitest or Jest.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

## 💡 Tips & Features

### ✨ Animations

You can use the [AnimateCSS](https://animate.style/) framework for applying animations by adding the class `animate__animated` and the desired animation class with the `animate__` prefix:

```html
<h1 class="animate__animated animate__bounce">An animated element</h1>
```

🔧 **But there's more!** This project includes a custom helper function for generating animation class names easily:

```ts
animator({ name: 'fadeIn', speed: 'faster' });
```

This will generate appropriate class names automatically.

---

### 📁 Import Aliases

You can import modules from the `src` folder using the `@/` alias:

```ts
import { APP_ROUTES } from '@/shared/constants';
```

---

## 🧪 Available NPM Commands

Here’s a list of useful scripts for development and maintenance:

| Command           | Description                                  |
|------------------|----------------------------------------------|
| `dev`            | Run the project locally using Vite           |
| `test`           | Run unit tests with Vitest                   |
| `prepare`        | Prepare Git hooks using Husky                |
| `lint`           | Run ESLint and fix issues automatically      |
| `format`         | Format the code using Prettier               |
| `build`          | Build TypeScript and the app bundle          |
| `check-lint`     | Check lint issues without fixing             |
| `check-format`   | Check code formatting                        |
| `preview`        | Preview production build at port 8080        |
| `check-types`    | Type-check the project without emitting files|
| `pretty`         | Format all JS/TS/CSS/SCSS source files       |
| `lint:style`     | Run Stylelint for style file validation      |
