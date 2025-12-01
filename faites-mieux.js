/* Faites Mieux - Toolbar d'accessibilité universelle
   Par Ti Racoon
   Version 2.0 
*/

(function() {
  'use strict';
  
  const fm = {
    settings: {
      theme: "light",
      font: "Lexend",
      fontSize: 16,
      brightness: 1,
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      falc: 0
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
      const body = document.body;
      const allElements = document.querySelectorAll('body *:not(#fm-toolbar):not(#fm-toolbar *)');
      
      // Nettoyage des classes FALC
      body.classList.remove('fm-falc-1', 'fm-falc-2', 'fm-falc-3');
      
      // Nettoyage des classes de thème
      body.classList.remove('fm-theme-light', 'fm-theme-dark', 'fm-theme-sepia', 'fm-theme-red', 'fm-theme-blue', 'fm-theme-high-contrast');
      
      // Application du mode FALC
      if(this.settings.falc > 0) {
        body.classList.add('fm-falc-' + this.settings.falc);
        // En mode FALC, on force Lexend
        allElements.forEach(el => {
          el.style.fontFamily = 'Lexend, sans-serif';
        });
      } else {
        // Application de la police
        allElements.forEach(el => {
          el.style.fontFamily = this.settings.font + ', sans-serif';
        });
        
        // Application de la taille du texte
        allElements.forEach(el => {
          el.style.fontSize = this.settings.fontSize + 'px';
        });
        
        // Application de l'interligne
        allElements.forEach(el => {
          el.style.lineHeight = this.settings.lineHeight;
        });
        
        // Application de l'espacement lettres
        allElements.forEach(el => {
          el.style.letterSpacing = this.settings.letterSpacing + 'px';
        });
        
        // Application de l'espacement mots
        allElements.forEach(el => {
          el.style.wordSpacing = this.settings.wordSpacing + 'px';
        });
      }
      
      // Application de la luminosité
      body.style.filter = 'brightness(' + this.settings.brightness + ')';
      
      // Application du thème
      body.classList.add('fm-theme-' + this.settings.theme);
      
      // Exclusion explicite de la toolbar
      const toolbar = document.getElementById('fm-toolbar');
      const toggleBtn = document.getElementById('fm-toggle-btn');
      if(toolbar) {
        toolbar.style.filter = 'none';
        const toolbarElements = toolbar.querySelectorAll('*');
        toolbarElements.forEach(el => {
          el.style.fontFamily = 'Lexend, sans-serif';
          el.style.fontSize = '';
          el.style.lineHeight = '';
          el.style.letterSpacing = '';
          el.style.wordSpacing = '';
          el.style.filter = 'none';
        });
      }
      if(toggleBtn) {
        toggleBtn.style.filter = 'none';
      }
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
          
          // Mise à jour des contrôles de la toolbar
          document.getElementById('fm-theme').value = this.settings.theme;
          document.getElementById('fm-font').value = this.settings.font;
          
          const fontSlider = document.getElementById('fm-fontSize');
          const fontVal = document.getElementById('fm-fontSize-val');
          fontSlider.value = this.settings.fontSize;
          fontVal.textContent = this.settings.fontSize + 'px';
          
          const brightSlider = document.getElementById('fm-brightness');
          const brightVal = document.getElementById('fm-brightness-val');
          brightSlider.value = this.settings.brightness;
          brightVal.textContent = (this.settings.brightness * 100).toFixed(0) + '%';
          
          const lineHeightSlider = document.getElementById('fm-lineHeight');
          const lineHeightVal = document.getElementById('fm-lineHeight-val');
          lineHeightSlider.value = this.settings.lineHeight;
          lineHeightVal.textContent = this.settings.lineHeight.toFixed(1);
          
          const letterSpacingSlider = document.getElementById('fm-letterSpacing');
          const letterSpacingVal = document.getElementById('fm-letterSpacing-val');
          letterSpacingSlider.value = this.settings.letterSpacing;
          letterSpacingVal.textContent = this.settings.letterSpacing + 'px';
          
          const wordSpacingSlider = document.getElementById('fm-wordSpacing');
          const wordSpacingVal = document.getElementById('fm-wordSpacing-val');
          wordSpacingSlider.value = this.settings.wordSpacing;
          wordSpacingVal.textContent = this.settings.wordSpacing + 'px';
          
          document.getElementById('fm-falc').value = this.settings.falc;
          
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
          <option value="red">Rouge</option>
          <option value="blue">Bleu</option>
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
        <input type="range" min="0.5" max="1.5" step="0.05" value="1" id="fm-brightness">
        <span class="fm-value" id="fm-brightness-val">100%</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-lineHeight">Interligne</label>
        <input type="range" min="1" max="2.5" step="0.1" value="1.6" id="fm-lineHeight">
        <span class="fm-value" id="fm-lineHeight-val">1.6</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-letterSpacing">Lettres</label>
        <input type="range" min="0" max="5" step="0.5" value="0" id="fm-letterSpacing">
        <span class="fm-value" id="fm-letterSpacing-val">0px</span>
      </div>
      
      <div class="fm-section fm-row">
        <label for="fm-wordSpacing">Mots</label>
        <input type="range" min="0" max="20" step="1" value="0" id="fm-wordSpacing">
        <span class="fm-value" id="fm-wordSpacing-val">0px</span>
      </div>
      
      <div class="fm-section">
        <label for="fm-falc">Mode FALC</label>
        <select id="fm-falc" class="fm-control">
          <option value="0">Désactivé</option>
          <option value="1">Niveau 1</option>
          <option value="2">Niveau 2</option>
          <option value="3">Niveau 3</option>
        </select>
      </div>
      
      <div class="fm-section fm-row">
        <button class="fm-btn" id="fm-read">Lire</button>
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
  
  function init() {
    fm.load();
    
    const container = document.createElement('div');
    container.innerHTML = toolbarHTML;
    document.body.appendChild(container);
    
    const toggleBtn = document.getElementById('fm-toggle-btn');
    const toolbar = document.getElementById('fm-toolbar');
    const closeBtn = toolbar.querySelector('.fm-close');
    
    toggleBtn.addEventListener('click', function() {
      const isVisible = toolbar.classList.contains('visible');
      toolbar.classList.toggle('visible');
      toggleBtn.setAttribute('aria-expanded', !isVisible);
    });
    
    closeBtn.addEventListener('click', function() {
      toolbar.classList.remove('visible');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
    
    // Thème
    document.getElementById('fm-theme').value = fm.settings.theme;
    document.getElementById('fm-theme').addEventListener('change', e => {
      fm.settings.theme = e.target.value;
      fm.apply();
      fm.save();
    });
    
    // Police
    document.getElementById('fm-font').value = fm.settings.font;
    document.getElementById('fm-font').addEventListener('change', e => {
      fm.settings.font = e.target.value;
      fm.apply();
      fm.save();
    });
    
    // Taille
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
    
    // Luminosité
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
    
    // Interligne
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
    
    // Espacement lettres
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
    
    // Espacement mots
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
    
    // FALC
    document.getElementById('fm-falc').value = fm.settings.falc;
    document.getElementById('fm-falc').addEventListener('change', e => {
      fm.settings.falc = parseInt(e.target.value);
      fm.apply();
      fm.save();
    });
    
    // Lecture
    document.getElementById('fm-read').addEventListener('click', () => {
      const selection = window.getSelection().toString().trim();
      if(selection) {
        fm.speak(selection);
      } else {
        alert("Sélectionnez un texte à lire.");
      }
    });
    
    // Export/Import
    document.getElementById('fm-export').addEventListener('click', () => fm.exportJSON());
    document.getElementById('fm-import').addEventListener('change', e => {
      const file = e.target.files[0];
      if(file) fm.importJSON(file);
    });
    
    // Application initiale
    fm.apply();
  }
  
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
