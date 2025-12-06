/* Faites Mieux - Toolbar d'accessibilité universelle
   Par Ti Racoon
   Version 3.1 - Bouton compact déplaçable + Voix + NVDA
*/

(function() {
  'use strict';
  
  const fm = {
    settings: {
      theme: "light",
      font: "default",
      fontSize: 16,
      brightness: 1,
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      falc: 0,
      voiceIndex: 0,
      speechRate: 1,
      buttonPosition: { top: 12, left: 12 }
    },
    voices: [],
    
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
    
    reset: function() {
      this.settings = {
        theme: "light",
        font: "default",
        fontSize: 16,
        brightness: 1,
        lineHeight: 1.6,
        letterSpacing: 0,
        wordSpacing: 0,
        falc: 0,
        voiceIndex: 0,
        speechRate: 1,
        buttonPosition: { top: 12, left: 12 }
      };
      
      const toggleBtn = document.getElementById('fm-toggle-btn');
      if(toggleBtn) {
        toggleBtn.style.top = '12px';
        toggleBtn.style.left = '12px';
      }
      
      this.save();
      this.apply();
      this.updateControls();
    },
    
    updateControls: function() {
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
      
      const voiceSelect = document.getElementById('fm-voice');
      if(voiceSelect && this.settings.voiceIndex !== undefined) {
        voiceSelect.value = this.settings.voiceIndex;
      }
      
      const speechRateSlider = document.getElementById('fm-speechRate');
      const speechRateVal = document.getElementById('fm-speechRate-val');
      speechRateSlider.value = this.settings.speechRate || 1;
      speechRateVal.textContent = (this.settings.speechRate || 1).toFixed(1) + 'x';
    },
    
    apply: function() {
      const body = document.body;
      const allElements = document.querySelectorAll('body *:not(#fm-toolbar):not(#fm-toolbar *)');
      
      body.classList.remove('fm-falc-1', 'fm-falc-2', 'fm-falc-3');
      body.classList.remove('fm-theme-light', 'fm-theme-dark', 'fm-theme-sepia', 'fm-theme-red', 'fm-theme-blue', 'fm-theme-high-contrast');
      
      body.classList.add('fm-theme-' + this.settings.theme);
      
      if(this.settings.falc > 0) {
        body.classList.add('fm-falc-' + this.settings.falc);
      } else {
        allElements.forEach(el => {
          el.style.fontSize = this.settings.fontSize + 'px';
          el.style.lineHeight = this.settings.lineHeight;
          el.style.letterSpacing = this.settings.letterSpacing + 'px';
          el.style.wordSpacing = this.settings.wordSpacing + 'px';
        });
      }
      
      if(this.settings.font !== 'default') {
        allElements.forEach(el => {
          el.style.fontFamily = this.settings.font + ', sans-serif';
        });
      } else {
        allElements.forEach(el => {
          el.style.fontFamily = '';
        });
      }
      
      body.style.filter = 'brightness(' + this.settings.brightness + ')';
      
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
    
    loadVoices: function() {
      if(!window.speechSynthesis) return;
      
      this.voices = window.speechSynthesis.getVoices();
      
      if(this.voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.voices = window.speechSynthesis.getVoices();
          this.populateVoiceSelect();
        };
      } else {
        this.populateVoiceSelect();
      }
    },
    
    populateVoiceSelect: function() {
      const select = document.getElementById('fm-voice');
      if(!select) return;
      
      select.innerHTML = '';
      
      this.voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = voice.name + ' (' + voice.lang + ')';
        
        if(voice.lang.startsWith('fr') && !select.querySelector('[selected]')) {
          option.selected = true;
          this.settings.voiceIndex = index;
        }
        
        select.appendChild(option);
      });
      
      if(this.settings.voiceIndex !== undefined) {
        select.value = this.settings.voiceIndex;
      }
    },
    
    speak: function(text) {
      if(!window.speechSynthesis) {
        alert("La synthèse vocale n'est pas disponible sur ce navigateur.");
        return;
      }
      
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      
      if(this.voices[this.settings.voiceIndex]) {
        u.voice = this.voices[this.settings.voiceIndex];
      }
      
      u.rate = this.settings.speechRate || 1;
      u.pitch = 1;
      
      window.speechSynthesis.speak(u);
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
          this.updateControls();
          alert("Préférences importées !");
        } catch(err) {
          alert("Erreur import JSON: " + err);
        }
      };
      reader.readAsText(file);
    }
  };
  
  const toolbarHTML = '<button id="fm-toggle-btn" class="compact" aria-label="Ouvrir les paramètres d\'accessibilité" aria-expanded="false"><span class="btn-text-compact">A</span><span class="btn-text-full">Accessibilité / Paramètres</span></button><div id="fm-toolbar" role="dialog" aria-label="Barre d\'outils d\'accessibilité"><header><h2>Faites Mieux</h2><button class="fm-close" aria-label="Fermer">X</button></header><div class="fm-section"><label for="fm-theme">Thème</label><select id="fm-theme" class="fm-control"><option value="light">Clair</option><option value="dark">Sombre</option><option value="sepia">Sépia</option><option value="red">Rouge</option><option value="blue">Bleu</option><option value="high-contrast">Contraste élevé</option></select></div><div class="fm-section"><label for="fm-font">Police</label><select id="fm-font" class="fm-control"><option value="default">Défaut (police du site)</option><option value="Lexend">Lexend</option><option value="Atkinson Hyperlegible">Atkinson Hyperlegible</option><option value="OpenDyslexic">OpenDyslexic</option><option value="Inter">Inter</option></select></div><div class="fm-section fm-row"><label for="fm-fontSize">Taille</label><input type="range" min="12" max="32" step="1" value="16" id="fm-fontSize"><span class="fm-value" id="fm-fontSize-val">16px</span></div><div class="fm-section fm-row"><label for="fm-brightness">Luminosité</label><input type="range" min="0.5" max="1.5" step="0.05" value="1" id="fm-brightness"><span class="fm-value" id="fm-brightness-val">100%</span></div><div class="fm-section fm-row"><label for="fm-lineHeight">Interligne</label><input type="range" min="1" max="2.5" step="0.1" value="1.6" id="fm-lineHeight"><span class="fm-value" id="fm-lineHeight-val">1.6</span></div><div class="fm-section fm-row"><label for="fm-letterSpacing">Lettres</label><input type="range" min="0" max="5" step="0.5" value="0" id="fm-letterSpacing"><span class="fm-value" id="fm-letterSpacing-val">0px</span></div><div class="fm-section fm-row"><label for="fm-wordSpacing">Mots</label><input type="range" min="0" max="20" step="1" value="0" id="fm-wordSpacing"><span class="fm-value" id="fm-wordSpacing-val">0px</span></div><div class="fm-section"><label for="fm-falc">Mode FALC</label><select id="fm-falc" class="fm-control"><option value="0">Désactivé</option><option value="1">Niveau 1</option><option value="2">Niveau 2</option><option value="3">Niveau 3</option></select></div><div class="fm-section"><label for="fm-voice">Voix de lecture</label><select id="fm-voice" class="fm-control"><option value="0">Chargement des voix...</option></select><p class="fm-voice-info">Sélectionnez la voix pour la lecture à l\'écran</p></div><div class="fm-section fm-row"><label for="fm-speechRate">Vitesse</label><input type="range" min="0.5" max="2" step="0.1" value="1" id="fm-speechRate"><span class="fm-value" id="fm-speechRate-val">1x</span></div><div class="fm-section fm-row"><button class="fm-btn" id="fm-read">Lire le texte</button></div><div class="fm-section"><button class="fm-btn fm-btn-nvda" id="fm-nvda">Télécharger NVDA</button><p class="fm-voice-info">NVDA est un lecteur d\'écran gratuit et open source</p></div><div class="fm-section fm-row"><button class="fm-btn" id="fm-export">Exporter</button><label class="fm-btn" style="margin:0;cursor:pointer;">Importer<input type="file" id="fm-import" accept=".json" style="display:none;"></label></div><div class="fm-section"><button class="fm-btn fm-btn-secondary" id="fm-reset-position">Réinitialiser position du bouton</button><p class="fm-voice-info">Replace le bouton en haut à gauche</p></div><div class="fm-section"><button class="fm-btn fm-reset-btn" id="fm-reset" style="width:100%;">Réinitialiser tout</button></div></div>';
  
  function init() {
    fm.load();
    
    const container = document.createElement('div');
    container.innerHTML = toolbarHTML;
    document.body.appendChild(container);
    
    fm.loadVoices();
    
    const toggleBtn = document.getElementById('fm-toggle-btn');
    const toolbar = document.getElementById('fm-toolbar');
    const closeBtn = toolbar.querySelector('.fm-close');
    
    if(fm.settings.buttonPosition) {
      toggleBtn.style.top = fm.settings.buttonPosition.top + 'px';
      toggleBtn.style.left = fm.settings.buttonPosition.left + 'px';
    }
    
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };
    let dragStartTime = 0;
    
    toggleBtn.addEventListener('mousedown', function(e) {
      dragStartTime = Date.now();
      isDragging = true;
      toggleBtn.classList.add('dragging');
      
      const rect = toggleBtn.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
      
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
      if(!isDragging) return;
      
      let newLeft = e.clientX - dragOffset.x;
      let newTop = e.clientY - dragOffset.y;
      
      const maxLeft = window.innerWidth - toggleBtn.offsetWidth;
      const maxTop = window.innerHeight - toggleBtn.offsetHeight;
      
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      toggleBtn.style.left = newLeft + 'px';
      toggleBtn.style.top = newTop + 'px';
    });
    
    document.addEventListener('mouseup', function() {
      if(!isDragging) return;
      
      const dragDuration = Date.now() - dragStartTime;
      isDragging = false;
      toggleBtn.classList.remove('dragging');
      
      fm.settings.buttonPosition = {
        top: parseInt(toggleBtn.style.top),
        left: parseInt(toggleBtn.style.left)
      };
      fm.save();
      
      if(dragDuration < 200) {
        const isVisible = toolbar.classList.contains('visible');
        toolbar.classList.toggle('visible');
        toggleBtn.setAttribute('aria-expanded', !isVisible);
        
        if(!isVisible) {
          toggleBtn.classList.remove('compact');
          toggleBtn.classList.add('expanded');
        }
      }
    });
    
    toggleBtn.addEventListener('touchstart', function(e) {
      dragStartTime = Date.now();
      isDragging = true;
      toggleBtn.classList.add('dragging');
      
      const touch = e.touches[0];
      const rect = toggleBtn.getBoundingClientRect();
      dragOffset.x = touch.clientX - rect.left;
      dragOffset.y = touch.clientY - rect.top;
      
      e.preventDefault();
    });
    
    document.addEventListener('touchmove', function(e) {
      if(!isDragging) return;
      
      const touch = e.touches[0];
      let newLeft = touch.clientX - dragOffset.x;
      let newTop = touch.clientY - dragOffset.y;
      
      const maxLeft = window.innerWidth - toggleBtn.offsetWidth;
      const maxTop = window.innerHeight - toggleBtn.offsetHeight;
      
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      toggleBtn.style.left = newLeft + 'px';
      toggleBtn.style.top = newTop + 'px';
      
      e.preventDefault();
    });
    
    document.addEventListener('touchend', function() {
      if(!isDragging) return;
      
      const dragDuration = Date.now() - dragStartTime;
      isDragging = false;
      toggleBtn.classList.remove('dragging');
      
      fm.settings.buttonPosition = {
        top: parseInt(toggleBtn.style.top),
        left: parseInt(toggleBtn.style.left)
      };
      fm.save();
      
      if(dragDuration < 200) {
        const isVisible = toolbar.classList.contains('visible');
        toolbar.classList.toggle('visible');
        toggleBtn.setAttribute('aria-expanded', !isVisible);
        
        if(!isVisible) {
          toggleBtn.classList.remove('compact');
          toggleBtn.classList.add('expanded');
        }
      }
    });
    
    let expandTimeout;
    
    toggleBtn.addEventListener('mouseenter', function() {
      if(isDragging) return;
      clearTimeout(expandTimeout);
      expandTimeout = setTimeout(function() {
        toggleBtn.classList.remove('compact');
        toggleBtn.classList.add('expanded');
      }, 300);
    });
    
    toggleBtn.addEventListener('mouseleave', function() {
      clearTimeout(expandTimeout);
      if(!toolbar.classList.contains('visible')) {
        toggleBtn.classList.remove('expanded');
        toggleBtn.classList.add('compact');
      }
    });
    
    closeBtn.addEventListener('click', function() {
      toolbar.classList.remove('visible');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('expanded');
      toggleBtn.classList.add('compact');
    });
    
    document.getElementById('fm-reset').addEventListener('click', function() {
      if(confirm('Voulez-vous vraiment réinitialiser tous les paramètres ?')) {
        fm.reset();
        alert('Tous les paramètres ont été réinitialisés !');
      }
    });
    
    document.getElementById('fm-theme').value = fm.settings.theme;
    document.getElementById('fm-theme').addEventListener('change', function(e) {
      fm.settings.theme = e.target.value;
      fm.apply();
      fm.save();
    });
    
    document.getElementById('fm-font').value = fm.settings.font;
    document.getElementById('fm-font').addEventListener('change', function(e) {
      fm.settings.font = e.target.value;
      fm.apply();
      fm.save();
    });
    
    const fontSlider = document.getElementById('fm-fontSize');
    const fontVal = document.getElementById('fm-fontSize-val');
    fontSlider.value = fm.settings.fontSize;
    fontVal.textContent = fm.settings.fontSize + 'px';
    fontSlider.addEventListener('input', function(e) {
      fm.settings.fontSize = parseInt(e.target.value);
      fontVal.textContent = fm.settings.fontSize + 'px';
      fm.apply();
      fm.save();
    });
    
    const brightSlider = document.getElementById('fm-brightness');
    const brightVal = document.getElementById('fm-brightness-val');
    brightSlider.value = fm.settings.brightness;
    brightVal.textContent = (fm.settings.brightness * 100).toFixed(0) + '%';
    brightSlider.addEventListener('input', function(e) {
      fm.settings.brightness = parseFloat(e.target.value);
      brightVal.textContent = (fm.settings.brightness * 100).toFixed(0) + '%';
      fm.apply();
      fm.save();
    });
    
    const lineHeightSlider = document.getElementById('fm-lineHeight');
    const lineHeightVal = document.getElementById('fm-lineHeight-val');
    lineHeightSlider.value = fm.settings.lineHeight;
    lineHeightVal.textContent = fm.settings.lineHeight.toFixed(1);
    lineHeightSlider.addEventListener('input', function(e) {
      fm.settings.lineHeight = parseFloat(e.target.value);
      lineHeightVal.textContent = fm.settings.lineHeight.toFixed(1);
      fm.apply();
      fm.save();
    });
    
    const letterSpacingSlider = document.getElementById('fm-letterSpacing');
    const letterSpacingVal = document.getElementById('fm-letterSpacing-val');
    letterSpacingSlider.value = fm.settings.letterSpacing;
    letterSpacingVal.textContent = fm.settings.letterSpacing + 'px';
    letterSpacingSlider.addEventListener('input', function(e) {
      fm.settings.letterSpacing = parseFloat(e.target.value);
      letterSpacingVal.textContent = fm.settings.letterSpacing + 'px';
      fm.apply();
      fm.save();
    });
    
    const wordSpacingSlider = document.getElementById('fm-wordSpacing');
    const wordSpacingVal = document.getElementById('fm-wordSpacing-val');
    wordSpacingSlider.value = fm.settings.wordSpacing;
    wordSpacingVal.textContent = fm.settings.wordSpacing + 'px';
    wordSpacingSlider.addEventListener('input', function(e) {
      fm.settings.wordSpacing = parseFloat(e.target.value);
      wordSpacingVal.textContent = fm.settings.wordSpacing + 'px';
      fm.apply();
      fm.save();
    });
    
    document.getElementById('fm-falc').value = fm.settings.falc;
    document.getElementById('fm-falc').addEventListener('change', function(e) {
      fm.settings.falc = parseInt(e.target.value);
      fm.apply();
      fm.save();
    });
    
    document.getElementById('fm-voice').addEventListener('change', function(e) {
      fm.settings.voiceIndex = parseInt(e.target.value);
      fm.save();
    });
    
    const speechRateSlider = document.getElementById('fm-speechRate');
    const speechRateVal = document.getElementById('fm-speechRate-val');
    speechRateSlider.value = fm.settings.speechRate || 1;
    speechRateVal.textContent = (fm.settings.speechRate || 1).toFixed(1) + 'x';
    speechRateSlider.addEventListener('input', function(e) {
      fm.settings.speechRate = parseFloat(e.target.value);
      speechRateVal.textContent = fm.settings.speechRate.toFixed(1) + 'x';
      fm.save();
    });
    
    document.getElementById('fm-read').addEventListener('click', function() {
      const selection = window.getSelection().toString().trim();
      if(selection) {
        fm.speak(selection);
      } else {
        alert("Sélectionnez un texte à lire.");
      }
    });
    
    document.getElementById('fm-nvda').addEventListener('click', function() {
      window.open('https://www.nvaccess.org/download/', '_blank');
    });
    
    document.getElementById('fm-export').addEventListener('click', function() {
      fm.exportJSON();
    });
    
    document.getElementById('fm-import').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if(file) fm.importJSON(file);
    });
    
    document.getElementById('fm-reset-position').addEventListener('click', function() {
      fm.settings.buttonPosition = { top: 12, left: 12 };
      toggleBtn.style.top = '12px';
      toggleBtn.style.left = '12px';
      fm.save();
      alert("Position réinitialisée en haut à gauche");
    });
    
    fm.apply();
  }
  
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
