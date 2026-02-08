export const siteContent = {
    meta: {
        siteTitle: "Dermai App",
        shortTitle: "Dermai",
        description: "Dermai — lightweight dermatology companion for clinics and research.",
        language: "en-US",
        author: "Dermai Team"
    },

    nav: [
        { id: "home", label: "Home", path: "/" },
        { id: "cases", label: "Cases", path: "/cases" },
        { id: "tools", label: "Tools", path: "/tools" },
        { id: "about", label: "About", path: "/about" },
        { id: "contact", label: "Contact", path: "/contact" }
    ],

    hero: {
        title: "Dermatology tools, simplified",
        subtitle: "Fast case entry, visual reports, secure patient data and research-ready exports.",
        ctaPrimary: { label: "Get Started", path: "/cases/new" },
        ctaSecondary: { label: "Learn More", path: "/about" }
    },

    features: [
        {
            id: "fast-entry",
            title: "Fast Case Entry",
            description: "Structured forms and smart autocomplete to capture cases quickly."
        },
        {
            id: "visual-reports",
            title: "Visual Reports",
            description: "Generate comparison views and downloadable image reports for patients."
        },
        {
            id: "secure-data",
            title: "Secure Data",
            description: "Role-based access and encrypted storage to protect patient information."
        },
        {
            id: "research-exports",
            title: "Research Exports",
            description: "Export anonymized datasets (CSV/JSON) for analysis and publication."
        }
    ],

    pages: {
        home: {
            title: "Welcome to Dermai",
            lead: "A simple, reliable dermatology platform for clinicians and researchers.",
            sections: [
                { id: "why", heading: "Why Dermai", content: "Designed for clinical workflows with minimal friction." },
                { id: "how", heading: "How it works", content: "Capture cases, attach images, and produce reports in minutes." }
            ]
        },

        about: {
            title: "About Dermai",
            content: "Dermai was built to streamline dermatology case management and enable reproducible research."
        },

        contact: {
            title: "Contact",
            email: "contact@dermai.app",
            support: { phone: null, hours: "Mon–Fri, 09:00–17:00" }
        }
    },

    footer: {
        copyright: `© ${new Date().getFullYear()} Dermai`,
        links: [
            { label: "Privacy", path: "/privacy" },
            { label: "Terms", path: "/terms" }
        ],
        social: {
            twitter: "https://twitter.com/dermai",
            github: "https://github.com/dermai-app"
        }
    },

    defaults: {
        locale: "en",
        itemsPerPage: 20,
        dateFormat: "yyyy-MM-dd"
    }
};

export default siteContent;