import Highlight, { Language, defaultProps } from "prism-react-renderer";
import React, { Children, ReactNode, isValidElement, useState } from "react";

const classNameToLanguage = (className: string): Language => {
  switch (className) {
    case "language-js":
    case "language-javascript":
      return "javascript";
    case "language-jsx":
      return "jsx";
    case "language-ts":
    case "language-typescript":
      return "typescript";
    case "language-tsx":
      return "tsx";
    default:
      return "javascript";
  }
};

type CodeBlockWrapperProps = {
  children?: ReactNode;
  title?: string;
  transpile?: boolean;
};

export function CodeBlockWrapper({
  children,
  title,
  transpile,
}: CodeBlockWrapperProps) {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error("CodeBlockWrapper children must be a single element");
  }

  const { className, children: code } = child.props;
  const language = classNameToLanguage(className);

  const defaultCode = code.trim();
  const [displayCode, setDisplayCode] = useState(defaultCode);

  return (
    <div>
      {title && <h2>{title}</h2>}
      {transpile && (language === "typescript" || language === "tsx") && (
        <div>
          <button onClick={() => setDisplayCode(defaultCode)}>
            {language}
          </button>
          <button
            onClick={async () => {
              const response = await fetch("/api/transpile", {
                method: "POST",
                body: JSON.stringify({
                  code: defaultCode,
                  language: language === "tsx" ? "tsx" : "ts",
                }),
              });
              const transpiledCode = await response.text();
              setDisplayCode(transpiledCode);
            }}
          >
            {language === "tsx" ? "jsx" : "javascript"}
          </button>
        </div>
      )}
      <Highlight {...defaultProps} code={displayCode} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line })} key={i}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token })} key={key} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
