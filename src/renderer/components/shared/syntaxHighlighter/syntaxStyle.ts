import { tomorrowNightBright as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const syntaxStyleOverride = {
  'hljs-string': {
    'color': '#b2b4b4',
  },
};

export default { ...style, ...syntaxStyleOverride };
