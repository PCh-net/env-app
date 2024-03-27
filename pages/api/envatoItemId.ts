// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { itemId } = req.query;

//   if (typeof itemId !== 'string') {
//     return res.status(400).json({ error: 'itemId is required and must be a string' });
//   }

//   const url = `https://api.envato.com/v3/market/catalog/item?id=${itemId}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`API responded with status code ${response.status}`);
//     }

//     const data = await response.json();
    
//     res.status(200).json(data);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: "An unknown error occurred" });
//     }
//   }
// }
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { itemId } = req.query;
  const page = req.query.page || '1';
  const pageSize = req.query.page_size || '6';

  if (typeof itemId !== 'string') {
    return res.status(400).json({ error: 'itemId is required and must be a string' });
  }

  const productDetailsUrl = `https://api.envato.com/v3/market/catalog/item?id=${itemId}`;
  const similarProductsUrl = `https://api.envato.com/v1/discovery/search/search/more_like_this?item_id=${itemId}&page=${page}&page_size=${pageSize}`;

  try {
    const [productResponse, similarResponse] = await Promise.all([
      fetch(productDetailsUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
        }
      }),
      fetch(similarProductsUrl, {
        headers: {
          'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
        }
      })
    ]);

    if (!productResponse.ok) {
      throw new Error(`Product API responded with status code ${productResponse.status}`);
    }
    if (!similarResponse.ok) {
      throw new Error(`Similar API responded with status code ${similarResponse.status}`);
    }
    const productData = await productResponse.json();
    const similarData = await similarResponse.json();

    const responseData = {
      productDetails: productData,
      similarProducts: similarData
    };

    
    res.status(200).json(responseData);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
