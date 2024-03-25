// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { itemId } = req.query;

//   if (typeof itemId !== 'string') {
//     return res.status(400).json({ error: 'itemId is required and must be a string' });
//   }

//   const response = await fetch(`https://api.envato.com/v1/market/item:${itemId}.json`, {
//     headers: {
//       'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
//     }
//   });

//   if (!response.ok) {
//     return res.status(response.status).json({ error: 'Failed to fetch data from Envato API' });
//   }

//   const data = await response.json();

//   res.status(200).json(data.item);
// }
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemId } = req.query;

  // Sprawdzenie, czy itemId zostało przekazane jako string
  if (typeof itemId !== 'string') {
    return res.status(400).json({ error: 'itemId is required and must be a string' });
  }

  // Zmiana URL zapytania do nowego endpointu Envato API
  const url = `https://api.envato.com/v3/market/catalog/item?id=${itemId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.ENVATO_TOKEN}` // Upewnij się, że ENVATO_TOKEN jest poprawnie ustawiony w Twoich zmiennych środowiskowych
      }
    });

    // Sprawdzenie, czy odpowiedź serwera jest poprawna
    if (!response.ok) {
      throw new Error(`API responded with status code ${response.status}`);
    }

    const data = await response.json();
    
    // Zwrócenie danych o produkcie
    // Upewnij się, że dostosowujesz dostęp do właściwości obiektu JSON zgodnie z rzeczywistą strukturą odpowiedzi API
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      // Teraz TypeScript wie, że `error` jest typu `Error` i posiada właściwość `message`.
      res.status(500).json({ error: error.message });
    } else {
      // W przypadku, gdy `error` nie jest instancją `Error`, możesz zdecydować o alternatywnym sposobie obsługi.
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
