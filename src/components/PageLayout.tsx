import React, { ReactNode } from "react";
import { CodeBlockWrapper } from "./CodeBlock";
import { MDXProvider } from "@mdx-js/react";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  pre: CodeBlockWrapper,
};

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <h1>server-transpiled code blocks</h1>
      <MDXProvider components={components}>{children}</MDXProvider>
    </div>
  );
};
