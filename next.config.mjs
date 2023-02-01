// @ts-check

import nextMDX from "@next/mdx";
import remarkMdxCodeMeta from "remark-mdx-code-meta";

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkMdxCodeMeta],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

export default nextConfig;
