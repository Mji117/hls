export default async (req, res) => {
  const path = req.query.path || [];
  const segmentUrl = `https://live.kwikmotion.com/syriatv02live/syriatv02.smil/syriatv02publish/syriatv02_720p/${path.join('/')}`;

  try {
    const response = await fetch(segmentUrl);

    if (!response.ok) throw new Error('Failed to fetch segment');

    res.setHeader('Content-Type', 'video/MP2T');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
