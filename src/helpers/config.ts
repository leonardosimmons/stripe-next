
import axios from 'axios';


export async function getStripeKey() {
  return await axios.get(process.env.NEXT_PUBLIC_STRIPE_KEY_API as string).then((res: any) => res.data.publishableKey)
  .then((key: string) => key)
  .catch(err => { throw new Error(err.message)});
};