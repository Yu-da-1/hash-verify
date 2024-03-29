import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';

function MyApp({ Component, pageProps }) {

	return (
		<ThirdwebProvider
			activeChain={activeChain}
			clientId={"2040222f789a912a50560c6560ea7448"}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
