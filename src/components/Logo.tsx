
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { NextImage } from '../utils/types/custom/types';

type Props = NextImage & {
  classes?: string;
  link?: string;
  styles?: any;
  text?: string | JSX.Element;
  clicked?: () => void;
};


const Logo: React.FunctionComponent<Props> = (
  {
    alt = 'logo',
    classes,
    height,
    link = '/',
    loading= 'lazy',
    quality = 100,
    priority = false,
    src,
    styles,
    text,
    width,
    clicked,
    children
  }
): JSX.Element => {
  return (
    <Link href={link as string}>
      {
        text
        ? <a className={`${styles && styles.logo} ${classes || null}`}>{text}</a>
        : src
          ? <React.Fragment>
              <Image 
                className={`${styles && styles.logo} ${classes && classes}`}
                src={src as string}
                alt={alt as string}
                width={width as string}
                height={height as string}
                quality={quality as number}
                priority={priority}
                onClick={clicked}
              />  
            </React.Fragment>
          : {children}
        }
    </Link>
  );
};

export default Logo;
