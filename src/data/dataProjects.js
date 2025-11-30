// Use new URL() syntax for Vite image imports
const edaImage = new URL('../assets/images/data/eda.png', import.meta.url).href;
const deepLearningImage = new URL('../assets/images/data/deep_learning.png', import.meta.url).href;
const nlpImage = new URL('../assets/images/data/nlp.png', import.meta.url).href;

export const dataProjects = [
  {
    slug: 'eda',
    title: 'Analyse Exploratoire de Données E-commerce',
    description: 'Exploration approfondie d\'un dataset e-commerce pour extraire des insights business actionnables et transformer les données brutes en informations stratégiques.',
    summary: `Ce projet d'analyse exploratoire de données (EDA) porte sur un dataset e-commerce complet. J'ai réalisé une mise en qualité des données, identifié les KPIs clés, créé un dashboard Power BI interactif, analysé les corrélations, effectué une segmentation clients et détecté les anomalies.

L'objectif était de fournir une vue d'ensemble complète du comportement client et des performances commerciales, permettant aux décideurs de prendre des décisions éclairées basées sur les données.`,
    tags: ['Python', 'Pandas', 'Power BI', 'NumPy', 'Seaborn', 'Matplotlib'],
    cover: edaImage,
    gallery: [edaImage],
    steps: [
      {
        title: 'Nettoyage et Préparation',
        content: 'Traitement des valeurs manquantes, détection et gestion des outliers, normalisation des formats de données, création de features dérivées.'
      },
      {
        title: 'Analyse des KPIs',
        content: 'Identification et calcul des indicateurs clés : taux de conversion, panier moyen, valeur vie client (CLV), taux de rétention, saisonnalité des ventes.'
      },
      {
        title: 'Dashboard Power BI',
        content: 'Création d\'un tableau de bord interactif permettant de visualiser les tendances, les segments clients, les produits phares et les performances par région.'
      },
      {
        title: 'Segmentation Clients',
        content: 'Application de techniques de clustering (K-means) pour identifier les profils clients distincts et adapter les stratégies marketing.'
      },
      {
        title: 'Détection d\'Anomalies',
        content: 'Identification des transactions suspectes et des comportements atypiques pour améliorer la sécurité et la qualité des données.'
      }
    ],
    github: 'https://github.com/Lamakira/data-eda-e_commerce',
    link: null
  },
  {
    slug: 'deep-learning',
    title: 'Classification d\'Images Fashion MNIST',
    description: 'Implémentation de réseaux de neurones (MLP et CNN) pour classifier des vêtements avec TensorFlow et Keras, démontrant ma maîtrise du Deep Learning.',
    summary: `Ce projet de Deep Learning porte sur la classification d'images du dataset Fashion MNIST, contenant 70 000 images de vêtements en niveaux de gris (28x28 pixels) réparties en 10 catégories.

J'ai développé et comparé deux architectures : un perceptron multicouche (MLP) et un réseau de neurones convolutif (CNN). Le projet inclut la préparation des données, l'entraînement des modèles, l'évaluation des performances avec matrices de confusion et courbes d'apprentissage.`,
    tags: ['Deep Learning', 'TensorFlow', 'Keras', 'CNN', 'Python', 'NumPy'],
    cover: deepLearningImage,
    gallery: [deepLearningImage],
    steps: [
      {
        title: 'Préparation des Données',
        content: 'Normalisation des pixels (0-1), reshape des images, one-hot encoding des labels, séparation train/validation/test.'
      },
      {
        title: 'Architecture MLP',
        content: 'Réseau dense avec plusieurs couches cachées, activation ReLU, dropout pour régularisation. Précision obtenue : ~88%.'
      },
      {
        title: 'Architecture CNN',
        content: 'Réseau convolutif avec couches Conv2D, MaxPooling, Flatten et Dense. Utilisation de filtres pour extraire les features. Précision obtenue : ~92%.'
      },
      {
        title: 'Entraînement et Optimisation',
        content: 'Utilisation d\'Adam optimizer, categorical crossentropy loss, early stopping, learning rate scheduling.'
      },
      {
        title: 'Évaluation',
        content: 'Matrices de confusion pour analyser les erreurs de classification, courbes d\'apprentissage (loss/accuracy), visualisation des prédictions.'
      }
    ],
    github: 'https://github.com/Lamakira/deep-learning-mnist',
    link: 'https://github.com/zalandoresearch/fashion-mnist'
  },
  {
    slug: 'nlp',
    title: 'Topic Modeling et Analyse Textuelle',
    description: 'Extraction automatique de thèmes à partir de corpus textuels avec TF-IDF et LSA, démontrant mes compétences en traitement du langage naturel.',
    summary: `Ce projet de NLP (Natural Language Processing) vise à extraire automatiquement les thèmes principaux d'un corpus de documents textuels. J'ai utilisé des techniques avancées comme TF-IDF, LSA (Latent Semantic Analysis) et le clustering thématique.

Le pipeline complet inclut le preprocessing du texte, la vectorisation TF-IDF, la réduction de dimensionnalité avec LSA, le clustering K-means, la génération de word clouds et le calcul de similarité cosinus entre documents.`,
    tags: ['NLP', 'TF-IDF', 'LSA', 'Scikit-learn', 'Python', 'NLTK'],
    cover: nlpImage,
    gallery: [nlpImage],
    steps: [
      {
        title: 'Preprocessing Textuel',
        content: 'Tokenization, suppression des stopwords, lemmatisation, nettoyage des caractères spéciaux, normalisation.'
      },
      {
        title: 'Vectorisation TF-IDF',
        content: 'Transformation du texte en vecteurs numériques avec TF-IDF (Term Frequency-Inverse Document Frequency) pour capturer l\'importance des mots.'
      },
      {
        title: 'Réduction de Dimensionnalité (LSA)',
        content: 'Application de Latent Semantic Analysis pour réduire la dimensionnalité et capturer les relations sémantiques latentes entre les documents.'
      },
      {
        title: 'Clustering Thématique',
        content: 'Utilisation de K-means pour regrouper les documents par thèmes similaires. Détermination du nombre optimal de clusters avec la méthode du coude.'
      },
      {
        title: 'Visualisation et Insights',
        content: 'Génération de word clouds pour chaque cluster, calcul de similarité cosinus entre documents, extraction des mots-clés représentatifs de chaque thème.'
      }
    ],
    github: 'https://github.com/Lamakira/data-nlp',
    link: null
  }
];
