import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CheckList from '@editorjs/checklist';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      placeholder: 'Type text...',
    },
  },
  checkList: CheckList,
  list: List,
  header: Header,
};
