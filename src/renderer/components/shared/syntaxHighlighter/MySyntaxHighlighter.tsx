import React, { FC } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from './syntaxStyle.ts';

interface IMySyntaxHighlighterProps {
  text: string;
}

const MySyntaxHighlighter: FC<IMySyntaxHighlighterProps> = ({ text }) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        lineHeight: '1.3em',
      }}
      className="syntax-highlighter"
      language="json"
      style={syntaxStyle}
      wrapLines={true}
      lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
    >
      {text}
    </SyntaxHighlighter>
  );
};

export default MySyntaxHighlighter;
