# Faites Mieux v3.3 - Guide d'intégration

## La phrase magique à copier-coller

Ajoutez ces deux lignes dans le `<head>` de vos pages HTML :

```html
<link rel="stylesheet" href="https://alixb-accessible.github.io/faites-mieux-toolbar/faites-mieux.css">
<script src="https://alixb-accessible.github.io/faites-mieux-toolbar/faites-mieux.js" defer></script>
```

C'est tout ! La barre d'outils d'accessibilité apparaîtra automatiquement sur votre site.

## Mode d'emploi pour les utilisateurs

### Le bandeau d'accueil

À la première visite, un bandeau s'affiche en haut de la page : *"Besoin d'aide pour lire ou naviguer sur ce site ?"*. Trois choix sont proposés :

- **Oui, voir les options** : ferme le bandeau et ouvre directement le panneau de réglages
- **Non, merci** : ferme le bandeau pour cette fois ; il réapparaîtra à la prochaine visite
- **Ne plus me poser la question** : ferme le bandeau et ne le montre plus jamais sur cet appareil

Dans tous les cas, le bouton "A" reste visible en haut à gauche pour ouvrir le panneau à tout moment.

### Comment l'activer ?

1. Un bouton "A" apparaît en haut à gauche de chaque page
2. Survolez-le : il affiche "Accessibilité / Paramètres"
3. Cliquez dessus : le panneau de réglages s'ouvre

## Fonctionnalités principales

### 1. Déplacer le bouton

- Cliquez et maintenez sur le bouton "A"
- Glissez-le où vous voulez sur l'écran
- Relâchez : la position est sauvegardée automatiquement
- Pour remettre en haut à gauche : ouvrez le panneau > "Réinitialiser position du bouton"

### 2. Thèmes visuels

- **Clair** : fond blanc, texte noir (par défaut)
- **Sombre** : fond noir, texte blanc
- **Sépia** : teinte chaude beige/marron
- **Rouge** : fond rouge clair pour daltoniens
- **Bleu** : fond bleu clair pour daltoniens
- **Contraste élevé** : noir et blanc strict avec bordures épaisses

### 3. Polices accessibles

- **Défaut** : conserve la police du site (recommandé)
- **Lexend** : police moderne très lisible
- **Atkinson Hyperlegible** : conçue pour la basse vision
- **OpenDyslexic** : optimisée pour les dyslexiques
- **Inter** : police claire et élégante

### 4. Réglages du texte

- **Taille** : de 12px à 32px
- **Luminosité** : de 50% à 150%
- **Interligne** : de 1.0 à 2.5
- **Espace lettres** : de 0px à 5px
- **Espace mots** : de 0px à 20px

### 5. Mode FALC (Facile À Lire et à Comprendre)

- **Désactivé** : réglages manuels actifs
- **Niveau 1** : texte 18px, interligne 1.8
- **Niveau 2** : texte 20px, interligne 2.0
- **Niveau 3** : texte 22px, interligne 2.2

### 6. Tout en majuscules *(nouveau en v3.3)*

Une simple case à cocher dans le panneau permet d'afficher tout le texte de la page en majuscules.

- N'affecte que l'affichage visuel : le texte réel n'est pas modifié, donc la lecture vocale et les lecteurs d'écran continuent de lire le texte normalement
- Se combine avec les autres réglages (thème, taille, police, etc.)
- Le réglage est sauvegardé comme les autres et remis à zéro par "Réinitialiser tout"

### 7. Lecture vocale

- Sélectionnez un texte sur la page
- Cliquez sur "Lire le texte"
- Choisissez votre voix préférée dans la liste
- Ajustez la vitesse de lecture (0.5x à 2x)

### 8. Sauvegarder vos préférences

- **Export** : télécharge vos réglages en fichier JSON
- **Import** : restaure vos réglages depuis un fichier JSON
- Utile pour utiliser les mêmes réglages sur plusieurs appareils

### 9. Réinitialiser

