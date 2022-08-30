import { Environment, FetchFunction, Network, RecordSource, Store } from 'relay-runtime';

const fetchRelay: FetchFunction = async (requestParams, variables) => {
  const headers: HeadersInit = {
    'content-type': 'application/json'
  };

  const serializedToken = localStorage.getItem('token');
  if (serializedToken) {
    const token = JSON.parse(serializedToken);
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: requestParams.text,
      variables
    })
  });

  return response.json();
};

export const relayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource())
});
