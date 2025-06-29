import { Client, Config, CheckoutAPI } from '@adyen/api-library';

export function getAdyenCheckout(): CheckoutAPI {
  const config = new Config();
  config.apiKey = process.env.ADYEN_API_KEY!;
  config.environment = 'TEST';

  const client = new Client({ config });
  return new CheckoutAPI(client);
}