import { MetadataRoute } from 'next'
import { blogs } from '@/data/blogs'
import { projects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pureplanet.net.au'

    // 1. Static Routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/faqs',
        '/installer',
        '/our-work',
        '/partner-program',
        '/privacy-policy',
        '/quote-form',
        '/services',
        '/services/heat-pump',
        '/services/home-battery',
        '/services/solar-panels',
        '/terms-conditions',
        '/calculator',
        '/blogs',
    ]

    const staticMap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // 2. Blog Posts
    const blogMap = blogs.map((post) => ({
        url: `${baseUrl}/blogs/${post.slug}`,
        lastModified: new Date(post.date), // Assuming date format is parsable or valid
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // 3. Projects
    const projectMap = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(), // Projects likely don't have update dates in the object, using current
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...staticMap, ...blogMap, ...projectMap]
}
