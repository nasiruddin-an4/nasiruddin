"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Highlighter,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Undo,
  Redo,
} from "lucide-react";

function ToolbarButton({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg border transition-colors ${
        active
          ? "bg-brandYellow text-brandBlack border-brandYellow"
          : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-brandYellow hover:text-brandYellow"
      } disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-zinc-300 disabled:hover:border-zinc-700`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [3, 4] },
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: placeholder || "Write here..." }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[160px] px-4 py-3 focus:outline-none text-white",
      },
    },
  });

  if (!editor) return null;

  const setHighlight = (color) => {
    if (color) {
      editor.chain().focus().toggleHighlight({ color }).run();
    } else {
      editor.chain().focus().toggleHighlight().run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const highlightColors = [
    { label: "Yellow", value: "#fceb3b" },
    { label: "Green", value: "#86efac" },
    { label: "Pink", value: "#f9a8d4" },
    { label: "Blue", value: "#93c5fd" },
  ];

  return (
    <div className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 focus-within:border-brandYellow transition-colors">
      <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-zinc-800 bg-zinc-950/50">
        <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-zinc-800 mx-1" />

        {highlightColors.map((c) => (
          <button
            key={c.value}
            type="button"
            title={`Highlight ${c.label}`}
            onClick={() => setHighlight(c.value)}
            className={`w-7 h-7 rounded-lg border-2 transition-transform hover:scale-110 ${
              editor.isActive("highlight", { color: c.value })
                ? "border-white scale-110"
                : "border-zinc-700"
            }`}
            style={{ backgroundColor: c.value }}
          />
        ))}
        <ToolbarButton
          title="Remove highlight"
          active={false}
          disabled={!editor.isActive("highlight")}
          onClick={() => editor.chain().focus().unsetHighlight().run()}
        >
          <Highlighter className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-zinc-800 mx-1" />

        <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-6 bg-zinc-800 mx-1" />

        <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
