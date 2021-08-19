
import React from 'react';

import styles from './Details.module.scss';

import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';



type Props = {
  style: string;
  desc: string;
  details: Array<string>;
};


const Details: React.FunctionComponent<Props> = ({ style, desc, details }): JSX.Element => {
  return (
    <Container type="wrapper" styles={styles}>
      <Container type="container" styles={styles}>
        <Container type="content" styles={styles}>
          <Heading 
            type="sub" 
            styles={styles}
            body={<p className={styles.headingBody}>{desc}</p>}>
            <span>{'PRODUCT DETAILS'}</span>
            <span>{`Style: ${style}`}</span>
          </Heading>
          <ul>
          {
            details.map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))
          }
          </ul>
        </Container>
      </Container>
    </Container>
  );
};

export default Details;
