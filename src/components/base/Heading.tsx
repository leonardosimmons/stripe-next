
import React from "react";


type Props = {
  type: "main" | "sub" | "alt";
  body?: string | JSX.Element;
  classes?: string;
  bodyClasses?: string;
  textClasses?: string;
  styles?: any;
};


const Heading: React.FunctionComponent<Props> = (
  { 
    type, 
    body, 
    classes,
    bodyClasses,
    textClasses, 
    styles, 
    children 
  }
): JSX.Element => {
  return (
    <div className={`${styles && styles.headingWrapper} ${classes || ''}`}>
    { type === "main"
      ? <h1 className={`${styles && styles.heading} ${textClasses || ''}`}>{children}</h1>
      : type === "sub"
        ? <h2 className={`${styles && styles.heading} ${textClasses || ''}`}>{children}</h2>
        : type === "alt"
          ? <h3 className={`${styles && styles.heading} ${textClasses || ''}`}>{children}</h3>
          : '' }
    { body
      ? typeof body === "string"
        ? <p className={`${styles && styles.headingBody} ${bodyClasses || ''}`}>{body}</p>
        : body
      : '' }
    </div>
  );
};

export default Heading;