
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { NextRouter, useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { 
  Data, 
  Product, 
  StaticPath 
} from '../../utils/types/custom';

import styles from '../../containers/pages/product/Preview.module.scss';

import Image from 'next/image';
import Grid from '../../components/grid';
import ProductSummary from '../../containers/pages/product/Summary';
import ProductDetails from '../../containers/pages/product/Details';
import Container from '../../components/base/Container';
import Layout from '../../containers/layout/layout';
import Link from 'next/link';


const {
  NEXT_PUBLIC_PRODUCT_SLUG,
  NEXT_PUBLIC_GET_PRODUCTS
} = process.env;


export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths: Array<StaticPath> = [];
    const data: Data<Array<Product>> = await axios.get(NEXT_PUBLIC_GET_PRODUCTS as string, { headers: { 'Content-Type': 'application/json' } }).then(res => res.data);
    const buffer: Array<StaticPath> = data.payload.map((product: Product) => ({ params: {slug: product.meta.slug} }));

    buffer.map((prod: StaticPath) => {
      if(prod.params.slug !== '') {
        paths.push(prod);
      }
    })

    return {
      paths,
      fallback: false
    };
  }
  catch(err) {
    throw new Error(err.message);
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug: string = context.params!.slug as string;

  const data = await axios.all([
    axios.get((NEXT_PUBLIC_PRODUCT_SLUG + slug) as string, { headers: { 'Content-Type': 'application/json' } })
  ])
  .then(axios.spread((products: AxiosResponse<any>) => { 
    if(products.status === 200)
    {
      let buffer: Product | undefined;

      products.data.payload.map((product: Product) => { buffer = product; });

      const dataToken = {
        product: buffer as Product
      };

      return dataToken;
    }
  }))
  .catch(err => { 
    throw new Error(err.message); 
  });

  return {
    props: {
      data: data
    }
  };
};


function ProductPreview({ data }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  /* ----------------  BASE CONTROLLERS  ---------------- */
  const router: NextRouter = useRouter();
  const chosenSizeRef = React.useRef<string>();

  /* --------------------  FUNCTIONS  --------------------- */
  function handleChosenSize(e: React.ChangeEvent<HTMLSelectElement>): void {
    chosenSizeRef.current = e.target.value;
  };

  async function addToCart(e: React.FormEvent) {
    e.preventDefault();
  };

  return (
    <Layout
      styles={styles}
      title={`DEMO | ${data.product.details.name}`}
      classes={'relative'}
    >
      <Container type="wrapper" styles={styles} classes={'noselect'}>
        <Grid even grid={styles.grid}>
          <div className={styles.imgBox}>
            <Image
              priority 
              src={data.product.preview.image.src}
              alt={'product'}
              layout={'fill'}
              objectFit={'contain'}
              objectPosition={'center'}
            />
          </div>
          <ProductSummary 
            id={data.product.id}
            name={data.product.details.name}
            price={data.product.details.price.toLocaleString()}
            addToCart={addToCart}
          />
        </Grid>
        <ProductDetails
          style={data.product.details.style}
          desc={data.product.details.desc}
          details={data.product.details.list}
        />
      </Container>
      <Link href={'/'}>
        <a className={styles.link}>{'Back'}</a>
      </Link>
    </Layout>
  );
};

export default ProductPreview;
