import type { Metadata } from "next";

const siteName = "Appleville";
const defaultImage = "/images/towns/dharamshala.jpg";

type MetadataOptions = {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export const siteMetadata = {
  name: siteName,
  url: "https://appleville.help",
  defaultImage,
};

export function buildPageMetadata({
  title,
  description,
  pathname,
  image = defaultImage,
  noIndex = false,
  type = "website",
}: MetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pathname,
      siteName,
      type,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}
