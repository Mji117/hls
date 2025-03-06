export default async (req, res) => {
  const path = req.query.path || [];
  const url = `https://live.kwikmotion.com/syriatv02live/syriatv02.smil/syriatv02publish/syriatv02_720p/chunks.m3u8/${path.join('/')}`;

  try {
    const response = await fetch(url);
    let text = await response.text();

    // Modify segment URLs to point to the Vercel proxy
    text = text.replace(/(chunk_.*\.ts)/g, '/api/segments/$1');

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
