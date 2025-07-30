# Adyen Next.js Demo

A demo of Adyen Web Drop-in v6 integration with Next.js 13+ using the App Router. This project showcases secure payment processing with modern web technologies.

> **⚠️ Disclaimer**: This is a community demo and **not officially supported by Adyen**. For production use, refer to [Adyen's official documentation](https://docs.adyen.com/).

## Features

- **Payment Processing**: Adyen Web Drop-in v6 integration
- **Modern Stack**: Next.js 13+ with App Router and TypeScript
- **Multiple Payment Methods**: Credit/debit cards and SEPA Direct Debit
- **Outcome Pages**: Success, pending, and failed payment states
- **Session-based Flow**: Secure session creation and management
- **Responsive Design**: Modern, accessible UI with brand consistency
- **Testing**: Jest and Testing Library setup

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ayodejidev/adyen-nextjs-demo)


## Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Adyen merchant account (test environment)

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Adyen Configuration
ADYEN_MERCHANT_ACCOUNT=your_merchant_account
ADYEN_API_KEY=your_api_key
NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_client_key
```

### Getting Adyen Credentials

1. **Merchant Account**: Customer Area > Settings > Account
2. **API Key**: Customer Area > Developers > API credentials
3. **Client Key**: Customer Area > Settings > Integrations > Web Drop-in

## Installation

1. Clone and install:
```bash
git clone https://github.com/ayodejidev/adyen-nextjs-demo
cd adyen-nextjs-demo
npm install
```

2. Set up environment variables (see above)

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
adyen-nextjs-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── payments/      # Payment processing
│   │   │   └── sessions/      # Session creation
│   │   ├── checkout/          # Checkout pages
│   │   │   ├── success/       # Payment success
│   │   │   ├── failed/        # Payment failed
│   │   │   └── pending/       # Payment pending
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   └── AdyenCheckout.tsx  # Main payment component
│   └── utils/                 # Utility functions
│       └── adyenClient.ts     # Adyen API client
├── __tests__/                 # Test files
├── public/                    # Static assets
└── package.json
```

## Usage

1. Visit homepage and click "Start Checkout"
2. Adyen Drop-in loads with payment methods
3. Enter test payment details and submit
4. Redirects to outcome page (success/pending/failed)

## Testing

### Run Tests
```bash
npm test
```

### Test Coverage
- Component tests for AdyenCheckout
- API route tests for sessions and payments
- Page tests for all checkout outcomes

### Test Cards
Use Adyen's test cards for payment testing:
- **Success**: 4212345678901247
- **Pending**: 4212345678901254
- **Failed**: 4212345678901262

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start server
npm run lint         # Run ESLint
npm test             # Run tests
```

## Troubleshooting

### Common Issues

1. **"Failed to create payment session"**
   - Check environment variables and Adyen credentials

2. **"Payment form container not found"**
   - Ensure AdyenCheckout component is properly mounted

3. **CORS Issues**
   - Add your local URL as allowed origin in Adyen API credentials

## Resources

- [Adyen Documentation](https://docs.adyen.com/)
- [Adyen Web Drop-in](https://docs.adyen.com/online-payments/web-drop-in)
- [Adyen API Explorer](https://docs.adyen.com/api-explorer/)
- [Test Cards](https://docs.adyen.com/development-resources/test-cards)
- [Next.js Documentation](https://nextjs.org/docs)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is for demonstration purposes only. Please refer to Adyen's terms of service for production use.

## Disclaimer

This is a community demo and **not officially supported by Adyen**. For production use, refer to [Adyen's official documentation](https://docs.adyen.com/) and contact [Adyen support](https://support.adyen.com/).

## Support

- **This demo**: Create an issue in this repository
- **Adyen integration**: Contact [Adyen support](https://support.adyen.com/)
- **Next.js**: Check [Next.js documentation](https://nextjs.org/docs)
