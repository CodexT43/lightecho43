export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }
  
    let body = '';
  
    req.on('data', chunk => {
      body += chunk;
    });
  
    req.on('end', () => {
      try {
        const { key } = JSON.parse(body);
        const expected = process.env.EXPECTED_KEY;
  
        if (!expected) {
          return res.status(500).json({ success: false, error: 'Missing expected key on server' });
        }
  
        if (key === expected) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(200).json({ success: false });
        }
      } catch (err) {
        return res.status(400).json({ success: false, error: 'Invalid JSON input' });
      }
    });
  }
  