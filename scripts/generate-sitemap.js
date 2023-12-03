const { readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function getAllHackathons() {
  const response = await fetch('https://api.hackquest.io/v1/projects');
  if (!response.ok) return [];

  const json = await response.json();
  const data = json.data || [];
  return data.map((item) => {
    const { id, updatedAt } = item;
    return {
      id,
      updatedAt: updatedAt.substring(0, 10)
    };
  });
}

(async function () {
  // read sitemap template
  const sitemapFile = resolve(__dirname, '../public/sitemap.xml');
  const content = await readFile(sitemapFile, 'utf8');

  // read hackathons
  const hackathons = await getAllHackathons();

  // generate sitemap
  const date = new Date();
  const today = date.toISOString().split('T')[0];
  const sitemap = content
    .replace(/<lastmod>([\d-]+)<\/lastmod>/g, '<lastmod>$1</lastmod>')
    .replace(
      '</urlset>',
      hackathons
        .map((hackathon) => {
          const { language, filename } = hackathon;
          return `<url>
  <loc>https://www.hackquest.io/resource-station/hackathon/projects/${hackathon.id}?projectId=${hackathon.id}&amp;menu=projects</loc>
  <lastmod>${hackathon.updatedAt}</lastmod>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>`;
        })
        .join('\n') + '\n</urlset>'
    );

  // write sitemap
  await writeFile(sitemapFile, sitemap, 'utf8');
})();
