import { Client, Config, CheckoutAPI } from '@adyen/api-library';

export function getAdyenCheckout(): CheckoutAPI {
  const config = new Config();
  config.apiKey = process.env.ADYEN_API_KEY!;
  config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT!;
  config.environment = 'TEST';

  const client = new Client({ config });
  return new CheckoutAPI(client);
}