
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductCard as ProductCardType} from '../../utils/types/custom/types';
import Container from '../base/Container';
import Heading from '../base/Heading';


type Props = {
  card: ProductCardType;
  styles: any;  
  classes?: string;
  fill?: boolean;
  priority?: boolean;
};


const ProductCard: React.FunctionComponent<Props> = (
  {
    card,
    styles,
    classes,
    fill,
    priority
  }
): JSX.Element => {
  return (
    <div className={`${styles.productCardWrapper || ''} ${classes || ''} noselect`}>
      <div className={`${styles.productCardImgBox || ''} relative`}>
      { fill
      ? <Image 
          src={card.img.src}
          alt={'Product Card'}
          quality={100}
          layout={'fill'}
          objectFit={card.img.objectFit ? card.img.objectFit : 'cover'}
          priority={priority}
          className={styles.productCardImg || ''}
        />
      : <Image 
          src={card.img.src}
          alt={'Product Card'}
          width={card.img.width as string}
          height={card.img.height as string}
          quality={100}
          layout={card.img.layout ? card.img.layout : 'responsive'}
          objectFit={card.img.objectFit ? card.img.objectFit : 'cover'}
          priority={priority}
          className={styles.productCardImg || ''}
        />
      }
      </div>
      <Container type="content" styles={styles}>
        <Heading type="sub" classes={styles.productCardHeading}>
          {card.text}
        </Heading>
        <div className={styles.productCardPriceBox || ''}>
          <p className={styles.productCardPrice || ''}>
            {`$${card.price}`}
          </p>
        </div>
        <Container type="box" classes={styles.productCardLinkBox}>
          <Link href={card.btn.link}>
            <a className={styles.productCardLink || ''}>
              {card.btn.text}
            </a>
          </Link>
        </Container>
      </Container>
    </div>
  );
};

export default ProductCard;