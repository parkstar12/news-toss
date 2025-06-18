"use client";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const renderMarkdown = async () => {
      const rawHtml = await marked(markdown);
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setHtml(cleanHtml);
    };

    renderMarkdown();
  }, [markdown]);

  return (
    <div
      className="prose max-w-[80%] w-fit bg-gray-100 px-3 py-2 rounded-main break-keep"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
