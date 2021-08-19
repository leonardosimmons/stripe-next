
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import Container from '../base/Container';
import Grid from '../grid/Grid';
import Logo from '../Logo';

import styles from './Navbar.module.scss';


type Props = {

};


const Navbar: React.FunctionComponent<Props> = ({}): JSX.Element => {
  const router: NextRouter = useRouter();
  return (
    <Container type="wrapper" styles={styles}>
      <Container type="box" styles={styles}>
        <Grid even grid={styles.grid}>
          <Container type="content" styles={styles}>
            <p>{'Welcome'}</p>
          </Container>
          <Container type="content" styles={styles}>
            <Logo 
              priority
              src="/images/logo.png"
              alt="logo"
              width= "68.5"
              height="68.5"
              link={'/'}
              styles={styles}
              clicked={()=> router.push('/')}
            />
          </Container>
          <Container type="content" styles={styles}>
            <p>{"How-to-use"}</p>
            <p>{"How-to"}</p>
          </Container>
        </Grid>
      </Container>
    </Container>
  );
};

export default Navbar;