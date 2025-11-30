/* Faites Mieux - Toolbar d'accessibilité universelle
   Par Ti Racoon
   Version 1.0
*/

(function() {
  'use strict';
  
  // Variables globales
  const fm = {
    settings: {
      theme: "light",
      font: "Lexend",
      fontSize: 16,
      brightness: 1,
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0
    },
    
    save: function() {
      try {
        localStorage.setItem("fm-settings", JSON.stringify(this.settings));
      } catch(e) {
        console.error('Erreur sauvegarde:', e);
      }
    },
    
    load: function() {
      try {
        const s = localStorage.getItem("fm-settings");
        if(s) {
          this.settings = JSON.parse(s);
        }
      } catch(e) {
        console.error('Erreur chargement:', e);
      }
    },
    
    apply: function() {
      // Application de la police sur body
      document.body.style.fontFamily = this.settings.font + ', sans-serif';
      
      // Application de la taille
      document.body.style.fontSize = this.settings.fontSize + 'px';
      
      // Application de l'interligne
      document.body.style.lineHeight = this.settings.lineHeight;
      
      // Application de l'espacement lettres
      document.body.style.letterSpacing = this.settings.letterSpacing + 'px';
      
      // Application de l'espacement mots
      document.body.style.wordSpacing = this.settings.wordSpacing + 'px';
      
      // Application de la luminosité
      let filterValue = 'brightness(' + this.settings.brightness + ')';
      
      // Application du thème
      document.body.classList.remove('fm-theme-light', 'fm-theme-dark', 'fm-theme-sepia', 'fm-theme-high-contrast');
      document.body.classList.add('fm-applied', 'fm-theme-' + this.settings.theme);
      
      if(this.settings.theme === 'dark') {
        filterValue += ' invert(1) hue-rotate(180deg)';
      } else if(this.settings.theme === 'sepia') {
        filterValue += ' sepia(0.3)';
      } else if(this.settings.theme === 'high-contrast') {
        filterValue += ' contrast(2)';
      }
      
      document.body.style.filter = filterValue;
    },
    
    exportJSON: function() {
      const data = JSON.stringify(this.settings, null, 2);
      const blob = new Blob([data], {type: "application/json"});
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "fm-settings.json";
      a.click();
    },
    
    importJSON: function(file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const imp = JSON.parse(e.target.result);
          Object.assign(this.settings, imp);
          this.apply();
          this.save();
          alert("Préférences importées !");
        } catch(err) {
          alert("Erreur import JSON: " + err);
        }
      };
      reader.readAsText(file);
    },
    
    speak: function(text) {
      if(!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1;
      window.speechSynthesis.speak(u);
    }
  };
  
  // HTML de la toolbar
  const toolbarHTML = `
    <button id="fm-toggle-btn" aria-label="Ouvrir les paramètres d'accessibilité" aria-expanded="false">
      Accessibilité / Paramètres
    </button>
    
    <div id="fm-toolbar" role="dialog" aria-label="Barre d'outils d'accessibilité">
      <header>
        <h2>Faites Mieux</h2>
        <button class="fm-close" aria-label="Fermer">×</button>
      </header>
      
      <div class="fm-section">
        <label for="fm-theme">Thème</label>
        <select id="fm-theme" class="fm-control">
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
          <option value="sepia">Sépia</option>
          <option value="high-contrast">Contraste élevé</option>
        </select>
      </div>
      
      <div class="fm-section">
        <label for="fm-font">Police</label>
        <select id="fm-font" class="fm-control">
          <option value="Lexend">Lexend</option>
          <option value="Atkinson Hyperlegible">Atkinson Hyperlegible</option>
          <option value="OpenDyslexic">OpenDyslexic</option>
          <option value="Inter">Inter</option>
        </select>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-fontSize">Taille</label>
        <input type="range" min="12" max="32" step="1" value="16" id="fm-fontSize">
        <span class="fm-value" id="fm-fontSize-val">16px</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-brightness">Luminosité</label>
        <input type="range" min="0.5" max="2" step="0.05" value="1" id="fm-brightness">
        <span class="fm-value" id="fm-brightness-val">100%</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-lineHeight">Interligne</label>
        <input type="range" min="1" max="2.5" step="0.1" value="1.6" id="fm-lineHeight">
        <span class="fm-value" id="fm-lineHeight-val">1.6</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-letterSpacing">Espace lettres</label>
        <input type="range" min="0" max="5" step="0.5" value="0" id="fm-letterSpacing">
        <span class="fm-value" id="fm-letterSpacing-val">0px</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-wordSpacing">Espace mots</label>
        <input type="range" min="0" max="20" step="1" value="0" id="fm-wordSpacing">
        <span class="fm-value" id="fm-wordSpacing-val">0px</span>
      </div>
      
      <div class="fm-section fm-row">
        <button class="fm-btn" id="fm-read">Lire le texte</button>
      </div>
      
      <div class="fm-section fm-row">
        <button class="fm-btn" id="fm-export">Exporter</button>
        <label class="fm-btn" style="margin:0;cursor:pointer;">
          Importer
          <input type="file" id="fm-import" accept=".json" style="display:none;">
        </label>
      </div>
    </div>
  `;
  
  // Initialisation au chargement de la page
  function init() {
    // Chargement des paramètres
    fm.load();
    
    // Injection du HTML
    const container = document.createElement('div');
    container.innerHTML = toolbarHTML;
    document.body.appendChild(container);
    
    // Récupération des éléments
    const toggleBtn = document.getElementById('fm-toggle-btn');
    const toolbar = document.getElementById('fm-toolbar');
    const closeBtn = toolbar.querySelector('.fm-close');
    
    // Gestion ouverture/fermeture
    toggleBtn.addEventListener('click', function() {
      const isVisible = toolbar.classList.contains('visible');
      toolbar.classList.toggle('visible');
      toggleBtn.setAttribute('aria-expanded', !isVisible);
    });
    
    closeBtn.addEventListener('click', function() {
      toolbar.classList.remove('visible');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
    
    // Event listeners pour les contrôles
    document.getElementById('fm-theme').value = fm.settings.theme;
    document.getElementById('fm-theme').addEventListener('change', e => {
      fm.settings.theme = e.target.value;
      fm.apply();
      fm.save();
    });
    
    document.getElementById('fm-font').value = fm.settings.font;
    document.getElementById('fm-font').addEventListener('change', e => {
      fm.settings.font = e.target.value;
      fm.apply();
      fm.save();
    });
    
    const fontSlider = document.getElementById('fm-fontSize');
    const fontVal = document.getElementById('fm-fontSize-val');
    fontSlider.value = fm.settings.fontSize;
    fontVal.textContent = fm.settings.fontSize + 'px';
    fontSlider.addEventListener('input', e => {
      fm.settings.fontSize = parseInt(e.target.value);
      fontVal.textContent = fm.settings.fontSize + 'px';
      fm.apply();
      fm.save();
    });
    
    const brightSlider = document.getElementById('fm-brightness');
    const brightVal = document.getElementById('fm-brightness-val');
    brightSlider.value = fm.settings.brightness;
    brightVal.textContent = (fm.settings.brightness * 100).toFixed(0) + '%';
    brightSlider.addEventListener('input', e => {
      fm.settings.brightness = parseFloat(e.target.value);
      brightVal.textContent = (fm.settings.brightness * 100).toFixed(0) + '%';
      fm.apply();
      fm.save();
    });
    
    const lineHeightSlider = document.getElementById('fm-lineHeight');
    const lineHeightVal = document.getElementById('fm-lineHeight-val');
    lineHeightSlider.value = fm.settings.lineHeight;
    lineHeightVal.textContent = fm.settings.lineHeight.toFixed(1);
    lineHeightSlider.addEventListener('input', e => {
      fm.settings.lineHeight = parseFloat(e.target.value);
      lineHeightVal.textContent = fm.settings.lineHeight.toFixed(1);
      fm.apply();
      fm.save();
    });
    
    const letterSpacingSlider = document.getElementById('fm-letterSpacing');
    const letterSpacingVal = document.getElementById('fm-letterSpacing-val');
    letterSpacingSlider.value = fm.settings.letterSpacing;
    letterSpacingVal.textContent = fm.settings.letterSpacing + 'px';
    letterSpacingSlider.addEventListener('input', e => {
      fm.settings.letterSpacing = parseFloat(e.target.value);
      letterSpacingVal.textContent = fm.settings.letterSpacing + 'px';
      fm.apply();
      fm.save();
    });
    
    const wordSpacingSlider = document.getElementById('fm-wordSpacing');
    const wordSpacingVal = document.getElementById('fm-wordSpacing-val');
    wordSpacingSlider.value = fm.settings.wordSpacing;
    wordSpacingVal.textContent = fm.settings.wordSpacing + 'px';
    wordSpacingSlider.addEventListener('input', e => {
      fm.settings.wordSpacing = parseFloat(e.target.value);
      wordSpacingVal.textContent = fm.settings.wordSpacing + 'px';
      fm.apply();
      fm.save();
    });
    
    document.getElementById('fm-read').addEventListener('click', () => {
      const selection = window.getSelection().toString().trim();
      if(selection) {
        fm.speak(selection);
      } else {
        alert("Sélectionnez un texte à lire.");
      }
    });
    
    document.getElementById('fm-export').addEventListener('click', () => fm.exportJSON());
    
    document.getElementById('fm-import').addEventListener('change', e => {
      const file = e.target.files[0];
      if(file) fm.importJSON(file);
    });
    
    // Application initiale
    fm.apply();
  }
  
  // Lancement au chargement de la page
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
