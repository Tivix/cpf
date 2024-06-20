import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {FC, PropsWithChildren} from "react";

export const MarkdownWithPlugins:FC<PropsWithChildren> = ({children}) => {
  return (
      <Markdown remarkPlugins={[remarkGfm]}>
        {children}
      </Markdown>
  )
}
