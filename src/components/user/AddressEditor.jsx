import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function AddressEditor({ value, onChange }) {
    const [isClient, setIsClient] = useState(false);

    // Detect client mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Only initialize editor on client
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || "<p></p>",
        editorProps: {
            attributes: { class: "tiptap prose prose-sm p-3 min-h-[150px] outline-2" },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editable: isClient, // prevent SSR rendering
    });

    if (!isClient) return null; // prevent server-side render crash

    return <EditorContent editor={editor} />;
}