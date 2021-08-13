
import React from 'react';


type Props = {
  bgImage?: string;
  videoUrl?: string;
  styles?: any;
  type: "box" | "content" | "wrapper";
}

const Container: React.FunctionComponent<Props> = (
  {
    bgImage,
    videoUrl,
    styles,
    type,
    children
  }
) => {
  return (
    <div 
      className={`
        ${type === "box" 
          ? styles.box 
          : type === "content" 
            ? styles.content
            : type === "wrapper"
              ? styles.wrapper
              : ''
         }
      `}
      style={{ backgroundImage: `${ bgImage ? 'url(' + bgImage + ')' : ''}`}}
    >
      {children}
    </div>
  );
};

export default Container;
