import { useEffect, useRef } from 'react';
import { EDITOR_JS_TOOLS } from './editor.config';
import EditorJS from '@editorjs/editorjs';
import { EditorProps, holder } from './Editor.interface';
import { useFormContext } from 'react-hook-form';

export const useEditor = (data: EditorProps['data'], name: EditorProps['name']) => {
  const editorRef = useRef<EditorJS | null>(null);
  const form = useFormContext();

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api) {
          const data = await api.saver.save();
          form.setValue(name, data);
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current?.destroy?.();
      }
    };
    // INFO: we want only to initialize Editor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
