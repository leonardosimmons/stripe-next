
import React from 'react';
import Head from 'next/head';


type Props = {
  title: string;
  styles: any;
  classes?: string;
  header?: JSX.Element | HTMLElement;
  footer?: JSX.Element | HTMLElement;
};

const Layout: React.FunctionComponent<Props> = (
  { 
    title,
    header,
    footer,
    styles,
    classes,
    children 
  }
): JSX.Element => {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      </Head>
      <div id="backdrop-root" />
      <div id="modal-root" />
      <div id="app" className={`${styles.app || ''} ${classes || ''}`}>
        <nav className={`${styles.nav || ''}`}>
          {/* {add navbar} */}
        </nav>
        {header && <header className={`${styles.header || ''}`}>{header}</header>}
        {children && <main className={`${styles.main || ''}`}>{children}</main>}
        {footer && <footer className={`${styles.footer || ''}`}>{footer}</footer>}
        <div id="top-of-site-pixel-anchor" />
      </div>
    </React.Fragment>
  );
};

export default Layout;
