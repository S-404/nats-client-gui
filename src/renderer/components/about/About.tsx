import React from 'react';
import './about.scss';
import IconButton from '#renderer/components/shared/buttons/iconButton/IconButton.tsx';

const URL = import.meta.env.VITE_GITHUB_URL;
const URL_RELEASES = URL + '/releases';

const About = () => {
  return (
    <div className={'about-container'}>
      <h1>nats-js-client</h1>
      <article>
        <br/>
        <p>gui for nats.js client</p>
        <br/>
        <p>
          repository:
          <a>{URL}</a>
          <div className={'copy-button'}>
            <IconButton
              onClick={() => navigator.clipboard.writeText(URL)}
              iconType={'copy'}
            />
          </div>
        </p>
        <p>
          releases:
          <a>{URL_RELEASES}</a>
          <div className={'copy-button'}>
            <IconButton
              onClick={() => navigator.clipboard.writeText(URL_RELEASES)}
              iconType={'copy'}
            />
          </div>
        </p>
      </article>
      <h1></h1>

    </div>
  );
};

export default About;
