import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryName, page, pageSize } = req.query;

  const productDetailsUrl = `https://api.envato.com/v1/discovery/search/search/item?category=${categoryName}&page=${page}&page_size=${pageSize || 12}&site=themeforest.net&sort_by=trending`;

  try {
    const productResponse = await fetch(productDetailsUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
      }
    });

    if (!productResponse.ok) {
      throw new Error(`Product API responded with status code ${productResponse.status}`);
    }
    
    const productData = await productResponse.json();
    if (productData && productData.matches && productData.matches.length === 0) {
      return res.status(200).json({ productDetails: productData, message: "No data available for the given criteria." });
    }
    
    res.status(200).json({ productDetails: productData });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
