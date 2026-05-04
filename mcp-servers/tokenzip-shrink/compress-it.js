// tokenzip-shrink — compressore prosa per descrizioni tool MCP (Italiano)
// Reimplementazione delle regole tokenzip-it per il proxy.

const FILLERS = new RegExp(
  '\\b(?:solo|proprio|davvero|praticamente|semplicemente|fondamentalmente|essenzialmente|letteralmente|già|poi|in realtà|in pratica)\\b',
  'gi'
);

const PLEASANTRIES = new RegExp(
  '\\b(?:per favore|gentilmente|grazie|certo|certamente|di nulla|felice di|volentieri)\\b[,.]?\\s*',
  'gi'
);

const HEDGES = new RegExp(
  '\\b(?:forse|magari|potrebbe essere|penso che|secondo me|sembra che|mi sembra|in mia opinione|varrebbe la pena)\\b\\s*',
  'gi'
);

const LEADERS = new RegExp(
  '^(?:io farò|farò|posso|vorrei|facciamo|lasciami|permettimi|ti mostro)\\s+',
  'gim'
);

// Articoli determinativi, indeterminativi e partitivi italiani
const ARTICLES = /\b(?:il|lo|la|i|gli|le|un|uno|una|dei|degli|delle|del|dello|della|al|allo|alla|ai|agli|alle)\s+(?=[a-z])/gi;

const PROTECTED_PATTERNS = [
  /```[\s\S]*?```/g,                          // fenced code
  /`[^`\n]+`/g,                               // inline code
  /\bhttps?:\/\/\S+/gi,                       // URLs
  /\b[\w.-]*[\/\\][\w.\/\\\-]+/g,             // paths with / or \
  /\b[A-Z][A-Za-z0-9]*(?:_[A-Z][A-Za-z0-9]*)+\b/g, // CONST_CASE
  /\b\w+\.\w+(?:\.\w+)*\(\)?/g,               // dotted.method or pkg.fn()
  /[A-Za-z_][A-Za-z0-9_]*\s*\([^)]*\)/g,      // function calls
  /\b\d+\.\d+\.\d+\b/g,                       // version numbers
];

function withProtectedSegments(text, transform) {
  const segments = [];
  let working = text;
  for (const re of PROTECTED_PATTERNS) {
    working = working.replace(re, m => {
      const i = segments.length;
      segments.push(m);
      return ` ${i} `;
    });
  }
  let out = transform(working);
  out = out.replace(/ (\d+) /g, (_, i) => segments[+i]);
  return out;
}

function compressProse(text) {
  let s = text;
  s = s.replace(LEADERS, '');
  s = s.replace(PLEASANTRIES, '');
  s = s.replace(HEDGES, '');
  s = s.replace(FILLERS, '');
  s = s.replace(ARTICLES, '');
  // Collassa spazi ripetuti
  s = s.replace(/[ \t]{2,}/g, ' ');
  s = s.replace(/\s+([,.;:!?])/g, '$1');
  s = s.replace(/\n{3,}/g, '\n\n');
  // Capitalizza prima lettera frasi
  s = s.replace(/(^|[.!?]\s+)([a-z])/g, (_, pre, ch) => pre + ch.toUpperCase());
  return s.trim();
}

function compress(text, _opts) {
  if (typeof text !== 'string' || text.length === 0) {
    return { compressed: text, before: 0, after: 0 };
  }
  const before = text.length;
  const compressed = withProtectedSegments(text, compressProse);
  return { compressed, before, after: compressed.length };
}

function compressDescriptionsInPlace(obj, fieldNames) {
  const fields = new Set(fieldNames || ['description']);
  if (!obj || typeof obj !== 'object') return;
  if (Array.isArray(obj)) {
    for (const item of obj) compressDescriptionsInPlace(item, [...fields]);
    return;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (fields.has(key) && typeof val === 'string') {
      obj[key] = compress(val).compressed;
    } else if (val && typeof val === 'object') {
      compressDescriptionsInPlace(val, [...fields]);
    }
  }
}

module.exports = { compress, compressDescriptionsInPlace, withProtectedSegments };
