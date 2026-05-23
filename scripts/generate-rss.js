const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://zhijiexia.org';
const SITE_TITLE = 'Zhijie Xia';
const SITE_DESCRIPTION = 'Technical blog about LeetCode, CUDA, reinforcement learning, DevOps, and competitive programming.';

const postsDirectory = path.join(process.cwd(), 'posts');

function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      if (matterResult.data.draft) return null;
      return { id, ...matterResult.data };
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRss() {
  const posts = getSortedPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/posts/${post.id}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || post.title)}</description>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(outputPath, rss);
  console.log(`RSS feed generated at ${outputPath} with ${posts.length} posts`);
}

generateRss();
