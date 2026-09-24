"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";

type PostContentRendererProps = {
  content: JSONContent;
};

function PostContentRenderer({
  content,
}: PostContentRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  console.log(typeof content);
  console.log(content);

  return (
    <EditorContent
      editor={editor}
      className="
        [&_.tiptap]:space-y-5
        [&_.tiptap]:text-base
        [&_.tiptap]:leading-7
        [&_.tiptap]:text-zinc-300

        [&_.tiptap_h1]:mt-10
        [&_.tiptap_h1]:text-3xl
        [&_.tiptap_h1]:font-semibold
        [&_.tiptap_h1]:text-zinc-100

        [&_.tiptap_h2]:mt-10
        [&_.tiptap_h2]:text-2xl
        [&_.tiptap_h2]:font-semibold
        [&_.tiptap_h2]:text-zinc-100

        [&_.tiptap_h3]:mt-8
        [&_.tiptap_h3]:text-xl
        [&_.tiptap_h3]:font-semibold
        [&_.tiptap_h3]:text-zinc-100

        [&_.tiptap_p]:text-zinc-300

        [&_.tiptap_strong]:font-semibold
        [&_.tiptap_strong]:text-zinc-100

        [&_.tiptap_a]:text-emerald-300
        [&_.tiptap_a]:underline
        [&_.tiptap_a]:underline-offset-4

        [&_.tiptap_ul]:list-disc
        [&_.tiptap_ul]:pl-6

        [&_.tiptap_ol]:list-decimal
        [&_.tiptap_ol]:pl-6

        [&_.tiptap_li]:pl-1

        [&_.tiptap_blockquote]:border-l-2
        [&_.tiptap_blockquote]:border-zinc-700
        [&_.tiptap_blockquote]:pl-4
        [&_.tiptap_blockquote]:italic
        [&_.tiptap_blockquote]:text-zinc-400

        [&_.tiptap_code]:rounded
        [&_.tiptap_code]:bg-zinc-800
        [&_.tiptap_code]:px-1.5
        [&_.tiptap_code]:py-0.5
        [&_.tiptap_code]:font-mono
        [&_.tiptap_code]:text-sm

        [&_.tiptap_pre]:overflow-x-auto
        [&_.tiptap_pre]:rounded-lg
        [&_.tiptap_pre]:border
        [&_.tiptap_pre]:border-zinc-800
        [&_.tiptap_pre]:bg-zinc-950
        [&_.tiptap_pre]:p-5

        [&_.tiptap_pre_code]:bg-transparent
        [&_.tiptap_pre_code]:p-0
      "
    />
  );
}

export default PostContentRenderer;