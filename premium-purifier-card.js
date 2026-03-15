// ============================================================
//  Premium Purifier Card
//  /config/www/premium-purifier-card.js
//  Resurs: /local/premium-purifier-card.js?v=4
// ============================================================

const TRANSLATIONS = {
  sv: { air_quality:'Luftkvalitet', excellent:'Utmärkt', good:'Bra', moderate:'Måttlig', poor:'Dålig', very_poor:'Mycket dålig', temperature:'Temperatur', humidity:'Luftfuktighet', fan_speed:'Fläkthastighet', mode:'Läge', active:'Aktiv', inactive:'Inaktiv', automatic_mode:'Automatiskt läge', manual_mode:'Manuellt läge', speed:'Hastighet' },
  en: { air_quality:'Air Quality', excellent:'Excellent', good:'Good', moderate:'Moderate', poor:'Poor', very_poor:'Very Poor', temperature:'Temperature', humidity:'Humidity', fan_speed:'Fan Speed', mode:'Mode', active:'Active', inactive:'Inactive', automatic_mode:'Automatic mode', manual_mode:'Manual mode', speed:'Speed' },
  de: { air_quality:'Luftqualität', excellent:'Ausgezeichnet', good:'Gut', moderate:'Mäßig', poor:'Schlecht', very_poor:'Sehr schlecht', temperature:'Temperatur', humidity:'Luftfeuchtigkeit', fan_speed:'Lüftergeschwindigkeit', mode:'Modus', active:'Aktiv', inactive:'Inaktiv', automatic_mode:'Automatischer Modus', manual_mode:'Manueller Modus' },
  fr: { air_quality:"Qualité de l'air", excellent:'Excellent', good:'Bon', moderate:'Modéré', poor:'Mauvais', very_poor:'Très mauvais', temperature:'Température', humidity:'Humidité', fan_speed:'Ventilateur', mode:'Mode', active:'Actif', inactive:'Inactif', automatic_mode:'Mode automatique', manual_mode:'Mode manuel' },
  nl: { air_quality:'Luchtkwaliteit', excellent:'Uitstekend', good:'Goed', moderate:'Matig', poor:'Slecht', very_poor:'Zeer slecht', temperature:'Temperatuur', humidity:'Vochtigheid', fan_speed:'Ventilatorsnelheid', mode:'Modus', active:'Actief', inactive:'Inactief', automatic_mode:'Automatische modus', manual_mode:'Handmatige modus' },
  nb: { air_quality:'Luftkvalitet', excellent:'Utmerket', good:'Bra', moderate:'Moderat', poor:'Dårlig', very_poor:'Svært dårlig', temperature:'Temperatur', humidity:'Luftfuktighet', fan_speed:'Viftehastighet', mode:'Modus', active:'Aktiv', inactive:'Inaktiv', automatic_mode:'Automatisk modus', manual_mode:'Manuell modus' },
  da: { air_quality:'Luftkvalitet', excellent:'Fremragende', good:'God', moderate:'Moderat', poor:'Dårlig', very_poor:'Meget dårlig', temperature:'Temperatur', humidity:'Luftfugtighed', fan_speed:'Blæserhastighed', mode:'Tilstand', active:'Aktiv', inactive:'Inaktiv', automatic_mode:'Automatisk tilstand', manual_mode:'Manuel tilstand' },
  fi: { air_quality:'Ilmanlaatu', excellent:'Erinomainen', good:'Hyvä', moderate:'Kohtalainen', poor:'Huono', very_poor:'Erittäin huono', temperature:'Lämpötila', humidity:'Kosteus', fan_speed:'Tuuletinnopeus', mode:'Tila', active:'Aktiivinen', inactive:'Ei aktiivinen', automatic_mode:'Automaattinen tila', manual_mode:'Manuaalinen tila' },
  es: { air_quality:'Calidad del aire', excellent:'Excelente', good:'Buena', moderate:'Moderada', poor:'Mala', very_poor:'Muy mala', temperature:'Temperatura', humidity:'Humedad', fan_speed:'Ventilador', mode:'Modo', active:'Activo', inactive:'Inactivo', automatic_mode:'Modo automático', manual_mode:'Modo manual' },
  pl: { air_quality:'Jakość powietrza', excellent:'Doskonała', good:'Dobra', moderate:'Umiarkowana', poor:'Zła', very_poor:'Bardzo zła', temperature:'Temperatura', humidity:'Wilgotność', fan_speed:'Wentylator', mode:'Tryb', active:'Aktywny', inactive:'Nieaktywny', automatic_mode:'Tryb automatyczny', manual_mode:'Tryb ręczny' },
};

function tr(lang, key) {
  const base = (lang||'en').split('-')[0].toLowerCase();
  return (TRANSLATIONS[base]||TRANSLATIONS.en)[key] || TRANSLATIONS.en[key] || key;
}
function pmToQuality(pm, lang) {
  const v = parseFloat(pm);
  if (isNaN(v)||v<=12) return tr(lang,'excellent');
  if (v<=35) return tr(lang,'good');
  if (v<=55) return tr(lang,'moderate');
  if (v<=150) return tr(lang,'poor');
  return tr(lang,'very_poor');
}
function pmToColor(pm, primary) {
  const v = parseFloat(pm);
  if (isNaN(v)||v<=12) return primary;
  if (v<=35)  return '#8bc34a';
  if (v<=55)  return '#ffb300';
  if (v<=150) return '#ff7043';
  return '#e53935';
}
function modeToSpeed(mode) {
  if (!mode) return 0;
  const m = mode.toLowerCase();
  if (m==='off'||m==='idle') return 0;
  if (m==='low') return 1;
  if (m==='auto'||m==='automatic') return 2;
  if (m==='medium'||m==='mid') return 3;
  if (m==='high') return 4;
  if (m==='turbo'||m==='max') return 5;
  return 1;
}
// color_rgb selector returns [r,g,b] array — normalize everything to #rrggbb
function toHex(color) {
  if (!color) return '#000000';
  if (typeof color === 'string') {
    const c = color.trim();
    if (c.startsWith('#')) return c.length === 7 ? c : '#000000';
    const parts = c.split(',').map(Number);
    if (parts.length === 3) return '#' + parts.map(v => Math.min(255,Math.max(0,v)).toString(16).padStart(2,'0')).join('');
    return '#000000';
  }
  if (Array.isArray(color) && color.length === 3) {
    return '#' + color.map(v => Math.min(255,Math.max(0,Math.round(v))).toString(16).padStart(2,'0')).join('');
  }
  return '#000000';
}
function hexToRgb(hex) {
  const h = toHex(hex).replace('#','');
  return { r:parseInt(h.slice(0,2),16)||0, g:parseInt(h.slice(2,4),16)||0, b:parseInt(h.slice(4,6),16)||0 };
}
function isDark(hex) {
  try { const {r,g,b}=hexToRgb(toHex(hex)); return (0.299*r+0.587*g+0.114*b)<140; } catch{return false;}
}
function alpha(hex,a) {
  try { const {r,g,b}=hexToRgb(toHex(hex)); return `rgba(${r},${g},${b},${a})`; } catch{return hex;}
}

