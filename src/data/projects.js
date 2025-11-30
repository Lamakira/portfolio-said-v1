export const projectsData = [
  {
    slug: 'yowl',
    title: 'YOWL',
    baseline: 'Plateforme d\'avis et de commentaires communautaire',
    description: `YOWL est une plateforme web permettant la gestion d’avis utilisateurs : création de compte, publication d’avis, consultation, sécurisation et validation des données, séparation MVC Laravel + SPA Vue.js, architecture REST propre.
    
    C’est un projet mettant en pratique une vraie séparation frontend/backend, ainsi qu’une implémentation propre des patterns MVC, de l’authentification, et d’une interface dynamique.`,
    tags: ['Laravel', 'Vue.js', 'MySQL', 'TailwindCSS'],
    features: [
      {
        title: 'Gestion Utilisateurs',
        description: 'Système complet d\'inscription, connexion et gestion de profil sécurisé.',
        icon: 'UserIcon'
      },
      {
        title: 'Système d\'Avis',
        description: 'Publication, modification et suppression de commentaires en temps réel.',
        icon: 'ChatBubbleBottomCenterTextIcon'
      },
      {
        title: 'Architecture Hybride',
        description: 'Backend API REST Laravel robuste couplé à un Frontend réactif Vue.js.',
        icon: 'ServerStackIcon'
      },
      {
        title: 'Sécurité & Validation',
        description: 'Protection CSRF, validation des entrées et gestion des droits utilisateurs.',
        icon: 'ShieldCheckIcon'
      }
    ],
    techStack: {
      frontend: ['Vue.js', 'TailwindCSS', 'Axios', 'Vue Router'],
      backend: ['Laravel', 'MySQL', 'Eloquent ORM', 'Sanctum'],
      tools: ['Git', 'Postman', 'Figma', 'VS Code']
    },
    metadata: {
      date: '2025',
      duration: '2 semaines',
      role: 'Fullstack Developer',
      github: 'https://github.com/Lamakira/yowl-full',
      link: 'https://yowl-frontend-v1.vercel.app/'
    },
    challenges: [
      'Gérer l\'authentification SPA avec Laravel Sanctum.',
      'Optimiser les requêtes Eloquent pour les listes d\'avis chargées.',
      'Assurer une expérience utilisateur fluide malgré la séparation Front/Back.'
    ],
    learnings: [
      'Maîtrise de l\'architecture API RESTful.',
      'Communication efficace entre Vue.js et Laravel.',
      'Importance de la validation des données côté serveur et client.'
    ]
  },
  {
    slug: 'freeads',
    title: 'FreeAds',
    baseline: 'Le marketplace de petites annonces sécurisé',
    description: `FreeAds est un site complet de petites annonces développé en Laravel. Il inclut : un système complet d’authentification, vérification email Laravel, CRUD complet des annonces, gestion des photos, filtres (catégorie, lieu, prix), barre de recherche, pages Home / Détail / Edit / Profile, Eloquent ORM, architecture MVC propre.
    
    C’est un projet robuste centré sur la qualité des données, la sécurité, la navigation utilisateur et la structuration du code.`,
    tags: ['Laravel', 'PHP', 'Blade', 'MySQL'],
    features: [
      {
        title: 'CRUD Annonces',
        description: 'Création, lecture, mise à jour et suppression d\'annonces avec upload d\'images.',
        icon: 'DocumentPlusIcon'
      },
      {
        title: 'Recherche Avancée',
        description: 'Filtrage par mots-clés, catégories, prix et localisation.',
        icon: 'MagnifyingGlassIcon'
      },
      {
        title: 'Authentification',
        description: 'Inscription avec vérification d\'email et gestion de mot de passe.',
        icon: 'LockClosedIcon'
      },
      {
        title: 'Dashboard Utilisateur',
        description: 'Espace dédié pour gérer ses propres annonces et informations personnelles.',
        icon: 'UserCircleIcon'
      }
    ],
    techStack: {
      frontend: ['Blade Templates', 'TailwindCSS', 'JavaScript'],
      backend: ['Laravel', 'MySQL', 'Eloquent ORM', 'Mailtrap'],
      tools: ['Git', 'Composer', 'MySQL Workbench']
    },
    metadata: {
      date: '2025',
      duration: '1 semaine',
      role: 'Backend Developer',
      github: 'https://github.com/Lamakira/Free_ads',
      link: 'https://swk.coding-academy.website/home'
    },
    challenges: [
      'Implémentation complexe de la recherche multicritères.',
      'Gestion sécurisée de l\'upload et du stockage des images.',
      'Mise en place de la vérification d\'email.'
    ],
    learnings: [
      'Approfondissement du framework Laravel.',
      'Utilisation avancée de l\'ORM Eloquent.',
      'Bonnes pratiques de sécurité web (XSS, CSRF, SQL Injection).'
    ]
  },
  {
    slug: 'postit',
    title: 'Post-it SPA',
    baseline: 'Gestionnaire de notes moderne et réactif',
    description: `Post-it SPA est une application Vue.js structurée en MVVM. Deux versions : 
    1️⃣ Version LocalStorage : Liste de notes, Détail, Navigation entre les notes, Persistance locale.
    2️⃣ Version API connectée : Fetch API, consommation d’API distante, Vue Router officiel, Vuex, architecture propre.
    
    C’est un excellent exercice de structuration, de modularité et de communication entre composants.`,
    tags: ['Vue.js', 'API REST', 'LocalStorage'],
    features: [
      {
        title: 'Architecture MVVM',
        description: 'Séparation claire entre la Vue, le Modèle et la Vue-Modèle.',
        icon: 'CubeTransparentIcon'
      },
      {
        title: 'Double Mode de Données',
        description: 'Supporte à la fois le stockage local (LocalStorage) et distant (API).',
        icon: 'ArrowsRightLeftIcon'
      },
      {
        title: 'Gestion d\'État Vuex',
        description: 'Centralisation de l\'état de l\'application pour une meilleure maintenabilité.',
        icon: 'CircleStackIcon'
      },
      {
        title: 'Routage Dynamique',
        description: 'Navigation fluide sans rechargement de page grâce à Vue Router.',
        icon: 'MapIcon'
      }
    ],
    techStack: {
      frontend: ['Vue.js', 'Vue Router', 'TailwindCSS'],
      backend: ['Node.js (Mock API)', 'LocalStorage'],
      tools: ['Git', 'NPM', 'ESLint']
    },
    metadata: {
      date: '2025',
      duration: '1 semaine',
      role: 'Frontend Developer',
      github: 'https://github.com/Lamakira/Post-it-app',
      link: 'https://post-it-app-phi.vercel.app/'
    },
    challenges: [
      'Gérer la synchronisation entre l\'état local et l\'API.',
      'Comprendre et implémenter le pattern MVVM en Vue.js.',
      'Gérer les états de chargement et d\'erreur de l\'API.'
    ],
    learnings: [
      'Maîtrise du cycle de vie des composants Vue.',
      'Gestion avancée de l\'état avec Vuex.',
      'Consommation d\'API asynchrone avec Fetch/Axios.'
    ]
  }
];
