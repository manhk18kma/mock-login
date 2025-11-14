const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const port = 3003;
const buildDir = path.join(__dirname, 'build');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

const compressibleTypes = ['.html', '.js', '.css', '.json'];

const server = http.createServer((req, res) => {
  let filePath = path.join(buildDir, req.url === '/' ? 'index.html' : req.url);
  
  // SPA fallback - serve index.html for all routes
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(buildDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const shouldCompress = compressibleTypes.includes(ext);
  const acceptEncoding = req.headers['accept-encoding'] || '';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    // Set cache headers for static assets
    if (ext === '.js' || ext === '.css' || ext === '.png' || ext === '.jpg') {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    // Gzip compression
    if (shouldCompress && acceptEncoding.includes('gzip')) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip'
      });
      zlib.gzip(content, (err, compressed) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        } else {
          res.end(compressed);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

