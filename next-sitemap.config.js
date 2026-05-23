/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://zhijiexia.org',
    generateRobotsTxt: false,
    changefreq: 'weekly',
    priority: 0.5,
    transform: async (config, path) => {
        if (path === '/') {
            return { loc: path, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() }
        }
        if (path === '/posts') {
            return { loc: path, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() }
        }
        if (path.startsWith('/posts/')) {
            return { loc: path, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() }
        }
        return { loc: path, changefreq: 'weekly', priority: 0.5, lastmod: new Date().toISOString() }
    },
}
