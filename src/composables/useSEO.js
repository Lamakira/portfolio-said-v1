import { onMounted } from 'vue';
import { useHead } from '@unhead/vue';

export function useSEO() {
  /**
   * Set page meta tags dynamically
   * @param {string} title - Page title
   * @param {string} description - Page description
   * @param {string} keywords - Page keywords (optional)
   * @param {string} image - OG image URL (optional)
   */
  const setPageMeta = (title, description, keywords = '', image = '/assets/og-image.jpg') => {
    const fullTitle = title.includes('Portfolio') ? title : `${title} - Portfolio Saïd Arikama Chabi`;
    const siteUrl = 'https://saidac.dev';
    
    useHead({
      title: fullTitle,
      meta: [
        // Basic meta tags
        { name: 'description', content: description },
        { name: 'keywords', content: keywords },
        
        // OpenGraph tags
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${siteUrl}${image}` },
        { property: 'og:url', content: siteUrl },
        { property: 'og:type', content: 'website' },
        
        // Twitter Card tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: fullTitle },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${siteUrl}${image}` },
      ],
    });
  };

  /**
   * Add JSON-LD structured data
   * @param {object} data - Structured data object
   */
  const addStructuredData = (data) => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(data),
        },
      ],
    });
  };

  /**
   * Set default Person schema
   */
  const setPersonSchema = () => {
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Saïd Arikama Chabi',
      jobTitle: 'Développeur Web, Data Analyst & Administrateur Réseau',
      description: 'Ingénieur polyvalent spécialisé en développement web, analyse de données et infrastructure réseau',
      email: 'said.arikama-chabi@epitech.eu',
      url: 'https://saidac.dev',
      sameAs: [
        'https://linkedin.com/in/saïd-arikama-chabi',
        'https://github.com/Lamakira'
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Coding Academy by EPITECH Bénin'
      },
      knowsAbout: [
        'Web Development',
        'Data Analysis',
        'Network Administration',
        'Vue.js',
        'Python',
        'Laravel',
        'Machine Learning',
        'Deep Learning'
      ]
    };
    
    addStructuredData(personSchema);
  };

  return {
    setPageMeta,
    addStructuredData,
    setPersonSchema,
  };
}
