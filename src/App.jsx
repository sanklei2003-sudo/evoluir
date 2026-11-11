import { useState } from "react";
import { AppDataProvider } from "./context/AppDataContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Patterns from "./pages/Patterns";
import Decisions from "./pages/Decisions";

const PAGES = { home: Home, skills: Skills, patterns: Patterns, decisions: Decisions };

export default function App() {
  const [page, setPage] = useState("home");
  const Page = PAGES[page] ?? Home;

  return (
    <AppDataProvider>
      <Layout current={page} onNavigate={setPage}>
        <Page onNavigate={setPage} />
      </Layout>
    </AppDataProvider>
  );
}
