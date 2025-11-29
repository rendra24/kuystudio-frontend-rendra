# Task Management Frontend - KuyStudio

A modern, clean, and responsive Task Management Frontend built with Next.js 16, React 19, and TypeScript. Designed with Clean Architecture and integrated with a Laravel API.

## 🚀 Features

- **Task Board**: Interactive KanBan-style board with "Pending" and "Done" columns.
- **Drag & Drop**: Seamlessly move tasks between columns to update their status instantly using `@dnd-kit`.
- **CRUD Operations**: Full Create, Read, Update, and Delete capabilities.
- **Optimistic UI**: Instant feedback on UI interactions before server confirmation for a snappy experience.
- **Clean UI/UX**: Built with Tailwind CSS and custom Shadcn-like components for a polished look.
- **Responsive**: Works great on desktop and mobile devices.

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Clsx](https://github.com/lukeed/clsx)
- **State Management**: React Hooks (Custom `useTasks` hook)
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/) & @dnd-kit/sortable
- **Icons**: [Lucide React](https://lucide.dev/)

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 18.x or higher
- npm or yarn
- A running instance of the Backend API (Laravel) serving at `http://localhost:8000` (default)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd kuystudio-frontend-rendra
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables (Optional):**

    Create a `.env.local` file in the root directory if your API URL differs from the default (`http://localhost:8000`).

    ```env
    NEXT_PUBLIC_API_URL=http://your-api-url.com
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Online Apps:**

    Visit the link: [https://kuystudio-frontend-rendra.vercel.app/tasks](https://kuystudio-frontend-rendra.vercel.app/tasks)
