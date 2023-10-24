export default [
    { UserAgent: '*' },
    { Allow: '/' },
    { BlankLine: true },
    { Comment: 'Resume-ATS allows robots and points to the sitemap XML' },

    { Sitemap: (req) => `https://${req.headers.host}/sitemap.xml` }
]