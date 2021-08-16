
import React from 'react';


type Props = {
  bgImage?: string;
  classes?: string;
  styles?: any;
  type: "box" | "container" | "content" | "wrapper";
}

const Container: React.FunctionComponent<Props> = (
  {
    bgImage,
    classes,
    styles,
    type,
    children
  }
) => {
  return (
    <div className={`${ styles ?
      type === "box" 
      ? styles.box
      : type === "container"
        ? styles.container 
        : type === "content" 
          ? styles.content
          : type === "wrapper"
            ? styles.wrapper
            : ''
       : ''} ${classes || ''}
      `}
      style={{ backgroundImage: `${ bgImage ? 'url(' + bgImage + ')' : ''}`}}
    >
      {children}
    </div>
  );
};

export default Container;
