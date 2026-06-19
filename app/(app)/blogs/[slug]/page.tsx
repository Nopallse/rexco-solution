import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rexco-solution.com";
const DEFAULT_IMAGE = "/images/article.jpg";

type PageParams = {
  slug: string;
};

type ArticleMetadata = {
  title?: string;
  excerpt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  primaryImage?: string | null;
};

type PageProps = {
  params: Promise<PageParams> | PageParams;
};

function getAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function getImageUrl(path?: string | null) {
  if (!path) return getAbsoluteUrl(DEFAULT_IMAGE);
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE}/${cleanPath}`;
}

async function resolveParams(params: PageProps["params"]) {
  return await params;
}

async function getArticleMetadata(slug: string): Promise<ArticleMetadata | null> {
  try {
    const response = await fetch(`${API_BASE}/article/slug/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data || result;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  const article = await getArticleMetadata(slug);

  const title = article?.seoTitle || article?.title || "Rexco Solution";
  const description =
    article?.seoDescription ||
    article?.excerpt ||
    "REXCO offers high-performance lubricants, cleaners, and protective solutions.";
  const image = getImageUrl(article?.primaryImage);
  const url = getAbsoluteUrl(`/id/blogs/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Rexco Solution",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
