const { readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

async function getAllProjects(type = 'projects') {
  const response = await fetch('https://api.hackquest.io/v1/' + type);
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
  const projects = await getAllProjects();
  const hackathons = await getAllProjects('hackathons');
  const blogs = await getAllProjects('blogs');

  const urls = [
    ...projects.map(
      (project) => `<url>
  <loc>https://www.hackquest.io/hackathon/projects/${project.alias}?hackathonId=${project.id}&amp;menu=projects</loc>
  <lastmod>${project.updatedAt}</lastmod>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>`
    ),
    ...hackathons.map(
      (hackathon) => `<url>
  <loc>https://www.hackquest.io/hackathon/${hackathon.id}?hackathonId=${hackathon.id}&amp;menu=hackathon</loc>
  <lastmod>${hackathon.updatedAt}</lastmod>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>`
    ),
    ...blogs.map(
      (blog) => `<url>
  <loc>https://www.hackquest.io/blog/${blog.id}</loc>
  <lastmod>${blog.updatedAt}</lastmod>
  <priority>0.8</priority>
  <changefreq>weekly</changefreq>
</url>`
    )
  ];

  // generate sitemap
  const date = new Date();
  const today = date.toISOString().split('T')[0];
  const sitemap = content
    .replace(/<lastmod>([\d-]+)<\/lastmod>/g, '<lastmod>$1</lastmod>')
    .replace('</urlset>', urls.join('\n') + '\n</urlset>');

  // write sitemap
  await writeFile(sitemapFile, sitemap, 'utf8');
})();
