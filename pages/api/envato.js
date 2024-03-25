export default async function handler(req, res) {
  const response = await fetch('https://api.envato.com/v1/market/random-new-files:themeforest.json', {
    headers: {
      'Authorization': `Bearer ${process.env.ENVATO_TOKEN}`
    }
  });
  const data = await response.json();
  res.status(200).json(data);
}
