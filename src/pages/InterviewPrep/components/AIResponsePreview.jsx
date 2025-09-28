import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
const codeTheme = oneLight;

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200/70 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <LuCode size={14} className="text-gray-600" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-gray-600">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-700 text-xs flex items-center gap-1"
        >
          {copied ? <LuCheck size={14} className="text-emerald-600" /> : <LuCopy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
  style={codeTheme}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const AIResponsePreview = ({ context }) => {
  if (!context) return null;

  // NEW: handle object from AI { title, explanation }
  if (typeof context === "object" && context !== null && context.explanation) {
    return (
      <div className="max-w-4xl mx-auto">
        {context.title && (
          <h2 className="text-xl font-semibold mb-4">{context.title}</h2>
        )}
        <div className="text-[14px] prose prose-slate max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "";
                const raw = String(children).replace(/\n$/, "");
                if (className) {
                  return <CodeBlock code={raw} language={language} />;
                }
                return (
                  <code className="px-1 py-0.5 bg-gray-200 rounded text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-3 leading-5">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-3">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-3">{children}</ol>,
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600">
                  {children}
                </blockquote>
              ),
              h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mt-5 mb-2">{children}</h3>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-300">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 bg-gray-100 text-left text-xs font-medium text-gray-600 border">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-sm border align-top">{children}</td>
              ),
            }}
          >
            {context.explanation}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  // fallback (old behavior)
  const normalized =
    typeof context === "string"
      ? context
      : "```json\n" + JSON.stringify(context, null, 2) + "\n```";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const raw = String(children).replace(/\n$/, "");
              if (className) {
                return <CodeBlock code={raw} language={language} />;
              }
              return (
                <code className="px-1 py-0.5 bg-gray-200 rounded text-xs" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {normalized}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AIResponsePreview;