// ════════════════════════════════════════════════════════════
//  EDITOR — uses ha-form which is the most reliable approach
// ════════════════════════════════════════════════════════════
class PremiumPurifierCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this._config = {};
    this._hass   = null;
    this._built  = false;
  }

  setConfig(config) {
    this._config = {...config};
    this._build();
  }

  set hass(hass) {
    this._hass = hass;
    this._build();
  }

  _schema() {
    const useCustom = this._config.use_custom_mode;
    return [
      { name:'name', selector:{ text:{} } },
      { name:'power_entity', selector:{ entity:{} } },
      { name:'temperature_entity', selector:{ entity:{ domain:'sensor', unit_of_measurement:['°C','°F'] } } },
      { name:'humidity_entity',    selector:{ entity:{ domain:'sensor', unit_of_measurement:'%' } } },
      { name:'pm_entity',          selector:{ entity:{ domain:'sensor', unit_of_measurement:'µg/m³' } } },
      // Air quality sensors (shown/hidden per boolean)
      { name:'show_aqi',   selector:{ boolean:{} } },
      ...(this._config.show_aqi   ? [{ name:'aqi_entity',   selector:{ entity:{ domain:'sensor' } } }] : []),
      { name:'show_co2',   selector:{ boolean:{} } },
      ...(this._config.show_co2   ? [{ name:'co2_entity',   selector:{ entity:{ domain:'sensor', unit_of_measurement:'ppm' } } }] : []),
      { name:'show_voc',   selector:{ boolean:{} } },
      ...(this._config.show_voc   ? [{ name:'voc_entity',   selector:{ entity:{ domain:'sensor', unit_of_measurement:'ppb' } } }] : []),
      { name:'show_nox',   selector:{ boolean:{} } },
      ...(this._config.show_nox   ? [{ name:'nox_entity',   selector:{ entity:{ domain:'sensor', unit_of_measurement:'ppb' } } }] : []),
      { name:'show_pm1',   selector:{ boolean:{} } },
      ...(this._config.show_pm1   ? [{ name:'pm1_entity',   selector:{ entity:{ domain:'sensor', unit_of_measurement:'µg/m³' } } }] : []),
      { name:'show_pm25',  selector:{ boolean:{} } },
      ...(this._config.show_pm25  ? [{ name:'pm25_entity',  selector:{ entity:{ domain:'sensor', unit_of_measurement:'µg/m³' } } }] : []),
      { name:'show_pm4',   selector:{ boolean:{} } },
      ...(this._config.show_pm4   ? [{ name:'pm4_entity',   selector:{ entity:{ domain:'sensor', unit_of_measurement:'µg/m³' } } }] : []),
      { name:'show_pm10',  selector:{ boolean:{} } },
      ...(this._config.show_pm10  ? [{ name:'pm10_entity',  selector:{ entity:{ domain:'sensor', unit_of_measurement:'µg/m³' } } }] : []),
      // Custom mode toggle — always visible
      { name:'show_filter', selector:{ boolean:{} } },
      ...(this._config.show_filter ? [{ name:'filter_entity', selector:{ entity:{ domain:'sensor', unit_of_measurement:['%'] } } }] : []),
      { name:'use_custom_mode', selector:{ boolean:{} } },
      // Only show entity picker when custom mode is ON
      ...(useCustom ? [{ name:'custom_mode_entity', selector:{ entity:{} } }] : []),
      {
        type:'grid', name:'', flatten:true,
        schema:[
          { name:'show_stat_boxes',      selector:{ boolean:{} } },
          { name:'show_temperature',     selector:{ boolean:{} } },
          { name:'show_humidity',        selector:{ boolean:{} } },
          { name:'show_fan',             selector:{ boolean:{} } },
          { name:'show_particles',       selector:{ boolean:{} } },
          { name:'show_speed_slider',    selector:{ boolean:{} } },
          { name:'show_background_glow', selector:{ boolean:{} } },
          { name:'show_ring',            selector:{ boolean:{} } },
          { name:'show_ring_glow',       selector:{ boolean:{} } },
          { name:'animate_rings',        selector:{ boolean:{} } },
          { name:'animate_fan',          selector:{ boolean:{} } },
        ]
      },
      { name:'ring_speed',           selector:{ number:{ min:0, max:100, step:1 } } },
      { name:'sync_ring_to_fan',     selector:{ boolean:{} } },
      { name:'particle_speed',       selector:{ number:{ min:0, max:100, step:1 } } },
      { name:'sync_particles_to_fan',selector:{ boolean:{} } },
      {
        type:'grid', name:'', flatten:true,
        schema:[
          { name:'color_primary',   selector:{ color_rgb:{} } },
          { name:'color_secondary', selector:{ color_rgb:{} } },
          { name:'color_bg1',       selector:{ color_rgb:{} } },
          { name:'color_bg2',       selector:{ color_rgb:{} } },
        ]
      },
      { name:'card_opacity', selector:{ number:{ min:0, max:100, step:1 } } },
    ];
  }

  _lang() {
    return (this._hass?.language||'sv').split('-')[0].toLowerCase();
  }

  _computeLabel(schema) {
    const lang = this._lang();
    const sv = {
      name:'Kortnamn', power_entity:'Strömbrytare (fan / switch)',
      temperature_entity:'Temperatursensor', humidity_entity:'Luftfuktighetssensor',
      pm_entity:'PM2.5 (för luftkvalitet-etikett)',
      show_aqi:'Visa AQI', aqi_entity:'AQI sensor',
      show_co2:'Visa CO₂', co2_entity:'CO₂ sensor',
      show_voc:'Visa VOC', voc_entity:'VOC sensor',
      show_nox:'Visa NOx', nox_entity:'NOx sensor',
      show_pm1:'Visa PM1', pm1_entity:'PM1 sensor',
      show_pm25:'Visa PM2.5', pm25_entity:'PM2.5 sensor',
      show_pm4:'Visa PM4', pm4_entity:'PM4 sensor',
      show_pm10:'Visa PM10', pm10_entity:'PM10 sensor',
      show_filter:'Visa filterhälsa', filter_entity:'Filter sensor',
      use_custom_mode:'Custom lägesväljare', custom_mode_entity:'Välj din select-entitet',
      show_stat_boxes:'Visa rutor runt sensorer',
      show_temperature:'Visa temperatur', show_humidity:'Visa luftfuktighet',
      show_fan:'Visa fläktikon', show_particles:'Visa partikelanimation',
      show_speed_slider:'Visa hastighetslider',
      show_background_glow:'Visa bakgrundsglow', show_ring:'Visa ring',
      show_ring_glow:'Visa glow runt ringen', animate_rings:'Animera ringar',
      animate_fan:'Animera fläktikon',
      ring_speed:'Ringhastighet (0-100)',
      sync_ring_to_fan:'Synka ring med fläkthastighet',
      particle_speed:'Partikelhastighet (0-100)',
      sync_particles_to_fan:'Synka partiklar med fläkthastighet',
      card_opacity:'Kortets transparens (0=genomskinlig, 100=solid)',
      color_primary:'Primärfärg', color_secondary:'Sekundärfärg',
      color_bg1:'Bakgrund ljus', color_bg2:'Bakgrund mörk',
    };
    const en = {
      name:'Card name', power_entity:'Power switch (fan / switch)',
      temperature_entity:'Temperature sensor', humidity_entity:'Humidity sensor',
      pm_entity:'PM2.5 (for air quality label)',
      show_aqi:'Show AQI', aqi_entity:'AQI sensor',
      show_co2:'Show CO₂', co2_entity:'CO₂ sensor',
      show_voc:'Show VOC', voc_entity:'VOC sensor',
      show_nox:'Show NOx', nox_entity:'NOx sensor',
      show_pm1:'Show PM1', pm1_entity:'PM1 sensor',
      show_pm25:'Show PM2.5', pm25_entity:'PM2.5 sensor',
      show_pm4:'Show PM4', pm4_entity:'PM4 sensor',
      show_pm10:'Show PM10', pm10_entity:'PM10 sensor',
      show_filter:'Show filter health', filter_entity:'Filter sensor',
      use_custom_mode:'Custom mode selector', custom_mode_entity:'Select your entity',
      show_stat_boxes:'Show boxes around sensors',
      show_temperature:'Show temperature', show_humidity:'Show humidity',
      show_fan:'Show fan icon', show_particles:'Show particle animation',
      show_speed_slider:'Show speed slider',
      show_background_glow:'Show background glow', show_ring:'Show ring',
      show_ring_glow:'Show glow around ring', animate_rings:'Animate ring',
      animate_fan:'Animate fan icon',
      ring_speed:'Ring speed (0-100)',
      sync_ring_to_fan:'Sync ring to fan speed',
      particle_speed:'Particle speed (0-100)',
      sync_particles_to_fan:'Sync particles to fan speed',
      card_opacity:'Card transparency (0=transparent, 100=solid)',
      color_primary:'Primary color', color_secondary:'Secondary color',
      color_bg1:'Background light', color_bg2:'Background dark',
    };
    const de = {
      name:'Kartenname', power_entity:'Netzschalter (fan / switch)',
      temperature_entity:'Temperatursensor', humidity_entity:'Feuchtigkeitssensor',
      pm_entity:'PM2.5 (für Luftqualitätsbeschriftung)',
      show_aqi:'AQI anzeigen', aqi_entity:'AQI Sensor',
      show_co2:'CO₂ anzeigen', co2_entity:'CO₂ Sensor',
      show_voc:'VOC anzeigen', voc_entity:'VOC Sensor',
      show_nox:'NOx anzeigen', nox_entity:'NOx Sensor',
      show_pm1:'PM1 anzeigen', pm1_entity:'PM1 Sensor',
      show_pm25:'PM2.5 anzeigen', pm25_entity:'PM2.5 Sensor',
      show_pm4:'PM4 anzeigen', pm4_entity:'PM4 Sensor',
      show_pm10:'PM10 anzeigen', pm10_entity:'PM10 Sensor',
      show_filter:'Filtergesundheit anzeigen', filter_entity:'Filter Sensor',
      use_custom_mode:'Benutzerdefinierter Moduswahlschalter', custom_mode_entity:'Entität auswählen',
      show_stat_boxes:'Rahmen um Sensoren anzeigen',
      show_temperature:'Temperatur anzeigen', show_humidity:'Luftfeuchtigkeit anzeigen',
      show_fan:'Lüftersymbol anzeigen', show_particles:'Partikelanimation anzeigen',
      show_speed_slider:'Geschwindigkeitsregler anzeigen',
      show_background_glow:'Hintergrundleuchten anzeigen', show_ring:'Ring anzeigen',
      show_ring_glow:'Leuchten um Ring anzeigen', animate_rings:'Ring animieren',
      animate_fan:'Lüftersymbol animieren',
      ring_speed:'Ringgeschwindigkeit (0-100)',
      sync_ring_to_fan:'Ring mit Lüftergeschwindigkeit synchronisieren',
      particle_speed:'Partikelgeschwindigkeit (0-100)',
      sync_particles_to_fan:'Partikel mit Lüftergeschwindigkeit synchronisieren',
      card_opacity:'Kartentransparenz (0=durchsichtig, 100=fest)',
      color_primary:'Primärfarbe', color_secondary:'Sekundärfarbe',
      color_bg1:'Hintergrund hell', color_bg2:'Hintergrund dunkel',
    };
    const labels = lang==='de'?de : lang==='sv'?sv : en;
    return labels[schema.name] || en[schema.name] || schema.name;
  }

  _computeHelper(schema) {
    const lang = this._lang();
    const helpers = {
      sv: {
        use_custom_mode: 'När denna är PÅ ersätts fläktens inbyggda lägesväljare med en egen input_select-entitet. Perfekt om du vill styra luftrenaren via egna automationer med anpassade lägen.',
        custom_mode_entity: 'Välj en input_select eller select-entitet vars alternativ visas i dropdown-menyn på kortet.',
      },
      en: {
        use_custom_mode: "When ON, replaces the fan's built-in mode selector with a custom input_select entity. Perfect for controlling the purifier via your own automations with custom modes.",
        custom_mode_entity: 'Select an input_select or select entity whose options will appear in the dropdown on the card.',
      },
      de: {
        use_custom_mode: 'Wenn AN, wird der integrierte Moduswahlschalter des Lüfters durch eine benutzerdefinierte input_select-Entität ersetzt.',
        custom_mode_entity: 'Wählen Sie eine input_select- oder select-Entität aus.',
      },
    };
    const h = helpers[lang] || helpers.en;
    return h[schema.name] || undefined;
  }

  _build() {
    if (!this._hass) return;

    // Only build DOM once — then just update ha-form properties
    if (!this._built) {
      this._built = true;
      this.shadowRoot.innerHTML = `
        <style>
          ha-form { display:block; padding: 4px 0; }
        </style>
        <ha-form></ha-form>
      `;

      const form = this.shadowRoot.querySelector('ha-form');

      form.addEventListener('value-changed', (e) => {
        e.stopPropagation();
        this._config = e.detail.value;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true,
        }));
      });
    }

    const form = this.shadowRoot.querySelector('ha-form');
    if (!form) return;

    form.hass         = this._hass;
    form.schema       = this._schema();
    form.data         = this._config;
    form.computeLabel  = (s) => this._computeLabel(s);
    form.computeHelper = (s) => this._computeHelper(s);
  }
}

