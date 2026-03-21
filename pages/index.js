import LandingPage from "../components/LandingPage";

// Default landing page — shown when no slug is present
// e.g. getsolvedit.com/ (direct visit, no campaign link)
export default function Home() {
  return <LandingPage slug="default" />;
}
