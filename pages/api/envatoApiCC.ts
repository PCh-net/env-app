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
  const apiUrl = `https://api.envato.com/v1/market/popular:codecanyon.json`;
  await fetchData(apiUrl, res);
}

async function fetchData(apiUrl: string, res: NextApiResponse) {
  try {
    const response = await fetch(apiUrl, {
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
