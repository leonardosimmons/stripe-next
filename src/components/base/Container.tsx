
import React from 'react';


type Props = {
  bgImage?: string;
  styles?: any;
  type: "box" | "container" | "content" | "wrapper";
}

const Container: React.FunctionComponent<Props> = (
  {
    bgImage,
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
          : type === "container"
            ? styles.container 
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
