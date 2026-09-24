"use client";

import { cn } from "@/lib/utils/general/cn";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

import EditorButton from "./editor-button";

type PostEditorProps = {
  invalid: boolean;
  value?: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
};

export function PostEditor({
  invalid,
  value,
  onChange,
}: PostEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },

    editorProps: {
      attributes: {
        class: cn(
          "min-h-64 px-4 py-3",
          "text-sm text-zinc-200 outline-none",
        ),
      },
    },
  });

  if (!editor) {
    return null;
  }
  
  const toggleCodeBlock = () => {
    const { from, to, empty } = editor.state.selection;
  
    if (empty) {
      editor
        .chain()
        .focus()
        .toggleCodeBlock()
        .run();
  
      return;
    }
  
    const selectedText = editor.state.doc.textBetween(
      from,
      to,
      "\n",
    );
  
    editor
      .chain()
      .focus()
      .deleteSelection()
      .insertContent({
        type: "codeBlock",
        content: [
          {
            type: "text",
            text: selectedText,
          },
        ],
      })
      .run();
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-zinc-800",
        "transition-colors",
        invalid && "border-red-500",
      )}
    >
      <div
        className={cn(
          "flex min-h-11 items-center",
          "border-b border-zinc-800 px-2",
          invalid && "border-red-500",
        )}
      >
        <EditorButton
          active={editor.isActive("bold")}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold className="size-4" />
        </EditorButton>

        <EditorButton
          active={editor.isActive("italic")}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic className="size-4" />
        </EditorButton>

        <EditorButton
          active={editor.isActive("codeBlock")}
          onClick={toggleCodeBlock}
        >
          <Code2 className="size-4" />
        </EditorButton>

        <EditorButton
          active={editor.isActive("blockquote")}
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote className="size-4" />
        </EditorButton>

        <EditorButton
          active={editor.isActive("bulletList")}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="size-4" />
        </EditorButton>

        <EditorButton
          active={editor.isActive("orderedList")}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="size-4" />
        </EditorButton>

        <div className="ml-auto flex items-center">
          <EditorButton
            disabled={!editor.can().undo()}
            onClick={() =>
              editor.chain().focus().undo().run()
            }
          >
            <Undo2 className="size-4" />
          </EditorButton>

          <EditorButton
            disabled={!editor.can().redo()}
            onClick={() =>
              editor.chain().focus().redo().run()
            }
          >
            <Redo2 className="size-4" />
          </EditorButton>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
