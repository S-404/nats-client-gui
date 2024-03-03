import { tomorrowNightBright as style } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const syntaxStyleOverride = {
  'hljs-string': {
    'color': '#9b9b9b',
  },
};

export default { ...style, ...syntaxStyleOverride };