customElements.define('premium-purifier-card-editor', PremiumPurifierCardEditor);

// ════════════════════════════════════════════════════════════
//  MAIN CARD
// ════════════════════════════════════════════════════════════
class PremiumPurifierCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'});
    this._config    = {};
    this._hass      = null;
    this._raf       = null;
    this._particles = [];
    this._canvas    = null;
    this._ctx       = null;
    this._builtDOM  = false;
    this._lastSpeed = -1;
    this._lastFanPct = -1;
    this._lastPMult = -1;
    this._lastFanPct = -1;
    this._lastPMult = -1;
  }

  static getConfigElement() {
    return document.createElement('premium-purifier-card-editor');
  }

  static getStubConfig(hass) {
    const s = hass ? hass.states : {};
    return {
      name: 'Premium Purifier',
      power_entity:       Object.keys(s).find(e=>e.startsWith('fan.')||e.startsWith('switch.')&&e.includes('purif'))||'',
      temperature_entity: Object.keys(s).find(e=>s[e].attributes?.unit_of_measurement==='°C')||'',
      humidity_entity:    Object.keys(s).find(e=>e.includes('humid'))||'',
      mode_entity:        Object.keys(s).find(e=>e.startsWith('select.')&&e.includes('purif'))||'',
      pm_entity:          '',
      show_speed_slider: true,
      animate_rings: true,
      animate_fan: true,
      use_custom_mode: false,
      custom_mode_entity: '',
      color_primary:   '#00c896',
      color_secondary: '#00bcd4',
      color_bg1: '#ffffff',
      color_bg2: '#f5f8fa',
      show_temperature: true,
      show_humidity:    true,
      show_mode:        true,
      show_fan:         true,
      show_particles:   true,
    };
  }

  setConfig(config) {
    const normalizeColors = (cfg) => {
      const colorKeys = ['color_primary','color_secondary','color_bg1','color_bg2'];
      const out = {...cfg};
      colorKeys.forEach(k => { if (out[k] !== undefined) out[k] = toHex(out[k]); });
      return out;
    };
    const newConfig = normalizeColors({
      name:'Premium Purifier',
      card_opacity:100,
      color_primary:'#00c896', color_secondary:'#00bcd4',
      color_bg1:'#ffffff', color_bg2:'#f5f8fa',
      show_temperature:true, show_humidity:true,
      show_fan:true, show_particles:true, show_speed_slider:true, show_stat_boxes:true,
      show_background_glow:true, show_ring:true, show_ring_glow:true, animate_rings:true, animate_fan:true,
      use_custom_mode:false, custom_mode_entity:'',
      show_filter:false, filter_entity:'',
      show_aqi:false,  aqi_entity:'',
      show_co2:false,  co2_entity:'',
      show_voc:false,  voc_entity:'',
      show_nox:false,  nox_entity:'',
      show_pm1:false,  pm1_entity:'',
      show_pm25:false, pm25_entity:'',
      show_pm4:false,  pm4_entity:'',
      show_pm10:false, pm10_entity:'',
      ...config,
    });

    // Only force DOM rebuild if structural options changed (colors, visibility)
    const structuralKeys = ['color_primary','color_secondary','color_bg1','color_bg2',
      'show_temperature','show_humidity','show_fan','show_particles','show_filter','show_stat_boxes',
      'show_speed_slider','show_background_glow','show_ring','show_ring_glow','animate_rings','animate_fan','sync_ring_to_fan','sync_particles_to_fan',
      'show_aqi','show_co2','show_voc','show_nox','show_pm1','show_pm25','show_pm4','show_pm10'];
    const needsRebuild = !this._config || structuralKeys.some(k => 
      JSON.stringify(this._config[k]) !== JSON.stringify(newConfig[k])
    );

    this._config = newConfig;
    if (needsRebuild) this._builtDOM = false;

    // Only render if we already have hass — otherwise wait for hass setter
    if (this._hass) this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _togglePower() {
    const eid = this._config.power_entity;
    if (!eid || !this._hass) return;
    const domain = eid.split('.')[0];
    const svc = ['fan','switch','input_boolean','light'].includes(domain) ? domain : 'homeassistant';
    this._hass.callService(svc, 'toggle', { entity_id: eid });
  }

  _callSelectService(entityId, option) {
    if (!this._hass || !entityId) return;
    this._hass.callService('select', 'select_option', { entity_id: entityId, option });
  }

  _setFanSpeed(percentage) {
    const eid = this._config.power_entity;
    if (!eid || !this._hass) return;
    if (percentage === 0) {
      this._hass.callService('fan', 'turn_off', { entity_id: eid });
    } else {
      this._hass.callService('fan', 'set_percentage', { entity_id: eid, percentage });
    }
  }

  _isOn() {
    const eid = this._config.power_entity || this._config.mode_entity;
    if (!eid || !this._hass) return false;
    const state = this._hass.states[eid]?.state || '';
    return !['off','idle','unavailable','unknown',''].includes(state.toLowerCase());
  }

  _stopParticles() {
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf=null; }
  }

  _startParticles(canvas, speed, p, s, speedMult=1) {
    this._stopParticles();
    this._canvas = canvas;
    this._ctx    = canvas.getContext('2d');
    const W=canvas.width, H=canvas.height, cx=W/2, cy=H/2;
    const outerR=W*0.46, innerR=W*0.235; // innerR matches inner SVG circle // innerR matches SVG circle
    const count=[0,18,30,45,62,80][Math.min(speed,5)];
    this._particles = Array.from({length:count},()=>this._newParticle(cx,cy,outerR,true));
    const pRgb=hexToRgb(p), sRgb=hexToRgb(s);
    const loop=()=>{
      this._ctx.clearRect(0,0,W,H);
      // Use live config for sync mode, otherwise use passed speedMult
      const cfg=this._config||{};
      const livePSpd=cfg.sync_particles_to_fan
        ?(this._hass?.states[cfg.power_entity]?.attributes?.percentage??0)
        :(cfg.particle_speed??50);
      const liveMult=Math.max(0.05,(livePSpd/100)*3.0);
      this._particles.forEach(pt=>{
        pt.dist -= pt.spd*(0.4+speed*0.3)*liveMult;
        pt.x=cx+Math.cos(pt.angle)*pt.dist;
        pt.y=cy+Math.sin(pt.angle)*pt.dist;
        if (pt.dist<=innerR+3){ Object.assign(pt,this._newParticle(cx,cy,outerR,false)); return; }
        const fade=Math.min(1,(pt.dist-innerR)/35);
        const blend=Math.min(1,(pt.dist-innerR)/(outerR-innerR));
        const r=Math.round(pRgb.r*(1-blend)+sRgb.r*blend);
        const g=Math.round(pRgb.g*(1-blend)+sRgb.g*blend);
        const b=Math.round(pRgb.b*(1-blend)+sRgb.b*blend);
        this._ctx.beginPath();
        this._ctx.arc(pt.x,pt.y,pt.size,0,Math.PI*2);
        this._ctx.fillStyle=`rgba(${r},${g},${b},${pt.opacity*fade})`;
        this._ctx.fill();
      });
      this._raf=requestAnimationFrame(loop);
    };
    this._raf=requestAnimationFrame(loop);
  }

  _newParticle(cx,cy,outerR,randomStart){
    const angle=Math.random()*Math.PI*2;
    const dist=randomStart?(outerR*0.4)+Math.random()*outerR*0.6:outerR+Math.random()*10;
    return { x:cx+Math.cos(angle)*dist, y:cy+Math.sin(angle)*dist, angle, dist,
      size:1.2+Math.random()*2, opacity:0.2+Math.random()*0.6, spd:0.5+Math.random()*1.2 };
  }

  _render() {
    if (!this._config || !this._hass) return;
    try {
    const hass=this._hass, cfg=this._config;
    const lang=hass?.language||'sv';
    const temp=hass?.states[cfg.temperature_entity]?.state??'--';
    const hum=hass?.states[cfg.humidity_entity]?.state??'--';
    const modeEnt=hass?.states[cfg.mode_entity];
    const mode=modeEnt?.state??'';
    const options=modeEnt?.attributes?.options??[];
    const fanEnt=hass?.states[cfg.power_entity];
    const presetModes=fanEnt?.attributes?.preset_modes
      ||fanEnt?.attributes?.fan_modes
      ||fanEnt?.attributes?.speed_list
      ||fanEnt?.attributes?.mode_list
      ||[];
    const currentPreset=fanEnt?.attributes?.preset_mode??'';
    const useCustomMode=cfg.use_custom_mode&&cfg.custom_mode_entity;
    const showModeDropdown=true;
    const customModeEnt=useCustomMode?hass?.states[cfg.custom_mode_entity]:null;
    const customModeOptions=customModeEnt?.attributes?.options??customModeEnt?.attributes?.options??[];
    const customModeCurrent=customModeEnt?.state??'';
    const dropdownModes=useCustomMode?customModeOptions:presetModes;
    const dropdownCurrent=useCustomMode?customModeCurrent:currentPreset;
    const pmRaw=hass?.states[cfg.pm_entity]?.state??null;
    const pmVal=pmRaw??'4';
    // Air quality sensors
    const aqSensors=[
      {key:'aqi',   show:cfg.show_aqi,   entity:cfg.aqi_entity,   label:'AQI',   unit:'',        color:'#00c896'},
      {key:'co2',   show:cfg.show_co2,   entity:cfg.co2_entity,   label:'CO₂',   unit:'ppm',     color:'#ffb300'},
      {key:'voc',   show:cfg.show_voc,   entity:cfg.voc_entity,   label:'VOC',   unit:'ppb',     color:'#00bcd4'},
      {key:'nox',   show:cfg.show_nox,   entity:cfg.nox_entity,   label:'NOx',   unit:'ppb',     color:'#26c6da'},
      {key:'pm1',   show:cfg.show_pm1,   entity:cfg.pm1_entity,   label:'PM1',   unit:'µg/m³',   color:'#00c896'},
      {key:'pm25',  show:cfg.show_pm25,  entity:cfg.pm25_entity,  label:'PM2.5', unit:'µg/m³',   color:'#00c896'},
      {key:'pm4',   show:cfg.show_pm4,   entity:cfg.pm4_entity,   label:'PM4',   unit:'µg/m³',   color:'#00c896'},
      {key:'pm10',  show:cfg.show_pm10,  entity:cfg.pm10_entity,  label:'PM10',  unit:'µg/m³',   color:'#00c896'},
    ].map(s=>({...s, value:hass?.states[s.entity]?.state??'–'}));
    const activeAQ=aqSensors.filter(s=>s.show&&s.entity);
    const hasAQ=activeAQ.length>0;
    const aqCount=activeAQ.length;
    const circleSize=aqCount===0?200:aqCount<=2?220:aqCount<=4?250:aqCount<=6?270:300;
    const aqGridCols=aqCount<=2?'repeat(2,1fr)':'repeat(3,1fr)';
    const fanPct=parseInt(hass?.states[cfg.power_entity]?.attributes?.percentage ?? 0);
    const isOn=this._isOn();
    const isManualMode=mode.toLowerCase().includes('manual')||mode.toLowerCase()==='manual';
    const showPresets=isManualMode&&presetModes.length>0&&isOn;
    const speed=isOn?modeToSpeed(mode)||2:0;
    const qualityLabel=pmToQuality(pmVal,lang);
    const qualityColor=pmToColor(pmVal,cfg.color_primary);
    const activeLabel=useCustomMode?customModeCurrent:currentPreset;
    const subtitle=isOn
      ?(activeLabel?tr(lang,'active')+' – '+activeLabel.charAt(0).toUpperCase()+activeLabel.slice(1):tr(lang,'active'))
      :tr(lang,'inactive');
    const cardOpacity=cfg.card_opacity!=null?Number(cfg.card_opacity):100;
    const p=cfg.color_primary||'#00c896', s=cfg.color_secondary||'#00bcd4';
    const bg1=cfg.color_bg1||'#ffffff', bg2=cfg.color_bg2||'#f5f8fa';
    const dark=isDark(bg1);
    const textMain=dark?'#f0f4f8':'#1a2332';
    const textSub=dark?'rgba(200,215,230,0.75)':'#8a9bb0';
    const statBg=dark?'rgba(255,255,255,0.07)':'rgba(255,255,255,0.75)';
    const statBorder=dark?'rgba(255,255,255,0.10)':'rgba(220,230,240,0.70)';
    const trackColor=dark?'rgba(255,255,255,0.10)':'#e8edf2';
    // Fan animation — 5 distinct speed steps mapped to percentage
    let fanDur=null;
    if(isOn){
      if(fanPct>0){
        // 5 clear steps: 1-20% very slow, 21-40% slow, 41-60% medium, 61-80% fast, 81-100% turbo
        if(fanPct<=20)       fanDur='9s';
        else if(fanPct<=40)  fanDur='5s';
        else if(fanPct<=60)  fanDur='3s';
        else if(fanPct<=80)  fanDur='1.5s';
        else                 fanDur='0.6s';
      } else {
        fanDur=['','9s','5s','3s','1.5s','0.6s'][Math.min(speed,5)];
      }
    }
    const pwrBg=isOn?`linear-gradient(135deg,${p},${alpha(p,0.8)})`:`linear-gradient(135deg,${alpha(p,0.35)},${alpha(p,0.2)})`;
    const pwrShadow=isOn?`0 4px 16px ${alpha(p,0.5)}`:'none';
    const pwrIconColor=isOn?'#fff':alpha(p,0.7);
    const showTemp=cfg.show_temperature!==false;
    const showHum=cfg.show_humidity!==false;
    const showFan=cfg.show_fan!==false;
    const showFilter=cfg.show_filter===true&&!!cfg.filter_entity;
    const filterVal=showFilter?(hass?.states[cfg.filter_entity]?.state??'–'):'–';
    const showParticle=cfg.show_particles!==false;
    const statCols=[showTemp,showHum,showFan].filter(Boolean).length;
    const gridCols=statCols<=1?'1fr':statCols===2?'1fr 1fr':statCols===3?'1fr 1fr 1fr':'1fr 1fr 1fr 1fr';
    const modeButtons=options.map(opt=>{
      const active=mode.toLowerCase()===opt.toLowerCase();
      return `<button class="mode-btn${active?' active':''}" data-option="${opt}">${opt.charAt(0).toUpperCase()+opt.slice(1)}</button>`;
    }).join('');

    if (!this._builtDOM) {
      this._builtDOM=true;
      this._stopParticles();
      this.shadowRoot.innerHTML=`
        <style>
          :host{display:block;font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;width:100%;box-sizing:border-box;}
          .card{background:linear-gradient(145deg,${alpha(bg1,cardOpacity/100)},${alpha(bg2,cardOpacity/100)});border-radius:28px;padding:24px;width:100%;box-sizing:border-box;
            box-shadow:0 20px 60px rgba(0,0,0,.10),0 4px 16px rgba(0,0,0,.06);position:relative;overflow:hidden;}
          .glow-a{position:absolute;top:40px;right:-50px;width:280px;height:200px;
            background:radial-gradient(ellipse,${alpha(p,0.13)} 0%,transparent 70%);border-radius:50%;pointer-events:none;}
          .glow-b{position:absolute;top:90px;left:-50px;width:220px;height:180px;
            background:radial-gradient(ellipse,${alpha(s,0.10)} 0%,transparent 70%);border-radius:50%;pointer-events:none;}
          .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;position:relative;z-index:1;}
          .header-left{display:flex;align-items:center;gap:12px;}
          .header-icon{width:42px;height:42px;border-radius:13px;background:${alpha(s,0.15)};display:flex;align-items:center;justify-content:center;}
          .header-icon ha-icon{--mdc-icon-size:22px;color:${s};}
          .header-title{font-size:clamp(14px,5vw,20px);font-weight:700;color:${textMain};letter-spacing:-.3px;line-height:1.2;}
          .header-sub{font-size:12px;color:${textSub};margin-top:2px;}
          .power-btn{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;
            display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .15s,box-shadow .2s,background .3s;}
          .power-btn:hover{transform:scale(1.08);}
          .power-btn ha-icon{--mdc-icon-size:20px;transition:color .3s;}
          .circle-wrap{display:flex;justify-content:center;margin-bottom:22px;position:relative;z-index:1;overflow:visible;}
          canvas.particles{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:360px;height:360px;pointer-events:none;z-index:0;}
          /* Circle ring — SVG based, always square */
          .circle-ring{
            position:relative;
            width:var(--csz,220px);
            height:var(--csz,220px);
            flex-shrink:0;
            display:flex;
            align-items:center;
            justify-content:center;
            max-width:90%;
            max-height:90vw;
          }
          .circle-ring-svg{
            position:absolute;
            top:0;left:0;
            width:100%;height:100%;
            z-index:1;
            display:${cfg.show_ring===false?'none':'block'};
          }
          .ring-inner-circle.animating{animation:ringPulse ${(()=>{
            const spd=cfg.sync_ring_to_fan?fanPct:(cfg.ring_speed??50);
            if(spd===0) return '9999';
            return Math.max(0.2, 8-(spd/100)*7.8).toFixed(1);
          })()}s ease-in-out infinite;}
          .ring-inner-circle.paused{animation:none;}
          @keyframes ringPulse{0%,100%{opacity:0.5;}50%{opacity:1;}}
          .circle-inner{
            position:absolute;
            top:50%;left:50%;
            transform:translate(-50%,-50%);
            z-index:2;
            text-align:center;
            width:calc(var(--csz,220px) * 0.72);
            display:flex;
            flex-direction:column;
            align-items:center;
          }
          /* Default (no AQ) */
          .circle-label{font-size:12px;color:${textSub};font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;}
          .circle-value{font-size:28px;font-weight:800;letter-spacing:-.5px;line-height:1.1;}
          .circle-pm{font-size:11px;color:${textSub};margin-top:7px;display:flex;align-items:center;justify-content:center;gap:5px;}
          .pm-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
          /* AQ grid inside circle */
          .quality-badge{background:linear-gradient(135deg,${p},${s});color:#fff;
            font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;
            letter-spacing:.3px;margin-bottom:6px;display:inline-block;
            box-shadow:0 2px 8px ${alpha(p,0.4)};
            max-width:90%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
          .aq-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;width:200px;}
          .aq-item{display:flex;flex-direction:column;align-items:center;padding:4px 6px;background:transparent;border:none;}
          .aq-val{font-size:13px;font-weight:800;line-height:1.1;}
          .aq-unit{font-size:7.5px;font-weight:600;color:${textSub};letter-spacing:.2px;}
          .aq-label{font-size:8.5px;font-weight:600;color:${textSub};margin-top:1px;}
          .aq-divider{width:75%;height:1px;background:linear-gradient(90deg,transparent,${alpha(p,0.25)},transparent);margin:5px auto;}
          .aqi-row{font-size:12px;font-weight:600;color:${textSub};display:flex;align-items:center;justify-content:center;gap:5px;}
          .aqi-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
          .aqi-val{font-size:16px;font-weight:800;}
          .stats{display:grid;grid-template-columns:${gridCols};gap:10px;position:relative;z-index:1;}
          .stat{
            ${cfg.show_stat_boxes!==false
              ? `background:${statBg};border-radius:16px;padding:14px 10px;border:1px solid ${statBorder};`
              : 'background:transparent;border:none;padding:8px 4px;'}
            display:flex;flex-direction:column;align-items:center;gap:5px;transition:transform .15s;}
          .stat:hover{transform:translateY(-2px);}
          .stat ha-icon{--mdc-icon-size:26px;color:${p};}
          .stat-value{font-size:clamp(12px,4vw,18px);font-weight:800;color:${textMain};letter-spacing:-.5px;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;}
          .stat-label{font-size:11px;color:${textSub};font-weight:500;text-align:center;}
          .fan-icon{--mdc-icon-size:28px;color:${p};display:block;}
          .fan-spinning{animation:spin var(--fan-dur,4s) linear infinite;}
          .fan-stopped{opacity:.35;}
          @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
          /* Fan dropdown */
          .stat.clickable{cursor:pointer;position:relative;}
          .stat.clickable:hover{transform:translateY(-2px);background:${dark?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.95)'};}
          .fan-dropdown{
            position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);
            background:${dark?'#1e2535':'#ffffff'};
            border-radius:16px;padding:8px;
            box-shadow:0 8px 32px rgba(0,0,0,0.2),0 2px 8px rgba(0,0,0,0.1);
            border:1px solid ${statBorder};
            min-width:140px;z-index:100;
            animation:dropUp .18s ease;}
          @keyframes dropUp{from{opacity:0;transform:translateX(-50%) translateY(6px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
          .fan-dropdown-item{
            padding:10px 16px;border-radius:10px;font-size:13px;font-weight:600;
            color:${textMain};cursor:pointer;white-space:nowrap;text-align:center;
            transition:background .15s;}
          .fan-dropdown-item:hover{background:${dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.05)'};}
          .fan-dropdown-item.active{
            background:linear-gradient(135deg,${p},${alpha(p,0.8)});
            color:#fff;}
          /* SPEED SLIDER */
          .slider-wrap{grid-column:1/-1;background:${statBg};border-radius:16px;
            padding:16px 20px 14px;border:1px solid ${statBorder};position:relative;z-index:1;width:100%;box-sizing:border-box;}
          .slider-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
          .slider-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:${textSub};}
          .slider-value{font-size:13px;font-weight:700;color:${p};}
          .slider-track{position:relative;height:20px;border-radius:10px;margin:0 10px;
            background:transparent;
            cursor:pointer;touch-action:none;user-select:none;
            display:flex;align-items:center;}
          .slider-track-inner{position:absolute;left:0;right:0;height:6px;border-radius:3px;
            background:${dark?"rgba(255,255,255,0.12)":"rgba(0,0,0,0.08)"};}
          .slider-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,${s},${p});pointer-events:none;}
          .slider-thumb{position:absolute;top:50%;width:26px;height:26px;border-radius:50%;
            background:#fff;box-shadow:0 2px 10px ${alpha(p,0.55)};
            transform:translate(-50%,-50%);cursor:grab;
            border:2.5px solid ${p};touch-action:none;user-select:none;pointer-events:none;}
          .slider-labels{display:flex;justify-content:space-between;margin-top:10px;padding:0 10px;}
          .slider-label{font-size:10px;color:${textSub};}
          .mode-wrap{grid-column:1/-1;background:${statBg};border-radius:16px;padding:14px 16px;
            border:1px solid ${statBorder};display:flex;flex-direction:column;align-items:center;gap:10px;}
          .mode-title{font-size:11px;color:${textSub};font-weight:600;text-transform:uppercase;letter-spacing:.5px;}
          .mode-buttons{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}
          .mode-btn{padding:8px 22px;border-radius:20px;border:none;font-size:13px;font-weight:600;cursor:pointer;
            background:${dark?'rgba(255,255,255,0.10)':'rgba(235,240,245,0.95)'};color:${textSub};transition:all .2s;}
          .mode-btn.active{background:linear-gradient(135deg,${p},${alpha(p,0.8)});color:#fff;box-shadow:0 3px 12px ${alpha(p,0.45)};}
          .mode-btn:hover:not(.active){filter:brightness(0.95);}
          /* Preset modes */
          .preset-wrap{grid-column:1/-1;background:${statBg};border-radius:16px;
            padding:14px 16px;border:1px solid ${statBorder};
            display:flex;flex-direction:column;align-items:center;gap:10px;
            animation:fadeSlideIn .25s ease;}
          @keyframes fadeSlideIn{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}}
          .preset-title{font-size:11px;color:${textSub};font-weight:600;text-transform:uppercase;letter-spacing:.5px;}
          .preset-buttons{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}
          .preset-btn{padding:8px 20px;border-radius:20px;border:none;font-size:13px;font-weight:600;
            cursor:pointer;font-family:inherit;transition:all .2s;
            background:${dark?'rgba(255,255,255,0.10)':'rgba(235,240,245,0.95)'};color:${textSub};}
          .preset-btn.active{background:linear-gradient(135deg,${p},${alpha(p,0.8)});
            color:#fff;box-shadow:0 3px 12px ${alpha(p,0.45)};}
          .preset-btn:hover:not(.active){filter:brightness(0.95);}
        </style>
        <div class="card">
          <div class="glow-a" id="glow-a"></div><div class="glow-b" id="glow-b"></div>
          <div class="header">
            <div class="header-left">
              <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
                <div class="header-icon"><ha-icon icon="mdi:air-purifier"></ha-icon></div>
                <div class="header-filter" id="header-filter-row" style="display:none;flex-direction:column;align-items:center;gap:2px;">
                  <ha-icon icon="mdi:air-filter"></ha-icon>
                  <span id="header-filter-val" class="header-filter-val"></span>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;justify-content:center;">
                <div class="header-title" id="card-name"></div>
                <div class="header-sub" id="card-sub"></div>
              </div>
            </div>
            <button class="power-btn" id="power-btn">
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
          <div class="circle-wrap">
            <div class="circle-ring" id="circle-container" style="--csz:${circleSize}px">
              ${showParticle?'<canvas class="particles" width="360" height="360"></canvas>':''}
              <svg class="circle-ring-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="${s}"/>
                    <stop offset="100%" stop-color="${p}"/>
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="b"/>
                    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="46" fill="none" stroke="${trackColor}" stroke-width="4"/>
                <circle class="ring-inner-circle ${cfg.animate_rings!==false?'animating':'paused'}"
                  cx="50" cy="50" r="46" fill="none"
                  stroke="url(#rg)" stroke-width="4"
                  ${cfg.show_ring_glow!==false?'filter="url(#glow)"':''} opacity="0.9"/>
              </svg>
              <div class="circle-inner" id="circle-inner-content"></div>
            </div>
          </div>
          <div class="stats">
            ${showTemp?`<div class="stat"><ha-icon icon="mdi:thermometer"></ha-icon><span class="stat-value" id="temp-val">--</span><span class="stat-label">${tr(lang,'temperature')}</span></div>`:''}
            ${showHum?`<div class="stat"><ha-icon icon="mdi:water-percent"></ha-icon><span class="stat-value" id="hum-val">--</span><span class="stat-label">${tr(lang,'humidity')}</span></div>`:''}
            ${showFilter?`<div style="display:none"><span id="filter-val"></span></div>`:''}
            ${showFan?`<div class="stat${showModeDropdown?' clickable':''}" id="fan-stat"><ha-icon icon="mdi:fan" id="fan-icon" class="fan-icon fan-stopped"></ha-icon><span class="stat-value" id="fan-val">–</span><span class="stat-label">${tr(lang,'fan_speed')}</span></div>`:''}
            ${cfg.show_speed_slider!==false&&cfg.power_entity?`
            <div class="slider-wrap" id="slider-wrap">
              <div class="slider-header">
                <span class="slider-title">${tr(lang,'speed')}</span>
                <span class="slider-value" id="slider-val">${fanPct}%</span>
              </div>
              <div class="slider-track" id="slider-track">
                <div class="slider-track-inner">
                  <div class="slider-fill" id="slider-fill" style="width:${fanPct}%"></div>
                </div>
                <div class="slider-thumb" id="slider-thumb" style="left:${fanPct}%"></div>
              </div>
              <div class="slider-labels">
                <span class="slider-label">0%</span>
                <span class="slider-label">25%</span>
                <span class="slider-label">50%</span>
                <span class="slider-label">75%</span>
                <span class="slider-label">100%</span>
              </div>
            </div>`:''}

          </div>
        </div>`;

      this.shadowRoot.getElementById('power-btn')?.addEventListener('click',()=>this._togglePower());
    }

    // Dynamic updates
    const root=this.shadowRoot;
    // Background glow visibility
    const glowA=root.getElementById('glow-a');
    const glowB=root.getElementById('glow-b');
    if(glowA) glowA.style.display=cfg.show_background_glow!==false?'block':'none';
    if(glowB) glowB.style.display=cfg.show_background_glow!==false?'block':'none';

    const nameEl=root.getElementById('card-name'); if(nameEl) nameEl.textContent=cfg.name||'Premium Purifier';
    const subEl=root.getElementById('card-sub');   if(subEl)  subEl.textContent=subtitle;
    const pwrBtn=root.getElementById('power-btn');
    if(pwrBtn){ pwrBtn.style.background=pwrBg; pwrBtn.style.boxShadow=pwrShadow; pwrBtn.querySelector('ha-icon').style.color=pwrIconColor; }
    // Update circle inner content
    const circleContainer=root.getElementById('circle-container');
    // Scale circle based on actual card width
    const cardEl=root.querySelector('.card');
    const cardW=cardEl?cardEl.offsetWidth:300;
    const maxCircle=Math.min(circleSize, cardW*0.85);
    if(circleContainer) circleContainer.style.setProperty('--csz', maxCircle+'px');
    const circleInner=root.getElementById('circle-inner-content');
    if(circleInner){
      if(hasAQ){
        const gridStyle='grid-template-columns:'+aqGridCols+';';
        const aqItems=activeAQ.slice(0,8).map(s=>
          '<div class="aq-item">'+
          '<span class="aq-val" style="color:'+s.color+'">'+s.value+'</span>'+
          '<span class="aq-unit">'+s.unit+'</span>'+
          '<span class="aq-label">'+s.label+'</span>'+
          '</div>'
        ).join('');
        const aqiSensor=activeAQ.find(s=>s.key==='aqi');
        circleInner.innerHTML=
          '<div class="quality-badge">✦ '+qualityLabel+'</div>'+
          '<div class="aq-grid" style="'+gridStyle+'">'+aqItems+'</div>'+
          '<div class="aq-divider"></div>'+
          '<div class="aqi-row">'+
          '<span class="aqi-dot" style="background:'+qualityColor+'"></span>'+
          (aqiSensor
            ? '<span>AQI</span><span class="aqi-val" style="color:'+qualityColor+'">'+aqiSensor.value+'</span>'
            : '<span>'+qualityLabel+'</span>')+
          '</div>';
      } else {
        circleInner.innerHTML=
          '<div class="circle-label">'+tr(lang,'air_quality')+'</div>'+
          '<div class="circle-value" style="color:'+qualityColor+'">'+qualityLabel+'</div>'+
          '<div class="circle-pm">'+
          '<span class="pm-dot" style="background:'+qualityColor+'"></span>'+
          '<span>'+(pmRaw?'PM2.5: '+pmRaw+' µg/m³':'PM2.5: – µg/m³')+'</span>'+
          '</div>';
      }
    }
    const tEl=root.getElementById('temp-val'); if(tEl) tEl.textContent=`${temp}°C`;
    const hEl=root.getElementById('hum-val');  if(hEl) hEl.textContent=`${hum}%`;
    const headerFilterRow=root.getElementById('header-filter-row');
    const headerFilterEl=root.getElementById('header-filter-val');
    if(headerFilterRow) headerFilterRow.style.display=showFilter?'flex':'none';
    if(headerFilterEl) headerFilterEl.textContent='Filter '+filterVal+'%';
    const fEl=root.getElementById('fan-val');
    const displayMode=useCustomMode?customModeCurrent:(currentPreset||mode||'–');
    if(fEl) fEl.textContent=isOn?displayMode:'–';

    // Fan dropdown — rendered in document.body to escape shadow DOM completely
    const fanStat=root.getElementById('fan-stat');
    if(fanStat && !fanStat._dropdownInit) {
      fanStat._dropdownInit=true;

      const closeDropdown=()=>{
        document.getElementById('ppc-fan-dropdown')?.remove();
      };

      const openDropdown=()=>{
        const useCustom=this._config.use_custom_mode&&this._config.custom_mode_entity;
        const customEnt=useCustom?this._hass?.states[this._config.custom_mode_entity]:null;
        let modes=[];
        if(useCustom){
          modes=customEnt?.attributes?.options||[];
        } else {
          const fanState=this._hass?.states[this._config.power_entity];
          // Try different attribute names Xiaomi and other fans use
          modes=fanState?.attributes?.preset_modes
            ||fanState?.attributes?.fan_modes
            ||fanState?.attributes?.speed_list
            ||fanState?.attributes?.mode_list
            ||[];
        }
        if(!modes.length) return;

        closeDropdown();

        const rect=fanStat.getBoundingClientRect();
        const cur=useCustom
          ?(customEnt?.state||'')
          :(this._hass?.states[this._config.power_entity]?.attributes?.preset_mode
            ||this._hass?.states[this._config.power_entity]?.attributes?.fan_mode
            ||'');
        const cfg=this._config;
        const p=cfg.color_primary||'#00c896';
        const bg=cfg.color_bg1||'#ffffff';
        const dark=isDark(bg);

        const dd=document.createElement('div');
        dd.id='ppc-fan-dropdown';
        Object.assign(dd.style,{
          position:'fixed',
          left: rect.left + rect.width/2 + 'px',
          bottom: (window.innerHeight - rect.top + 8) + 'px',
          transform:'translateX(-50%)',
          background: dark?'#1e2535':'#ffffff',
          borderRadius:'16px',
          padding:'8px',
          boxShadow:'0 8px 32px rgba(0,0,0,0.25),0 2px 8px rgba(0,0,0,0.15)',
          border:'1px solid rgba(0,0,0,0.08)',
          minWidth:'140px',
          zIndex:'99999',
          animation:'none',
          opacity:'1',
        });

        modes.forEach(pm=>{
          const item=document.createElement('div');
          const isActive=cur.toLowerCase()===pm.toLowerCase();
          Object.assign(item.style,{
            padding:'10px 16px',
            borderRadius:'10px',
            fontSize:'13px',
            fontWeight:'600',
            fontFamily:'-apple-system,sans-serif',
            color: isActive ? '#fff' : (dark?'#f0f4f8':'#1a2332'),
            background: isActive ? `linear-gradient(135deg,${p},${alpha(p,0.8)})` : 'transparent',
            cursor:'pointer',
            whiteSpace:'nowrap',
            textAlign:'center',
            transition:'background .15s',
          });
          item.textContent=pm.charAt(0).toUpperCase()+pm.slice(1);

          item.addEventListener('mouseenter',()=>{
            if(!isActive) item.style.background=dark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.05)';
          });
          item.addEventListener('mouseleave',()=>{
            if(!isActive) item.style.background='transparent';
          });

          item.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            const useCustom=this._config.use_custom_mode&&this._config.custom_mode_entity;
            if(useCustom){
              const domain=this._config.custom_mode_entity.split('.')[0];
              const svc=domain==='input_select'?'select_option':'select_option';
              const payload=domain==='input_select'
                ?{entity_id:this._config.custom_mode_entity,option:pm}
                :{entity_id:this._config.custom_mode_entity,option:pm};
              this._hass.callService(domain,svc,payload);
            } else if(this._hass&&this._config.power_entity){
              this._hass.callService('fan','set_preset_mode',{
                entity_id:this._config.power_entity,
                preset_mode:pm,
              });
            }
            closeDropdown();
          });
          dd.appendChild(item);
        });

        document.body.appendChild(dd);

        // Close on outside click
        const close=(ev)=>{
          if(!dd.contains(ev.target)){
            closeDropdown();
            document.removeEventListener('click',close,true);
          }
        };
        setTimeout(()=>document.addEventListener('click',close,true),0);
      };

      fanStat.addEventListener('click',(e)=>{
        e.stopPropagation();
        if(document.getElementById('ppc-fan-dropdown')){ closeDropdown(); return; }
        openDropdown();
      });
    }
    // Update ring animation speed dynamically
    const ringEl=root.querySelector('.ring-inner-circle');
    if(ringEl && cfg.animate_rings!==false){
      const rSpd=cfg.sync_ring_to_fan?fanPct:(cfg.ring_speed??50);
      const rDur=rSpd===0?'9999s':Math.max(0.2,8-(rSpd/100)*7.8).toFixed(1)+'s';
      ringEl.style.animationDuration=rDur;
    }


    const fanIcon=root.getElementById('fan-icon');
    if(fanIcon){
      if(fanDur && cfg.animate_fan!==false){
        fanIcon.style.setProperty('--fan-dur',fanDur);
        fanIcon.className='fan-icon fan-spinning';
      } else if(fanDur) {
        fanIcon.className='fan-icon'; // on but no animation
      } else {
        fanIcon.className='fan-icon fan-stopped';
      }
    }
    // Slider — use pointerevents for smooth, lag-free touch+mouse unified handling
    const sliderTrack = root.getElementById('slider-track');
    if (sliderTrack && !sliderTrack._initialized) {
      sliderTrack._initialized = true;
      let dragging = false;
      let currentPct = fanPct;

      const getPct = (clientX) => {
        const rect = sliderTrack.getBoundingClientRect();
        return Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
      };

      const updateVisual = (pct) => {
        currentPct = pct;
        const fill  = root.getElementById('slider-fill');
        const thumb = root.getElementById('slider-thumb');
        const val   = root.getElementById('slider-val');
        if (fill)  fill.style.width       = pct + '%';
        if (thumb) thumb.style.left       = pct + '%';
        if (val)   val.textContent        = pct + '%';
      };

      // Pointer events — unified mouse+touch, no passive issues
      sliderTrack.addEventListener('pointerdown', (e) => {
        dragging = true;
        sliderTrack.setPointerCapture(e.pointerId); // capture so move events keep firing
        e.preventDefault();
        updateVisual(getPct(e.clientX));
      });

      sliderTrack.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        e.preventDefault();
        updateVisual(getPct(e.clientX));
      });

      sliderTrack.addEventListener('pointerup', (e) => {
        if (!dragging) return;
        dragging = false;
        updateVisual(getPct(e.clientX));
        this._setFanSpeed(currentPct);
      });

      sliderTrack.addEventListener('pointercancel', () => { dragging = false; });
    }

    // Sync slider to HA state only when not being dragged
    const sliderFill  = root.getElementById('slider-fill');
    const sliderThumb = root.getElementById('slider-thumb');
    const sliderVal   = root.getElementById('slider-val');
    if (!sliderTrack?._dragging) {
      if (sliderFill)  sliderFill.style.width  = fanPct + '%';
      if (sliderThumb) sliderThumb.style.left  = fanPct + '%';
      if (sliderVal)   sliderVal.textContent   = fanPct + '%';
    }

    if(showParticle){
      const canvas=root.querySelector('canvas.particles');
      if(canvas){
        const pSpd=cfg.sync_particles_to_fan?fanPct:(cfg.particle_speed??50);
        const pMult=Math.max(0.05,(pSpd/100)*3.0);
        const needRestartP=speed!==this._lastSpeed||!this._raf||
          (cfg.sync_particles_to_fan&&fanPct!==this._lastFanPct)||
          pMult!==this._lastPMult;
        if(needRestartP){
          this._lastSpeed=speed;
          this._lastFanPct=fanPct;
          this._lastPMult=pMult;
          if(speed===0){ this._stopParticles(); this._ctx?.clearRect(0,0,canvas.width,canvas.height); }
          else { this._startParticles(canvas,speed,p,s,pMult); }
        }
      }
    } else { this._stopParticles(); }
    } catch(e) {
      console.error('PremiumPurifierCard render error:', e);
    }
  }

  disconnectedCallback(){ this._stopParticles(); }
  getCardSize(){ return 5; }
}

customElements.define('premium-purifier-card', PremiumPurifierCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type:        'premium-purifier-card',
  name:        'Premium Purifier Card',
  description: 'Luftrenarskort med partikelanimation, fläktanimation, flerspråksstöd och UI-konfiguration.',
  preview:     true,
});
