import { tomorrowNightBright as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const syntaxStyleOverride = {
  'hljs-string': {
    'color': '#f9fde3'
  },
  'hljs-symbol': {
    'color': '#f9fde3'
  },
  'hljs-bullet': {
    'color': '#f9fde3'
  },
  'hljs-addition': {
    'color': '#f9fde3'
  },
};

export default { ...style, ...syntaxStyleOverride };
