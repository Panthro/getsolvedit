import ideasConfig from "../config/ideas.json";
import LandingPage from "../components/LandingPage";

export default function SlugPage({ slug }) {
  return <LandingPage slug={slug} />;
}

export async function getStaticPaths() {
  const slugs = Object.keys(ideasConfig.variants).filter((k) => k !== "default");
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // Return 404 for unknown slugs
  if (!ideasConfig.variants[slug]) {
    return { notFound: true };
  }
  return { props: { slug } };
}
