# faites-mieux-toolbar
Barre d'accessibilité

# Faites Mieux v3.1 - Guide d'intégration

## La phrase magique à copier-coller

Ajoutez ces deux lignes dans le `<head>` de vos pages HTML :

```html
<link rel="stylesheet" href="https://alixb-accessible.github.io/faites-mieux-toolbar/faites-mieux.css">
<script src="https://alixb-accessible.github.io/faites-mieux-toolbar/faites-mieux.js" defer></script>
```

**C'est tout !** La barre d'outils d'accessibilité apparaîtra automatiquement sur votre site.

---

## Mode d'emploi pour les utilisateurs

### Comment l'activer ?

1. **Un bouton "A" apparaît en haut à gauche** de chaque page
2. **Survolez-le** : il affiche "Accessibilité / Paramètres"
3. **Cliquez dessus** : le panneau de réglages s'ouvre

### Fonctionnalités principales

#### 1. Déplacer le bouton
- **Cliquez et maintenez** sur le bouton "A"
- **Glissez-le** où vous voulez sur l'écran
- **Relâchez** : la position est sauvegardée automatiquement
- Pour remettre en haut à gauche : ouvrez le panneau > "Réinitialiser position du bouton"

#### 2. Thèmes visuels
- **Clair** : fond blanc, texte noir (par défaut)
- **Sombre** : fond noir, texte blanc
- **Sépia** : teinte chaude beige/marron
- **Rouge** : fond rouge clair pour daltoniens
- **Bleu** : fond bleu clair pour daltoniens
- **Contraste élevé** : noir et blanc strict avec bordures épaisses

#### 3. Polices accessibles
- **Défaut** : conserve la police du site (recommandé)
- **Lexend** : police moderne très lisible
- **Atkinson Hyperlegible** : conçue pour la basse vision
- **OpenDyslexic** : optimisée pour les dyslexiques
- **Inter** : police claire et élégante

#### 4. Réglages du texte
- **Taille** : de 12px à 32px
- **Luminosité** : de 50% à 150%
- **Interligne** : de 1.0 à 2.5
- **Espace lettres** : de 0px à 5px
- **Espace mots** : de 0px à 20px

#### 5. Mode FALC (Facile À Lire et à Comprendre)
- **Désactivé** : réglages manuels actifs
- **Niveau 1** : texte 18px, interligne 1.8
- **Niveau 2** : texte 20px, interligne 2.0
- **Niveau 3** : texte 22px, interligne 2.2

#### 6. Lecture vocale
- **Sélectionnez un texte** sur la page
- **Cliquez sur "Lire le texte"**
- Choisissez votre voix préférée dans la liste
- Ajustez la vitesse de lecture (0.5x à 2x)

#### 7. Sauvegarder vos préférences
- **Export** : télécharge vos réglages en fichier JSON
- **Import** : restaure vos réglages depuis un fichier JSON
- Utile pour utiliser les mêmes réglages sur plusieurs appareils

#### 8. Réinitialiser
- **Réinitialiser position** : remet le bouton en haut à gauche
- **Réinitialiser tout** : efface tous les réglages et revient aux paramètres par défaut

---

## Questions fréquentes

### Est-ce que ça modifie la police du site ?

**Non, par défaut.** L'option "Police" est réglée sur "Défaut (police du site)". 

La police du site est **conservée** tant que vous ne choisissez pas une autre police dans le menu déroulant.

### Est-ce que mes réglages sont sauvegardés ?

**Oui, automatiquement.** Tous vos réglages sont enregistrés dans votre navigateur. Ils seront restaurés lors de votre prochaine visite.

### Le bouton gêne ma lecture

**Déplacez-le !** Cliquez dessus et glissez-le où vous voulez. Sa nouvelle position sera sauvegardée.

### Je ne veux plus voir le bouton

Malheureusement, il n'y a pas d'option pour le masquer complètement. Mais vous pouvez le déplacer dans un coin discret de votre écran.

### Ça fonctionne sur mobile ?

**Oui !** Le bouton est tactile et peut être déplacé avec le doigt. L'interface s'adapte automatiquement à la taille de l'écran.

### C'est compatible avec les lecteurs d'écran ?

**Oui !** 
- Tous les textes sont lisibles (pas d'icônes)
- Le bouton a un label ARIA
- Un lien direct vers NVDA (lecteur d'écran gratuit) est disponible dans le panneau

---

## Important : Ce que cette barre NE fait PAS

Cette toolbar améliore la **lisibilité visuelle**, mais **ne remplace pas** les bonnes pratiques d'accessibilité de base.

### Vous devez TOUJOURS assurer :

#### Navigation au clavier
- Tous les liens et boutons doivent être accessibles au clavier (Tab, Entrée, Espace)
- L'ordre de tabulation doit être logique
- Le focus doit être visible (contour autour de l'élément actif)
- Les utilisateurs doivent pouvoir naviguer sans souris

#### Structure et sémantique
- **Fil d'ariane** : indiquez clairement où l'utilisateur se trouve sur votre site
- **Titres hiérarchisés** : H1, H2, H3 dans le bon ordre
- **Balises HTML sémantiques** : `<nav>`, `<main>`, `<article>`, `<footer>`, etc.
- **Textes alternatifs** sur les images
- **Labels** sur tous les champs de formulaire

#### Organisation du contenu
- Navigation claire et cohérente
- Lien "Aller au contenu principal" (skip link)
- Messages d'erreur explicites
- Instructions claires pour les formulaires

### Faire Mieux, c'est toujours possible

Cette barre d'outils est un **complément**, pas une solution complète. Elle aide vos utilisateurs à personnaliser leur expérience visuelle, mais **vous restez responsable** de la structure, la navigation et l'architecture de votre site.

**L'accessibilité commence par la conception, pas par les outils.**

---

## Pour les développeurs

### Compatibilité navigateurs
- Chrome 90+
- Edge 90+
- Firefox 57+
- Safari 14+
- Opera 76+

### Conflits potentiels

La barre d'outils utilise des ID et classes préfixés `fm-` pour éviter les conflits avec votre CSS.

La toolbar elle-même est **exclue** de tous les effets (thèmes, polices, tailles) pour rester toujours lisible.

### Désinstallation

Supprimez simplement les deux lignes du `<head>` de vos pages.

### Support et bugs

Pour signaler un bug ou demander une fonctionnalité, contactez Ti Racoon.

---

## Accessibilité WCAG

Cette barre d'outils aide à respecter les critères WCAG :

- **1.4.4** Redimensionnement du texte (AA)
- **1.4.6** Contraste amélioré (AAA)
- **1.4.8** Présentation visuelle (AAA)
- **1.4.12** Espacement du texte (AA)
- **2.5.5** Taille de la cible (AAA)

---

**Version 3.1** - Par Ti Racoon  
Voir la licence (surtout si vous n'êtes pas de gauche)
