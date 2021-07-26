
import { AmountToken } from "../utils/types/custom/types";


export function formatAmount({amount, quantity, currency}: AmountToken): string {
  const numFormat: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol'
  });

  const parts: Array<Intl.NumberFormatPart> = numFormat.formatToParts(amount);

  for (let part of parts) {
    if (part.type === 'decimal') {
      return numFormat.format(amount * quantity);
    }
  }

  const total: number = parseInt((quantity * amount).toFixed(amount));

  return numFormat.format(total);
};
