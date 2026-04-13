import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-projects-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/save-projects' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', () => {
              try {
                const { projects } = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data/projects.js');
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                
                // Replace the inProgressProjects array in the file
                const regex = /(export const inProgressProjects = )\[[\s\S]*?\];/;
                const newContent = fileContent.replace(regex, `$1${JSON.stringify(projects, null, 2)};`);
                
                fs.writeFileSync(filePath, newContent);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                console.error('Save Error:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: error.message }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  base: '/',
})

