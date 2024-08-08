import { Box, IconButton, useStyleConfig } from "@chakra-ui/react";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  HighlightOutlined,
  ItalicOutlined,
  MenuOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import "./style.scss";
import { MutableRefObject, useRef } from "react";

const MenuBar = ({ editor }: { editor?: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <IconButton
          size="sm"
          aria-label="Heading 1"
          icon={<>H1</>}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Heading 2"
          icon={<>H2</>}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Heading 3"
          icon={<>H3</>}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Paragraph"
          icon={<>P</>}
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editor.isActive("paragraph") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Bold"
          icon={<BoldOutlined />}
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Italic"
          icon={<ItalicOutlined />}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Strike"
          icon={<StrikethroughOutlined />}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Highlight"
          icon={<HighlightOutlined />}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          variant={editor.isActive("highlight") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Align Left"
          icon={<AlignLeftOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={editor.isActive({ textAlign: "left" }) ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Align Center"
          icon={<AlignCenterOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={
            editor.isActive({ textAlign: "center" }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Align Right"
          icon={<AlignRightOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={
            editor.isActive({ textAlign: "right" }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Justify"
          icon={<MenuOutlined />}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={
            editor.isActive({ textAlign: "justify" }) ? "outline" : "ghost"
          }
        />

        <IconButton
          size="sm"
          aria-label="Bullet List"
          icon={<UnorderedListOutlined />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "outline" : "ghost"}
        />

        <IconButton
          size="sm"
          aria-label="Ordered List"
          icon={<OrderedListOutlined />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "outline" : "ghost"}
        />
      </div>
    </div>
  );
};

export function TextEditor(props: {
  autofocus?: boolean;
  content?: string;
  editorRef?: MutableRefObject<Editor | null>;
}) {
  useRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const styles = useStyleConfig("Input") as any;
  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: ``,
    ...props,
  });

  if (props.editorRef) {
    props.editorRef.current = editor;
  }

  return (
    <div>
      <MenuBar editor={editor} />

      <Box
        p="4"
        mt="2"
        __css={{
          ...styles.addon,
          ...styles.field,
          height: "fit-content",
          _focusWithin: styles.field._focusVisible,
        }}
        maxHeight={"400px"}
        overflowY="auto"
      >
        <EditorContent editor={editor} />
      </Box>
    </div>
  );
}
