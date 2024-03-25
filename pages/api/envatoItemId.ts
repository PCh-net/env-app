import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemId } = req.query;

  if (typeof itemId !== 'string') {
    return res.status(400).json({ error: 'itemId is required and must be a string' });
  }

  const url = `https://api.envato.com/v3/market/catalog/item?id=${itemId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status code ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {

      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
