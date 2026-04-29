import type { MDXComponents } from "mdx/types";
import { mdxBlocks } from "@/components/mdx-blocks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxBlocks,
    h2: (props) => (
      <h2
        {...props}
        className="font-display mt-16 mb-4 text-3xl tracking-tight md:text-5xl"
      />
    ),
    p: (props) => (
      <p {...props} className="my-5 max-w-2xl leading-relaxed opacity-90" />
    ),
  };
}
