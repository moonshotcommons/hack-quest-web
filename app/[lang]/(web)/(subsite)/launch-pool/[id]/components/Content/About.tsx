import React from 'react';
import { titleTxtData } from '../../constants/data';

interface AboutProp {}

const About: React.FC<AboutProp> = () => {
  return (
    <div>
      <p className="text-h3 text-neutral-off-black">{titleTxtData[3]}</p>
      <p className="body-l mt-[24px] text-neutral-rich-gray">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit lobortis velit scelerisque rutrum. Nam luctus dolor nisi, eu sollicitudin sem sollicitudin a. Duis feugiat facilisis lacus ut aliquam. Sed cursus turpis vitae orci interdum, sit amet vestibulum dolor iaculis. Quisque blandit ante lectus, sit amet venenatis enim venenatis id. Quisque cursus interdum erat, non sodales metus semper et. Curabitur leo justo, finibus eget molestie vel, maximus blandit nisi. Cras non lorem nec arcu fringilla tempus at quis tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Quisque ornare risus et nisl mollis, nec pretium libero venenatis. Donec lobortis vestibulum enim, in pellentesque sem ultrices sed. Morbi eget imperdiet quam. Duis sodales finibus nisi. Cras porttitor dapibus semper. Quisque dictum neque non eros ultrices congue.`}</p>
    </div>
  );
};

export default About;
