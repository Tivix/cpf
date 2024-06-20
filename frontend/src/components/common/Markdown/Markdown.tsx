import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FC } from 'react';
import {MarkdownProps} from "@app/components/common/Markdown/Markdown.interface";

export const CustomMarkdown: FC<MarkdownProps> = ({ text }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>;
};
