// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'GET':
//       return handleGetRequest(req, res);
//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
//   const apiUrl = `https://api.envato.com/v1/market/popular:themeforest.json`;
//   await fetchData(apiUrl, res);
// }

// async function fetchData(apiUrl: string, res: NextApiResponse) {
//   try {
//     const response = await fetch(apiUrl, {
//       headers: {
//         'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`API responded with status code ${response.status}`);
//     }

//     const data = await response.json();
//     res.status(200).json(data);
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
// }
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return handleGetRequest(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const site = req.query.site || 'themeforest'; // Domyślnie 'themeforest' jeśli nie podano
  const popularApiUrl = `https://api.envato.com/v1/market/popular:${site}.json`;
  const categoriesApiUrl = `https://api.envato.com/v1/market/categories:${site}.json`;

  await fetchData([popularApiUrl, categoriesApiUrl], res);
}

async function fetchData(apiUrls: string[], res: NextApiResponse) {
  try {
    const responses = await Promise.all(apiUrls.map(url =>
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
        }
      })
    ));

    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`API responded with status code ${response.status}`);
      }
    }

    const data = await Promise.all(responses.map(response => response.json()));
    
    const [popularData, categoriesData] = data;

    res.status(200).json({ popular: popularData, categories: categoriesData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