- **Réinitialiser position** : remet le bouton en haut à gauche
- **Réinitialiser tout** : efface tous les réglages (y compris le bandeau d'accueil masqué) et revient aux paramètres par défaut

## Questions fréquentes

**Est-ce que ça modifie la police du site ?**
Non, par défaut. L'option "Police" est réglée sur "Défaut (police du site)". La police du site est conservée tant que vous ne choisissez pas une autre police dans le menu déroulant.

**Est-ce que mes réglages sont sauvegardés ?**
Oui, automatiquement. Tous vos réglages sont enregistrés dans votre navigateur. Ils seront restaurés lors de votre prochaine visite.

**Le bouton gêne ma lecture**
Déplacez-le ! Cliquez dessus et glissez-le où vous voulez. Sa nouvelle position sera sauvegardée.

**Je ne veux plus voir le bouton**
Malheureusement, il n'y a pas d'option pour le masquer complètement. Mais vous pouvez le déplacer dans un coin discret de votre écran.

**Ça fonctionne sur mobile ?**
Oui ! Le bouton est tactile et peut être déplacé avec le doigt. L'interface s'adapte automatiquement à la taille de l'écran.

**C'est compatible avec les lecteurs d'écran ?**
Oui !
- Tous les textes sont lisibles (pas d'icônes)
- Le bouton a un label ARIA
- Un lien direct vers NVDA (lecteur d'écran gratuit) est disponible dans le panneau

## Important : Ce que cette barre NE fait PAS

Cette toolbar améliore la lisibilité visuelle, mais ne remplace pas les bonnes pratiques d'accessibilité de base.

Vous devez TOUJOURS assurer :

### Navigation au clavier
- Tous les liens et boutons doivent être accessibles au clavier (Tab, Entrée, Espace)
- L'ordre de tabulation doit être logique
- Le focus doit être visible (contour autour de l'élément actif)
- Les utilisateurs doivent pouvoir naviguer sans souris

### Structure et sémantique
- Fil d'ariane : indiquez clairement où l'utilisateur se trouve sur votre site
- Titres hiérarchisés : H1, H2, H3 dans le bon ordre
- Balises HTML sémantiques : `<nav>`, `<main>`, `<article>`, `<footer>`, etc.
- Textes alternatifs sur les images
- Labels sur tous les champs de formulaire

### Organisation du contenu
- Navigation claire et cohérente
- Lien "Aller au contenu principal" (skip link)
- Messages d'erreur explicites
- Instructions claires pour les formulaires

## Faire Mieux, c'est toujours possible

Cette barre d'outils est un complément. Elle aide vos utilisateurs à personnaliser leur expérience visuelle, mais vous restez responsable de la structure, la navigation et l'architecture de votre site.

L'accessibilité commence par la conception.

## Pour les développeurs

### Compatibilité navigateurs
- Chrome 90+
- Edge 90+
- Firefox 57+
- Safari 14+
- Opera 76+

### Conflits potentiels

La barre d'outils utilise des ID et classes préfixés `fm-` pour éviter les conflits avec votre CSS.

La toolbar elle-même, le bouton "A" et le bandeau d'accueil sont exclus de tous les effets (thèmes, polices, tailles, majuscules) pour rester toujours lisibles.

### Désinstallation

Supprimez simplement les deux lignes du `<head>` de vos pages.

### Support et bugs

Pour signaler un bug ou demander une fonctionnalité, contactez Ti Racoon.

### Accessibilité WCAG

Cette barre d'outils aide à respecter les critères WCAG :
- 1.4.4 Redimensionnement du texte (AA)
- 1.4.6 Contraste amélioré (AAA)
- 1.4.8 Présentation visuelle (AAA)
- 1.4.12 Espacement du texte (AA)
- 2.5.5 Taille de la cible (AAA)


Version 3.3 - Par Ti Racoon
Voir la licence (surtout si vous n'êtes pas de gauche -je parle de la VRAIE gauche, antivalidiste, antisaniste, humaniste, antiraciste, etc...)
