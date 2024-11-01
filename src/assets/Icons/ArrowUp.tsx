import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function ArrowUp({width = 20, height = 16, color = '#F5F9FA'}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 8.795l-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6z"
        fill={color}
      />
    </Svg>
  );
}
