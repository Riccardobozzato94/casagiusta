# 05 — Design System & UI

> **CasaGiusta** — "Il tuo scudo digitale. I tuoi diritti, subito."
> Versione 1.0 — Design System completo

---

## Indice

1. [Brand Identity](#1-brand-identity)
2. [Colori](#2-colori)
3. [Tipografia](#3-tipografia)
4. [Spacing & Layout](#4-spacing--layout)
5. [Componenti UI Principali](#5-componenti-ui-principali)
6. [Screen Layout](#6-screen-layout)
7. [Animazioni e Motion](#7-animazioni-e-motion)
8. [Tailwind Config](#8-tailwind-config)
9. [Accessibilità](#9-accessibilità)
10. [Low-Stimulus Mode](#10-low-stimulus-mode)
11. [Dark Mode](#11-dark-mode)

---

## 1. Brand Identity

### Nome, Tagline, Valori

| Elemento | Valore |
|---|---|
| **Nome** | CasaGiusta |
| **Tagline** | "Il tuo scudo digitale. I tuoi diritti, subito." |
| **Sottotitolo** | Tutela inquilini, chiara e immediata |

**Perché "CasaGiusta"**: Il nome unisce il concetto di casa (luogo sicuro, personale, emotivo) con giustizia (diritto, equità, protezione). È caldo, non burocratico. Comunicato in due sillabe piane, facile da ricordare e pronunciare.

**Perché la tagline**: Comunica protezione ("scudo"), appartenenza ("tuo"), immediatezza ("subito") e digitalità senza essere fredda. Il punto fermo dopo "subito" dà determinazione.

**Valori fondamentali**:

1. **Empatia radicale** — Ogni interazione parte dal presupposto che chi usa l'app ha paura, è confuso o è stato spaventato da una comunicazione legale. Non minimizziamo, non giudichiamo, non burocratizziamo.
2. **Trasparenza totale** — Nessun legalese nascosto. Ogni azione legale generata mostra esattamente cosa contiene, perché, e cosa succede dopo. Zero sorprese.
3. **Azione immediata** — Dalla paura all'azione in meno di 60 secondi. Template pronti, guide passo-passo, generazione documenti istantanea.
4. **Privacy sacra** — I dati degli inquilini sono i più sensibili che esistano (reddito, contratto, corrispondenza legale). Crittografia end-to-end, zero condivisione, minimo dato raccolto.
5. **Comunità senza giudizio** — Chi arriva su CasaGiusta spesso si vergogna o ha paura di essere giudicato. L'app non chiede mai "perché non hai fatto X prima", non usa toni colpevolizzanti. Ogni messaggio è costruito per accogliere, non per giudicare.

### Personalità Brand

**Archetipo**: Il Protettore / Il Compagno Saggio

**Tono generale**: "Amico competente e calmo che sa esattamente cosa fare quando hai paura"

| Dimensione | Posizionamento |
|---|---|
| **Emozione** | Calma rassicurante, non urgenza panica |
| **Competenza** | Esperta ma accessibile, non professoressa |
| **Vicinanza** | "Tu" sempre, mai "Lei", mai "l'utente" |
| **Giudizio** | Zero. Mai "avresti dovuto", mai "purtroppo" |
| **Linguaggio** | Italiano chiaro, diretto, empatico, zero legalese |

**Non siamo**:
- Un'agenzia di avvocati distaccati
- Un modulo burocratico digitalizzato
- Una piattaforma che si lava le mani con disclaimer infiniti

**Siamo**:
- Qualcuno che ti siede accanto e dice "ok, facciamo un passo alla volta"
- Una mano ferma che ti guida quando tutto sembra crollare
- Uno scudo che trasforma la paura in azione

**Esempi copy**:

| Situazione | Copy CasaGiusta | Copy tradizionale (da evitare) |
|---|---|---|
| Lettera di sfratto | "Hai ricevuto una lettera di sfratto? Respiriamo. Ti guido passo passo." | "La procedura di sfratto è disciplinata dall'art. 657 c.p.c. Lei ha X giorni per..." |
| Aumento canone | "Questo aumento non è a norma. Ecco la diffida pronta." | "Verifichiamo la conformità dell'indice ISTAT applicato al fine di..." |
| Primo accesso | "Non sai da dove iniziare? Inizia da qui. Siamo con te." | "Benvenuto. Seleziona una delle opzioni disponibili dal menu." |
| Carica documento | "Trascina qui il tuo contratto. Lo leggiamo insieme." | "Carica file (formati supportati: PDF, JPG, PNG, max 10MB)." |
| Caso vinto | "Ce l'abbiamo fatta. 🎉 Il tuo deposito cauzionale ti sarà restituito." | "La procedura si è conclusa con esito favorevole." |

---

## 2. Colori

### Design Tokens — Colori

```css
/* Design Tokens - Colori */
:root {
  /* ── Primary: Deep Teal (fiducia, casa, stabilità) ── */
  --color-primary-50:  #f0fdfa;
  --color-primary-100: #ccfbf1;
  --color-primary-200: #99f6e4;
  --color-primary-300: #5eead4;
  --color-primary-400: #2dd4bf;
  --color-primary-500: #14b8a6;
  --color-primary-600: #0d9488;
  --color-primary-700: #0f766e;
  --color-primary-800: #115e59;
  --color-primary-900: #134e4a;

  /* ── Accent: Warm Coral (urgenza positiva, azione) ── */
  --color-accent-50:  #fff7ed;
  --color-accent-100: #ffedd5;
  --color-accent-200: #fed7aa;
  --color-accent-300: #fdba74;
  --color-accent-400: #fb923c;
  --color-accent-500: #f97316;
  --color-accent-600: #ea580c;
  --color-accent-700: #c2410c;
  --color-accent-800: #9a3412;
  --color-accent-900: #7c2d12;

  /* ── Neutrals (light) ── */
  --color-bg-primary:     #ffffff;
  --color-bg-secondary:   #f8fafc;
  --color-bg-tertiary:    #f1f5f9;
  --color-text-primary:   #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary:  #94a3b8;
  --color-border:         #e2e8f0;

  /* ── Dark mode ── */
  --color-dark-bg-primary:     #0f172a;
  --color-dark-bg-secondary:   #1e293b;
  --color-dark-bg-tertiary:    #334155;
  --color-dark-text-primary:   #f8fafc;
  --color-dark-text-secondary: #cbd5e1;
  --color-dark-text-tertiary:  #64748b;
  --color-dark-border:         #334155;

  /* ── Semantic ── */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger:  #ef4444;
  --color-info:    #3b82f6;
}
```

### Psicologia dei colori e applicazione nel contesto

#### Primary: Deep Teal (`#14b8a6` → `#134e4a`)

**Psicologia**: Il teal (unione di blu e verde) è universalmente associato a fiducia (blu) e crescita/rinnovamento (verde). È il colore del mare calmo, della stabilità che dura. Comunicato: *"Siamo qui, siamo solidi, non scappiamo."*

**Applicazione CasaGiusta**:

| Scala | Uso | Perché |
|---|---|---|
| 50–200 | Sfondo sezioni, badge informativi, alert info | Neutro rassicurante, non distrae |
| 300–400 | Bordi focus, link, icone secondarie | Visibile ma non aggressivo |
| 500 | **CTA primari**, button principali, tab attivo | Massima leggibilità su sfondo chiaro |
| 600–700 | Hover button, header, barre navigazione | Abbastanza scuro per testo bianco AAA |
| 800–900 | Testi ad alta enfasi, background dark mode | Sostituisce il nero puro, meno ansia |

**Contesto**: Quando un utente spaventato apre CasaGiusta, il teal non grida. È il colore di qualcuno che ha esperienza e non si agita. Sugli sfondi scuri diventa quasi un abbraccio visivo.

#### Accent: Warm Coral (`#f97316` → `#c2410c`)

**Psicologia**: L'arancione bruciato/ corallo è il colore dell'azione, della creatività, dell'energia positiva. Non è rosso (pericolo, sangue, allarme) ma nemmeno giallo (attenzione, caution). È *"muoviamoci, ma con calma"*.

**Applicazione CasaGiusta**:

| Scala | Uso | Perché |
|---|---|---|
| 500 | **CTA secondari**, link azione urgente, highlight "azioni possibili" | Spinge all'azione senza l'allarme del rosso |
| 600 | Button "Genera diffida", "Invia raccomandata" | Azione decisiva ma controllata |
| 700 | Hover degli accent, icone "azione rapida" | Massimo contrasto su sfondo chiaro |

**Contesto**: Il coral dice *"c'è qualcosa che puoi fare ORA, ed è positivo"*. Non è il rosso di un allarme (che paralizza), è il colore di chi si rimbocca le maniche. Usato con parsimonia: 1–2 elementi per schermo.

#### Neutrals (light mode)

| Colore | Uso | Perché |
|---|---|---|
| `#ffffff` | Sfondo pagine, card, modali | Massima leggibilità, pulito |
| `#f8fafc` | Sfondo secondario (sidebar, sezioni) | Leggera differenziazione senza affaticare |
| `#f1f5f9` | Sfondo terziario (input disabled, empty states) | Ancora più differenziato, ma non grigio triste |
| `#0f172a` | Testi primari (headline, corpo) | Contrasto AAA su #fff (ratio 15.2:1) |
| `#475569` | Testi secondari (label, descrizioni) | Contrasto AAA su #fff (ratio 7.8:1) |
| `#94a3b8` | Testi terziari (placeholder, helper) | Contrasto AA su #fff (ratio 4.5:1), non AAA volutamente (devono essere secondari) |
| `#e2e8f0` | Bordi, divider, separatori | Leggeri ma presenti |

#### Colori Semantici

| Colore | Uso | Esempio contestuale |
|---|---|---|
| `#10b981` **Verde successo** | Conferme, completamento, positive action | "Diffida inviata con successo", "Contratto verificato" |
| `#f59e0b` **Giallo warning** | Attenzione, scadenza imminente, info importante | "Il tuo contratto scade tra 15 giorni", "Documento in scadenza" |
| `#ef4444` **Rosso danger** | Pericolo, errore bloccante, emergenza | "Sfratto esecutivo", "Richiesta rifiutata", Emergency Button |
| `#3b82f6` **Blu info** | Informazione neutra, suggerimento, guida | "Suggerimento: carica prima il contratto", "Novità disponibile" |

#### Regole di contrasto e applicazione

- **Tutti i testi informativi** (body, label, paragrafi) devono avere contrasto WCAG AAA (ratio ≥ 7:1).
- **Testi decorativi / placeholder** possono scendere a AA (ratio ≥ 4.5:1).
- **Non usare MAI il grigio chiaro** come colore di stato attivo o interattivo.
- **Non usare MAI il solo colore** per comunicare uno stato — sempre accompagnato da icona e/o testo.

### Utilizzo colori per stati emotivi

| Stato utente | Palette dominante | Perché |
|---|---|---|
| Calma / esplorazione | Primary 100–500, neutrals | Rassicura, non stimola |
| Confusione / primo accesso | Primary 400–700 + Info blue | Guida senza ansia |
| Paura (sfratto, morosità) | Primary 700–900 bg + White text + Danger per azioni | Riduce l'iperstimolo, concentra su azione |
| Azione (genera documento) | Accent 500–700 | Energia positiva, slancio |
| Successo / risolto | Verde 500 + Primary 200 | Festa soft, non invasiva |
| Emergenza | Rosso danger + testo bianco | Chiara, immediata, non ambigua |

---

## 3. Tipografia

### Font family

| Ruolo | Font | Fallback | Spessori |
|---|---|---|---|
| **Display** (headline, titoli grandi, numeri hero) | Satoshi | Geist Sans, system-ui sans-serif | 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black) |
| **Body** (testi UI, paragrafi, label, button) | Inter | system-ui, -apple-system, sans-serif | 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) |
| **Mono** (citazioni legali, articoli di legge, codice, riferimenti normativi) | JetBrains Mono | SF Mono, Fira Code, monospace | 400 (Regular), 500 (Medium), 700 (Bold) |

**Perché Satoshi per display**: Satoshi ha un carattere geometrico ma caldo, con terminali leggermente arrotondati che lo rendono accessibile senza essere giocoso. Leggero, arioso, moderno.

**Perché Inter per body**: Inter è stato progettato specificamente per schermi. Ha un'x-height alta che migliora la leggibilità a dimensioni piccole, e la sua spaziatura è ottimizzata per UI. Supporta perfettamente il latino esteso (lettere accentate italiane).

**Perché JetBrains Mono per legalese**: Le citazioni di articoli di legge richiedono massima precisione visiva. Un font monospace garantisce che ogni carattere sia inequivocabile, cruciale per riferimenti come "art. 157 c.c." dove confondere "c.c." con "c.m." sarebbe grave. Le legature opzionali migliorano la leggibilità di testi legali complessi.

### Scala tipografica

```css
/* Scala tipografica (base 16px, modular scale 1.25 - Major Third) */
--text-xs:    0.75rem;   /* 12px — Caption, metadati, note legali */
--text-sm:    0.875rem;  /* 14px — Body piccolo, label, helper text */
--text-base:  1rem;      /* 16px — Body standard, paragrafi */
--text-lg:    1.125rem;  /* 18px — Body grande, lead paragraph */
--text-xl:    1.25rem;   /* 20px — Sub-headline, card titoli */
--text-2xl:   1.5rem;    /* 24px — Section headline piccolo */
--text-3xl:   1.875rem;  /* 30px — Section headline */
--text-4xl:   2.25rem;   /* 36px — Page headline */
--text-5xl:   3rem;      /* 48px — Hero headline (mobile) */
--text-6xl:   3.75rem;   /* 60px — Hero headline (desktop) */
--text-7xl:   4.5rem;    /* 72px — Hero large, marketing */
```

### Line height

| Categoria | Line height | Quando |
|---|---|---|
| **Display** (text-3xl → text-7xl) | `1.1` | Titoli, headline, numeri hero |
| **Sub-display** (text-xl → text-2xl) | `1.2` | Sub-headline, titoli card |
| **Body compatto** (UI, button, label) | `1.4` | Testi in card, sidebar, navigazione |
| **Body standard** (text-base, text-lg) | `1.5` | Paragrafi, descrizioni, voci di legge |
| **Testo lungo** (articoli, guide, FAQ) | `1.6` | Testi estesi, documenti, lettura continua |
| **Mono** (citazioni legali) | `1.7` | Massima leggibilità per testo monospace |

### Letter spacing

```css
--tracking-tight:   -0.02em;  /* Display, headline grandi */
--tracking-normal:   0em;      /* Body, UI text */
--tracking-wide:     0.02em;   /* All caps label, badge */
--tracking-mono:     0em;      /* Codice, citazioni legali */
```

### Gerarchia visiva su schermata tipica

```
┌─────────────────────────────────────┐
│                                     │
│  Benvenuto su CasaGiusta           │ → text-4xl, Display, Bold, tracking-tight
│                                     │
│  Il tuo scudo digitale              │ → text-lg, Body, Regular, color-secondary
│                                     │
│  ┌───────────────────────────────┐  │
│  │ Azioni rapide                  │  │ → text-xl, Display, Medium
│  │ Hai 3 notifiche                │  │ → text-sm, Body, Regular, color-tertiary
│  └───────────────────────────────┘  │
│                                     │
│  Casi attivi                       │ → text-2xl, Display, SemiBold
│  Trascina qui il contratto         │ → text-base, Body, Regular
│                                     │
│  Nota legale: art. 157 c.c.        │ → text-sm, Mono, Regular
│                                     │
└─────────────────────────────────────┘
```

### Regole tipografiche

1. **Maiuscolo solo per label e badge** (e mai tutto un paragrafo). Usare `text-sm` tracking-wide.
2. **Mai più di 70 caratteri per riga** per testi lunghi (guide, FAQ, articoli di legge).
3. **Gerarchia a 3 livelli max** per schermata: Headline → Sub-headline → Body. Non di più.
4. **Citazioni legali sempre in JetBrains Mono** con sfondo terziario e bordo sinistro (blockquote style).
5. **Numeri grandi** (importi, date, percentuali) sempre in Display, anche se in mezzo a testo body.

---

## 4. Spacing & Layout

### Base unit e spacing scale

```css
/* Base unit: 4px */
--space-0:   0px;
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
--space-40:  160px;
--space-48:  192px;
--space-64:  256px;
```

### Regole di spacing

| Relazione | Token | Esempio |
|---|---|---|
| Tra icona e label in button | `space-2` (8px) | Icon + "Carica prova" |
| Tra label e input | `space-2` (8px) | Label "Nome" → input field |
| Tra paragrafi consecutivi | `space-4` (16px) | Corpo testo → corpo testo |
| Tra card in una lista | `space-4` (16px) | Card caso 1 → Card caso 2 |
| Tra sezioni di pagina | `space-8` (32px) | "Casi attivi" → "Azioni rapide" |
| Tra headline e contenuto | `space-6` (24px) | "I tuoi casi" → prima card |
| Padding interno card | `space-5` (20px) | Bordo card → contenuto |
| Padding orizzontale pagina | `space-4` (16px) mobile, `space-8` (32px) desktop | Margini laterali |
| Tra form elements | `space-5` (20px) | Input 1 → Input 2 |
| Bottom sheet padding | `space-6` (24px) | Contenuto modale |
| Safe area bottom | `space-8` (32px) extra | iOS home indicator |

### Layout responsive

```css
/* Breakpoints */
--bp-mobile:  480px;
--bp-tablet:  768px;
--bp-desktop: 1200px;

/* Max content widths */
--max-content-mobile:  100%;  /* Full width con padding */
--max-content-tablet:  640px;
--max-content-desktop: 1200px;
```

**Strategia mobile-first**: Tutti i layout sono progettati partendo da mobile (480px). Tablet (768px) e desktop (1200px) sono espansioni progressive.

### Bento grid dashboard

La schermata Home utilizza un layout bento grid (ispirato a iOS widgets). Su mobile, 1 colonna; su tablet 2 colonne; su desktop 3 colonne.

```css
/* Bento grid template (mobile: 1col, tablet: 2col, desktop: 3col) */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1200px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

Ogni widget bento può occupare:
- `1×1` — standard (es. "Il tuo contratto scade tra X mesi")
- `2×1` — orizzontale (es. "Casi attivi" con scroll)
- `1×2` — verticale (es. lista ultime prove)
- `2×2` — hero (es. stato completo, AI quick action)

### Safe area insets

```css
/* Safe area per iOS/Android notch e home indicator */
--safe-area-top:    env(safe-area-inset-top, 0px);
--safe-area-bottom: env(safe-area-inset-bottom, 16px);
--safe-area-left:   env(safe-area-inset-left, 0px);
--safe-area-right:  env(safe-area-inset-right, 0px);
```

**Applicazione**:
- **Header**: padding-top include `safe-area-top` (su iOS, ~44px notch + 20px status bar)
- **Bottom Navigation**: padding-bottom include `safe-area-bottom` (su iOS, ~34px home indicator)
- **Modali full-screen**: rispettano tutti i safe area
- **FAB**: margine bottom tiene conto di `safe-area-bottom`

### Regole generali layout

1. **Touch target minimo 44×44pt** (Apple HIG). Ogni elemento interattivo deve avere area cliccabile di almeno 44×44pt, anche se visivamente è più piccolo.
2. **Distanza minima tra elementi tappabili**: 8px. Nessun button o link deve essere a meno di 8px da un altro elemento interattivo.
3. **Padding orizzontale coerente**: stesso padding su tutta l'app per ogni livello di viewport.
4. **Content first**: ogni schermata mostra prima il contenuto più rilevante per lo stato emotivo dell'utente. In emergenza, la CTA di azione è sempre above the fold.
5. **Scroll verticale, mai orizzontale** (tranne per carousel di card).

---

## 5. Componenti UI Principali

### 5.1 Bottom Navigation (mobile)

```
┌─────────────────────────────────────────────┐
│                                             │
│              ─── CONTENUTO ───              │
│                                             │
│                                             │
│                                             │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│      │      │      │      │      │          │
│  🏠  │  📁  │  ⚡  │  📋  │  👤  │   ← 5 tab
│ Home │Vault │Giusta│ Casi │Profilo│
│      │      │      │      │      │
│      │      │  🆘  │      │      │   ← Emergency FAB
│      │      │      │      │      │
└──────┴──────┴──────┴──────┴──────┴──────────┘
     ← safe area bottom →
```

**Specifiche**:

| Proprietà | Valore |
|---|---|
| Altezza totale | 64px + `safe-area-bottom` |
| Altezza barra icone | 48px |
| Padding bottom extra | `safe-area-bottom` (min 16px) |
| Colore sfondo | `--color-bg-primary` (light) / `--color-dark-bg-secondary` (dark) |
| Bordo superiore | 1px `--color-border` |
| Icon size | 24×24pt |
| Label size | `text-xs` (12px) |
| Active color | `--color-primary-500` |
| Inactive color | `--color-text-tertiary` (grigio 400) |
| Active indicator | Icon filled variant + label primary color |

**Tab icons (SF Symbols / Lucide equivalents)**:

| Tab | Icona (inactive) | Icona (active) | Label |
|---|---|---|---|
| Home | `house` | `house.fill` | Home |
| Vault | `archivebox` | `archivebox.fill` | Vault |
| AI Giusta | `bolt` | `bolt.fill` | Giusta |
| Casi | `doc.text` | `doc.text.fill` | Casi |
| Profilo | `person.crop.circle` | `person.crop.circle.fill` | Profilo |

**Emergency FAB centrale**:

- Posizionato al centro della bottom nav, **sempre visibile**, non scolla
- Dimensioni: 48×48pt (cerchio), con `--color-danger` rosso
- Icona: `exclamationmark.shield.fill` (scudo con punto esclamativo)
- **Richiede conferma** prima di attivare: "Stai per attivare la procedura di emergenza. Vuoi continuare?"
- Non è un button di "chiamata" — attiva una procedura guidata di emergenza (es. "Hai ricevuto uno sfratto esecutivo? Ti guido io.")
- Ombra leggera rossa (`box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3)`)

### 5.2 Header

```
┌─────────────────────────────────────────────┐
│ ← [back]  Titolo Pagina          [🔍] [👤] │
│                                             │
│  ─── sottotitolo / breadcrumb ───           │
│                                             │
│ ───── border-bottom ─────                   │
└─────────────────────────────────────────────┘
     ← safe area top → padding
```

**Specifiche**:

| Proprietà | Valore |
|---|---|
| Padding top | `safe-area-top` + `space-3` (12px) |
| Padding bottom | `space-3` (12px) |
| Padding orizzontale | `space-4` (16px) |
| Altezza minima (no notch) | 56px |
| Altezza notch iOS | 56px + safe area (~44px) = ~100px totali |

**Varianti header**:

1. **Default**: Titolo + avatar/profile icon a destra
2. **Con back button**: `←` + Titolo + (opzionale) azioni destra
3. **Con azioni multiple**: `←` + Titolo + [Filtro] [Ricerca] [Menu]
4. **Grande**: Testo grande + sottotitolo + azioni (usato in Profilo, Home)
5. **Trasparente**: Nessun bg, testo su sfondo (usato in detail view con hero)

**Notch-aware**: Su dispositivi iOS, l'header si adatta automaticamente usando `safe-area-top`. Su Android, `status-bar-height` viene rilevato e applicato.

### 5.3 Card

```
┌──────────────────────────────────┐
│                                  │
│  ┌───┐                          │
│  │ 🏠│  Titolo Card              │
│  └───┘  Sottotitolo / indirizzo  │
│                                  │
│  ──────────────────────────────  │
│                                  │
│  Dettaglio 1: valore              │
│  Dettaglio 2: valore              │
│                                  │
│  ──────────────────────────────  │
│                                  │
│  [Azione 1]        [Azione 2]    │
│                                  │
└──────────────────────────────────┘
```

**Specifiche**:

| Proprietà | Valore |
|---|---|
| Border radius | 12px (mobile), 16px (desktop) |
| Padding | `space-5` (20px) |
| Sfondo | `--color-bg-primary` |
| Bordo | 1px `--color-border` |
| Ombra | `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05)` |
| Gap titolo-contenuto | `space-3` (12px) |

**Varianti**:

1. **Standard**: Bordo `--color-border`, ombra leggera. Uso generale.
2. **Evidenza**: Bordo `--color-primary-500` 2px (lato sinistro più spesso o bordo intero). Usato per "caso attivo", "contratto principale".
3. **Alert**: Bordo `--color-danger` 2px, ombra rossa leggera. Usato per "sfratto imminente", "scadenza critica".
4. **Vuoto (empty state)**: Bordo dashed `--color-border`, sfondo `--color-bg-tertiary`. Usato per "nessuna prova", "nessun caso". Contiene illustrazione + testo empatico + CTA.
5. **Compatto**: Padding ridotto (`space-3`), bordo più sottile. Usato in liste dense, carousel orizzontale.
6. **Clickable**: Aggiunge `cursor: pointer`, hover con ombra aumentata (`0 4px 12px rgba(...)`), active con scala 0.98.

**Casi d'uso**:

| Tipo card | Contenuto tipico |
|---|---|
| **Contratto** | Tipo contratto, indirizzo, canone, scadenza, stato (in corso/scaduto) |
| **Prova** | Anteprima file, nome, data caricamento, categoria, case associato |
| **Caso** | Nome caso, stato (stepper), data apertura, prossima scadenza, badge urgenza |
| **Notifica** | Icona tipo, titolo, anteprima, timestamp, badge (letta/non letta) |
| **Risorsa** (AI) | Titolo guida, anteprima testo, icona categoria, "Leggi" |

### 5.4 Chat Bubble (AI Giusta)

```
┌──────────────────────────────────────────────┐
│                                              │
│  ┌─────────────────────────────────┐         │
│  │  Certo! L'art. 157 c.c. dice    │  ◀ AI   │
│  │  che...                          │         │
│  │                                 │         │
│  │  ─── citazione ───              │         │
│  │  │ Art. 157 Codice Civile     │ │         │
│  │  │ "Il locatore deve...       │ │         │
│  │  └────────────────────────────┘ │         │
│  │                                 │         │
│  │  [📖 Mostra fonte]              │         │
│  └─────────────────────────────────┘         │
│                                              │
│         ┌──────────────────┐                 │
│         │  Grazie! Quindi   │  ▶ UTENTE      │
│         │  posso...?        │                 │
│         └──────────────────┘                 │
│                                              │
│  ┌─────────────────────────────────┐         │
│  │  ⏳ Giusta sta scrivendo...   │  ◀ AI     │
│  └─────────────────────────────────┘         │
│                                              │
└──────────────────────────────────────────────┘
```

**Specifiche**:

| Proprietà | Utente | AI |
|---|---|---|
| Allineamento | Destra | Sinistra |
| Bg colore | `--color-primary-500` | `--color-bg-secondary` |
| Testo colore | `#ffffff` | `--color-text-primary` |
| Border radius | 16px top-left, 4px top-right, 16px bottom-left, 16px bottom-right | 4px top-left, 16px top-right, 16px bottom-left, 16px bottom-right |
| Padding | 12px 16px | 12px 16px |
| Max width | 85% del container | 85% del container |
| Font | `text-base`, Body, Regular | `text-base`, Body, Regular |
| Margine tra bubble | 8px | 8px |
| Avatar | — | Icona Giusta (fulmine in cerchio) 24×24pt |

**Varianti AI bubble**:

1. **Testo semplice**: Solo messaggio testuale.
2. **Con citazione**: Citazione legale in JetBrains Mono, sfondo `--color-bg-tertiary`, bordo sinistro 3px `--color-primary-500`. Expandibile con "Mostra fonte".
3. **Con documento generato**: Anteprima documento (PDF icon + nome) + [Scarica] [Invia].
4. **Con azioni**: Button sotto il testo ("Genera diffida", "Invia raccomandata", "Aggiungi al caso").
5. **Con lista**: Punti elenco (es. "Ecco i passi da seguire:").
6. **Errore / limite**: "Non posso fornire consulenza legale personalizzata. Ti consiglio di [azione]."

**AI typing indicator**:
```
┌──────────────────────────────┐
│  ⚡ Giusta sta scrivendo    │
│  ● ● ● (dots animati)       │
└──────────────────────────────┘
```
- Sfondo: `--color-bg-secondary`
- Fulmine + nome + dots con pulse animation
- Tempo massimo visibile: 15 secondi (se oltre, mostra "Scusa, ci sto mettendo più del previsto. Riformula la domanda?")

### 5.5 Progress Tracker (Case Tracker)

```
Orizzontale (mobile, scroll):
┌───────────────────────────────────────────┐
│                                           │
│  ● Aperto ──→ ● Istruttoria ──→ ○ Udienza│
│  (completato)   (current)       (upcoming)│
│                                           │
│  ○ Sentenza    ● Chiuso                  │
│  (upcoming)    (failed — rosso)          │
│                                           │
└───────────────────────────────────────────┘

Verticale (desktop, sidebar):
┌───────────────────────┐
│  ✅ Aperto             │
│  12/03/2024           │
│  ─────────────         │
│  🔄 Istruttoria        │ ← current
│  15/03/2024            │
│  ─────────────         │
│  ○ Udienza             │
│  (prevista: 20/04)     │
│  ─────────────         │
│  ○ Sentenza            │
│  ─────────────         │
│  ❌ Chiuso (respinto)  │
│  — non raggiunto —     │
└───────────────────────┘
```

**Specifiche**:

| Proprietà | Valore |
|---|---|
| Connector line | 2px solid `--color-border` (upcoming), primary (completed), danger (failed) |
| Dot diameter | 12px (completed/current), 8px (upcoming) |
| Dot completed | `--color-primary-500` fill + icon checkmark |
| Dot current | `--color-primary-500` fill + pulse animation |
| Dot upcoming | `--color-border` outline |
| Dot failed | `--color-danger` fill + icon X |
| Label | `text-sm`, Body, Medium |
| Date | `text-xs`, Body, Regular, `--color-text-tertiary` |
| Padding tra step | 24px (vertical), 32px (horizontal) |

**Stati**:

| Stato | Icona | Colore | Descrizione |
|---|---|---|---|
| Completed | ✅ | Primary 500 | Step completato con successo |
| Current | 🔄 (pulse) | Primary 500 | Step in corso, attivo |
| Upcoming | ○ | Border grigio | Step futuro non ancora raggiunto |
| Skipped | — | Text-tertiary | Step saltato (non applicabile) |
| Failed | ❌ | Danger | Step fallito / esito negativo |

### 5.6 Button

```
┌──────────────────────────────────────────────┐
│                                              │
│  [Primary]  [Secondary]  [Danger]  [Ghost]  │
│                                              │
│  ┌────────────┐  ┌────────────┐             │
│  │  Carica    │  │  Annulla   │  ← md (40px)│
│  │  prova     │  │            │             │
│  └────────────┘  └────────────┘             │
│                                              │
│  ┌────────────────────┐                      │
│  │  ⚡ Genera diffida │  ← lg con icon      │
│  └────────────────────┘                      │
│                                              │
│  ┌──────────┐  ┌──────────────┐             │
│  │  Salva   │  │  Caricamento │  ← loading  │
│  │          │  │  ○ ○ ○       │  state       │
│  └──────────┘  └──────────────┘             │
│                                              │
└──────────────────────────────────────────────┘
```

**Specifiche per variante**:

| Variante | Bg | Bordo | Testo | Hover | Active | Disabled |
|---|---|---|---|---|---|---|
| **Primary** | Primary 500 | None | White | Primary 600 | Primary 700 | Primary 300 + opacità 50% |
| **Secondary** | Trasparente | 1.5px Primary 500 | Primary 500 | Bg Primary 50 | Bg Primary 100 | Bg trasparente + opacità 40% |
| **Danger** | Danger | None | White | Danger dark 10% | Danger dark 20% | Danger + opacità 50% |
| **Ghost** | Trasparente | None | Text-secondary | Bg secondary | Bg tertiary | Opacità 40% |
| **Accent** | Accent 500 | None | White | Accent 600 | Accent 700 | Accent + opacità 50% |

**Size**:

| Size | Altezza | Padding orizzontale | Font | Icon size |
|---|---|---|---|---|
| **sm** | 32px | 12px | `text-sm` | 16×16 |
| **md** | 40px | 16px | `text-base` | 20×20 |
| **lg** | 48px | 20px (24 con icon) | `text-base` | 20×20 |
| **xl** | 56px | 28px (32 con icon) | `text-lg` | 24×24 |

**Button con icona**:
- Icona sempre a **sinistra** del testo per azioni importanti
- Gap icona-testo: `space-2` (8px)
- Icona a destra solo per "avanti" / "apri" / "external link"
- Icona da sola (senza testo) solo per FAB e icon button, con tooltip obbligatorio

**Loading state**:
- Icona sostituita da spinner animato (stessa dimensione dell'icona)
- Testo opzionalmente sostituito da "Caricamento..."
- Button disabilitato (pointer-events: none)
- Durata massima loading: 30 secondi prima di mostrare errore

**Emergency Button**:
- Sempre visibile, rosso, con conferma
- Posizionato al centro della bottom nav
- Dimensione: 48×48pt (cerchio), più grande degli altri tab
- Icona: scudo con punto esclamativo
- Al tap: Alert dialog "Stai per avviare la procedura di emergenza. Cosa è successo?" + opzioni rapide
- Non è un pulsante di chiamata, ma di avvio procedura guidata

### 5.7 Form Elements

#### Input di Testo

```
┌──────────────────────────────────────┐
│  Nome completo                        │ → Label (stacked, sopra)
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ Mario Rossi                     │  │ → Input field
│  └─────────────────────────────────┘  │
│                                       │
│  Inserisci il nome come sul docum.   │ → Helper text
│                                       │
└──────────────────────────────────────┘

  Stato errore:
┌──────────────────────────────────────┐
│  Indirizzo email                     │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ mariorossi@                     │  │ → Bordo rosso
│  └─────────────────────────────────┘  │
│  ⚠️ Inserisci un indirizzo valid.   │ → Errore (rosso)
│                                       │
└──────────────────────────────────────┘
```

**Specifiche**:

| Proprietà | Valore |
|---|---|
| Label | `text-sm`, Body, Medium, `--color-text-secondary` |
| Gap label-input | `space-2` (8px) |
| Input padding | 12px 14px (orizzontale), 10px 14px (vertical) |
| Input border | 1.5px `--color-border`, border-radius 8px |
| Input font | `text-base`, Body, Regular, `--color-text-primary` |
| Input focus | Border 1.5px `--color-primary-500`, box-shadow ring primary 100 (0 0 0 3px) |
| Input error | Border 1.5px `--color-danger`, box-shadow ring danger 100 (0 0 0 3px) |
| Helper text | `text-sm`, Body, Regular, `--color-text-tertiary` |
| Error text | `text-sm`, Body, Regular, `--color-danger` |
| Gap input-helper | `space-1` (4px) |
| Disabled | Bg `--color-bg-tertiary`, opacità 60%, pointer-events none |
| Placeholder | `--color-text-tertiary`, opacità 70% |

#### Altri Form Elements

**Textarea**:
- Stessa specificity dell'input
- Altezza minima: 100px (3 righe)
- Resize: verticale solo
- Usato per: note personali, descrizione problema, testo libero

**Select / Picker**:
- Native su mobile (iOS picker / Android spinner)
- Custom su desktop con dropdown
- Icona chevron a destra
- Opzioni con label + valore, raggruppabili per categoria

**Date Picker**:
- Nativi iOS/Android (input type="date" su web)
- Su desktop: calendario popover minimal
- Formato data: "12 marzo 2024" (italiano, leggibile)
- Min/max date se applicabile (es. data contratto non futura)
- Icona calendario a sinistra

**Document / File Picker**:
- Drag & drop zone (dashed border, bg terziario, icona upload)
- Preview: icona tipo file (PDF, JPG, PNG) + nome file + dimensione
- Rimozione: X button
- Upload progressivo: barra di progresso sotto il file
- Multi-file support: gallery per foto, lista per documenti
- Formati supportati: PDF, JPG, PNG, HEIC, MP4 (per video prove)
- Max size: 20MB per file (con indicazione chiara)
- Drag zone active: border primary, bg primary 50

**Checkbox e Radio**:
- Custom style (non nativo)
- Checkbox: 20×20pt, border-radius 4px
- Radio: 20×20pt, cerchio
- Checked: bg primary 500, icon checkmark white
- Label a destra, gap 8px
- Touch target minimo 44px (label espansa)

**Toggle / Switch**:
- 44×28pt
- Off: bg `--color-border`
- On: bg `--color-primary-500`
- Thumb: 24×24pt, cerchio bianco, ombra leggera
- Animazione toggle: 200ms ease

### 5.8 Empty States (EMPATICI — critico)

```
┌──────────────────────────────────────────────┐
│                                              │
│              ╔══════════╗                    │
│              ║  🛡️     ║                    │
│              ╚══════════╝                    │
│                                              │
│  Niente prove, ancora.                       │ → Headline empatico
│                                              │
│  Non preoccuparti. Inizia a proteggerti      │ → Descrizione
│  caricando la prima prova. Bastano anche     │   (sempre incoraggiante,
│  una foto del contratto o un messaggio       │   mai colpevolizzante)
│  del proprietario.                           │
│                                              │
│  📷 [Carica la prima prova]                  │ → CTA chiara
│                                              │
└──────────────────────────────────────────────┘
```

**Regole d'oro per empty states**:

1. **Mai** "Nessun risultato", "Nessun elemento", "Vuoto". **Sempre** messaggio empatico.
2. **Mai** colpevolizzare: no "Non hai ancora caricato...", no "Ricorda di..."
3. **Sempre** dire cosa fare DOPO, non cosa non è stato fatto.
4. **CTA sempre presente** e chiara.
5. **Illustrazione** (scudo, nido, casa stilizzata) sempre presente.

**Template per ogni empty state**:

| Schermata | Headline | Descrizione | CTA | Illustrazione |
|---|---|---|---|---|
| **Vault (prove)** | "Niente prove, ancora." | "Non preoccuparti. Inizia a proteggerti caricando la prima prova. Bastano anche una foto del contratto o un messaggio del proprietario." | "Carica la prima prova" | Scudo vuoto con alone luminoso |
| **Casi** | "Tutto tranquillo qui." | "O forse hai un problema che non sai come affrontare? Non serve essere soli. Parlane con Giusta, ti aiuta a capire se hai un caso." | "Parla con Giusta" | Nido vuoto |
| **Contratti** | "Ancora nessun contratto." | "Carica il tuo contratto di affitto: lo leggiamo insieme e ti diciamo se tutto è a posto." | "Carica contratto" | Documento stilizzato |
| **Notifiche** | "Niente di nuovo." | "Bene. Ti avvertiamo noi se succede qualcosa di importante." | — | Campanella silenziosa |
| **Chat AI (primo accesso)** | "Benvenuto. Sono Giusta." | "Sono qui per aiutarti con tutto: controllare un contratto, generare una diffida, o solo per parlare di una situazione. Da cosa iniziamo?" | Quick actions sotto | Fulmine sorridente |
| **Ricerca** | "Nessun risultato per..." | "Prova con parole diverse. O magari non è ancora il momento giusto: possiamo aiutarti a capire cosa cercare." | "Parla con Giusta" | Lente con ? |
| **Timeline** | "Ancora nessun evento." | "Quando succederà qualcosa di importante (una scadenza, una notifica), lo troverai qui." | — | Timeline vuota |

### 5.9 Modals e Bottom Sheet

```
Bottom Sheet (mobile):
┌──────────────────────────────────────────────┐
│                                              │
│              ── drag indicator ──            │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │  Titolo                               │  │
│  │  Sottotitolo / descrizione            │  │
│  │                                        │  │
│  │  Contenuto...                         │  │
│  │                                        │  │
│  │  [Azione 1]       [Azione 2]          │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ← safe area bottom →                        │
└──────────────────────────────────────────────┘
```

**Specifiche bottom sheet**:

| Proprietà | Valore |
|---|---|
| Drag indicator | Rectangle 36×4pt, bg border, border-radius 2px, centrato in alto, margin-top 8px |
| Corner radius top | 16px |
| Sfondo | `--color-bg-primary` |
| Ombra | `box-shadow: 0 -4px 24px rgba(15, 23, 42, 0.1)` |
| Padding | 24px (top, laterali), 24px + `safe-area-bottom` (bottom) |
| Backdrop | `rgba(15, 23, 42, 0.4)` con fade-in 200ms |
| Altezza massima | 90% dello schermo (scroll se supera) |
| Animazione apertura | slide-up 300ms ease-out |
| Animazione chiusura | slide-down 200ms ease-in |

**Tipi di modali**:

| Tipo | Trigger | Contenuto | Azioni |
|---|---|---|---|
| **Alert dialog** | Elimina account, invia azione legale irreversibile | Icona warning + titolo + spiegazione + opzioni | [Annulla] [Conferma] (danger) |
| **Bottom sheet azioni** | Condividi, esporta, azioni su documento | Lista azioni verticali con icona + label | Tap per azione, swipe down per chiudere |
| **Bottom sheet filtro** | Tap filtro in header | Checkbox/radio per filtri + [Applica] [Reset] | Applica / Reset |
| **Full-screen AI** | Tap "Focus" in chat | Chat a schermo intero, input in basso, nessun altro elemento UI | X per chiudere |
| **Carica documento** | Tap "Carica" | Drag zone + camera button + galleria recenti | [Conferma] [Annulla] |
| **Conferma emergenza** | Tap Emergency FAB | "Cosa è successo?" + opzioni rapide (sfratto, aumento, morosità, altro) + [Procedi] [Annulla] | Avvia procedura guidata |

**Alert dialog specifiche**:

```
┌──────────────────────────────────┐
│             ⚠️                   │
│                                  │
│  Eliminare l'account?            │
│                                  │
│  Tutti i tuoi dati (contratti,   │
│  prove, casi) verranno cancellati│
│  definitivamente. Questa azione  │
│  è irreversibile.                │
│                                  │
│  ┌────────────┐ ┌──────────────┐│
│  │  Annulla   │ │  Elimina     ││
│  └────────────┘ └──────────────┘│
│                  (danger button) │
└──────────────────────────────────┘
```

- Backdrop sempre presente
- Non chiudibile con tap outside per azioni distruttive
- Bottone distruttivo sempre a destra (o sotto)
- Mai più di 2 azioni

---

## 6. Screen Layout

### 6.1 Schermata Home (Dashboard)

```
┌─────────────────────────────────────────────┐
│  ← Ciao, Mario               🔔  👤         │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  IL TUO CONTRATTO                   │    │
│  │                                     │    │
│  │  Via Roma 12, Milano                │    │
│  │  Canone: €800/mese                  │    │
│  │  Scade tra 4 mesi  [⚠️]             │    │
│  │                                     │    │
│  │  [Verifica]  [Rinnova]             │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌──── CASI ATTIVI ─── [Vedi tutti]        │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ │ Caso     │ │ Aumento  │ │ Richiesta│ │
│  │ │ Cauzione │ │ canone   │ │ Riparaz. │ │
│  │ │ 🔄 In    │ │ ⏳ In    │ │ ✅ Vinto │ │
│  │ │ corso    │ │ attesa   │ │          │ │
│  │ └──────────┘ └──────────┘ └──────────┘ │
│  │                                         │
│  └─────────────────────────────────────────┘
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ⚡ Giusta — Come posso aiutarti?  │    │
│  │                                     │    │
│  │  [Controlla contratto] [Genera...] │    │
│  │  [Cosa fare se...]                 │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ℹ️  Hai 3 prove da organizzare    │    │
│  ├─────────────────────────────────────┤    │
│  │  📊  Calcolatore aumento ISTAT     │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────────────────────────────────────────  │
│  🏠     📁     ⚡     📋     👤             │
│                   🆘                        │
└─────────────────────────────────────────────┘
```

**Bento grid layout**:

| Posizione | Widget | Dimensione | Priorità |
|---|---|---|---|
| Top | Stato contratto + CTA | 2×1 (full width mobile) | Critico — sempre visibile |
| Centro | Casi attivi (carousel orizzontale) | 2×1 | Alto |
| Sotto | AI quick action bar | 1×1 | Alto |
| Bottom widgets | Info, calcolatori, reminder | 1×1 ciascuno | Medio |

**Regole**:
- **Above the fold**: Stato contratto + almeno un caso attivo sono visibili senza scroll
- **CTA primaria** sempre visibile (carica documento, parla con Giusta)
- **Emergency FAB** sempre presente nella bottom nav
- **Notifiche** badge sul header (icona campanella con contatore)
- **Widget "Inizia"** per nuovi utenti (primi 7 giorni): onboarding persistente

### 6.2 Schermata Vault (Prove)

```
┌─────────────────────────────────────────────┐
│  ← Vault                        🔍  +      │
│                                             │
│  [Tutte] [Contratti] [Messaggi] [Foto]     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  OGGI                               │    │
│  ├─────────────────────────────────────┤    │
│  │  📄 Contratto affitto .pdf          │    │
│  │  Via Roma 12 · 2.3 MB              │    │
│  │  15 min fa                          │    │
│  ├─────────────────────────────────────┤    │
│  │  📷 Messaggio WhatsApp .jpg         │    │
│  │  "Caro inquilino..."                │    │
│  │  2 ore fa                           │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  IERI                               │    │
│  ├─────────────────────────────────────┤    │
│  │  📄 Raccomandata .pdf               │    │
│  │  Mittente: Proprietario             │    │
│  │  Ieri                                │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  QUESTA SETTIMANA                   │    │
│  ├─────────────────────────────────────┤    │
│  │  📷 Video sopralluogo .mp4          │    │
│  │  45 sec · 12 MB                    │    │
│  │  3 giorni fa                        │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────────────────────────────────────────  │
│  🏠     📁     ⚡     📋     👤             │
│                   🆘                        │
└─────────────────────────────────────────────┘
```

**Specifiche Vault**:

- **Timeline verticale cronologica** (dal più recente in giù)
- **Raggruppamento per data**: Oggi, Ieri, Questa settimana, Questo mese, Più vecchi
- **Filtri in alto**: pillole orizzontali scrollabili (Tutte, Contratti, Messaggi, Documenti, Foto, Video, Audio)
- **Search**: tap sull'icona 🔍 apre search bar inline
- **Vista multipla**: toggle lista (default) / griglia (per foto/video) / timeline
- **FAB** in basso a destra: "+ Carica nuova prova"
- **Swipe su elemento**: swipe left per azioni rapide (Archivia, Aggiungi a caso, Elimina)
- **Long press**: seleziona multipli per azione batch (scarica tutto, elimina, aggiungi a caso)
- **Categorie automatiche**: AI categorizza il tipo di prova (contratto, raccomandata, messaggio, foto, video, audio, altro)
- **Tag** per associare prove a casi
- **Ricerca full-text** sui nomi file e note associate

### 6.3 Schermata AI Giusta

```
┌─────────────────────────────────────────────┐
│  ← Giusta                        ⋮          │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  ⚡ Ciao! Sono Giusta.                  ││
│  │  Sono qui per aiutarti con le tue       ││
│  │  questioni di casa. Come posso          ││
│  │  esserti utile oggi?                    ││
│  └─────────────────────────────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  Ciao Giusta, ho ricevuto una           ││
│  │  lettera di sfratto...                  ││
│  └─────────────────────────────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  Mi dispiace. Non preoccuparti.        ││
│  │  Vediamo insieme cosa fare.             ││
│  │                                         ││
│  │  L'art. 657 c.p.c. dice che...          ││
│  │                                         ││
│  │  ┌─── citazione ───┐                   ││
│  │  │ Art. 657 c.p.c. │                   ││
│  │  │ "L'intimazione.."│                   ││
│  │  └─────────────────┘                   ││
│  │                                         ││
│  │  [📄 Genera diffida] [📖 Guida completa]││
│  └─────────────────────────────────────────┘│
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │  ⏳ Giusta sta scrivendo... ● ● ●      ││
│  └─────────────────────────────────────────┘│
│                                             │
│  ─────────────────────────────────────────  │
│  ⚠️ Ricorda: Giusta fornisce informazioni  │
│  generali, non consulenza legale.          │
│                                             │
│  ✏️ [Scrivi a Giusta...     ] ➤            │
│                                             │
│  [📋 Controlla contratto] [⚡ Genera]      │
│  [❓ Cosa fare se...]                      │
│                                             │
└─────────────────────────────────────────────┘
```

**Specifiche AI Giusta**:

- **Chat full-height** con input fisso in basso
- **Messaggi** organizzati in bubble (sezione 5.4)
- **Quick actions** sopra la tastiera: 3–4 pillole azione rapida (scrollabili orizzontalmente)
- **Disclaimer persistente** tra le quick actions e l'input: testo piccolo, grigio, non rimovibile
- **Citations expandibili**: tap su citazione apre il testo completo dell'articolo di legge
- **Documenti generati**: preview inline con download
- **Storico chat**: salvato e accessibile, raggruppato per sessione
- **"Focus mode"**: tap ⋮ → "Modalità focus" apre chat full-screen senza header/bottom nav
- **Limitazioni**: dopo 20 messaggi in una sessione, mostra "Stai approfondendo molto. Vuoi salvare questa conversazione e continuare dopo?"
- **Sessione esportabile**: esporta chat in PDF per condividerla con avvocato
- **Link a risorse umane**: quando appropriato, link a sportello di tutela inquilini locale

### 6.4 Schermata Casi

```
┌─────────────────────────────────────────────┐
│  ← I tuoi casi               🔍  +         │
│                                             │
│  [Tutti] [In corso] [In attesa] [Chiusi]   │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  🔄 Trattenuta cauzione            │    │
│  │  Stato: Istruttoria                │    │
│  │  Aperto: 12/03/2024                │    │
│  │  Prossima scadenza: 20/04/2024     │    │
│  │  Prove collegate: 4                │    │
│  │  [Dettaglio]                       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ⏳ Aumento canone non comunicato  │    │
│  │  Stato: In attesa risposta          │    │
│  │  Aperto: 01/02/2024               │    │
│  │  Ultima azione: Inviata diffida    │    │
│  │  Prove collegate: 2                │    │
│  │  [Dettaglio]                       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  ✅ Richiesta riparazioni           │    │
│  │  Stato: Chiuso (risolto)            │    │
│  │  Aperto: 10/01/2024                │    │
│  │  Chiuso: 15/02/2024                │    │
│  │  [Dettaglio]  [Riapri]             │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ─────────────────────────────────────────  │
│  🏠     📁     ⚡     📋     👤             │
│                   🆘                        │
└─────────────────────────────────────────────┘
```

**Case Detail (tap su caso)**:

```
┌─────────────────────────────────────────────┐
│  ← Trattenuta cauzione         ⋮  🗑️      │
│                                             │
│  Stato: Istruttoria           🔄            │
│                                             │
│  ┌─── TIMELINE ─────────────────────────┐   │
│  │  ✅ Aperto                           │   │
│  │  12/03/2024                          │   │
│  │  ─────────────────                   │   │
│  │  🔄 Istruttoria (currento)           │   │
│  │  15/03/2024                          │   │
│  │  ─────────────────                   │   │
│  │  ○ Mediazione                        │   │
│  │  (prevista: 20/05)                   │   │
│  │  ─────────────────                   │   │
│  │  ○ Risoluzione                       │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌─── AZIONI ──────────────────────────┐   │
│  │  [📄 Genera sollecito]              │   │
│  │  [📎 Aggiungi prova]                │   │
│  │  [👨‍⚖️ Trova sportello]              │   │
│  │  [📤 Invia raccomandata]            │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌─── PROVE COLLEGATE ────────────────┐   │
│  │  📄 Contratto affitto.pdf          │   │
│  │  📷 Messaggio WhatsApp.jpg         │   │
│  │  📷 Foto infiltrazione.jpg         │   │
│  │  📄 Raccomandata.pdf               │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ─────────────────────────────────────────  │
└─────────────────────────────────────────────┘
```

**Specifiche Casi**:

- **Lista card** dei casi con filtri a pillola
- **Stati**: In corso (🔄) / In attesa (⏳) / Risolto (✅) / Respinto (❌)
- **Badge urgenza** su card: 🔴 Urgente (scadenza < 7 giorni) / 🟡 Attenzione (< 30 giorni) / 🔵 Normale
- **Timeline** verticale nel detail (sezione 5.5)
- **Azioni contestuali**: ogni stato ha azioni diverse
- **Prove collegate**: lista con preview, tap per aprire in vault
- **Elimina caso**: conferma obbligatoria ("Sei sicuro? I dati rimarranno nel vault.")
- **Caso automatico**: se AI rileva problema, chiede "Vuoi che apra un caso per questo?"
- **Notifiche** di scadenza e aggiornamenti su ogni caso

### 6.5 Schermata Profilo

```
┌─────────────────────────────────────────────┐
│  ← Profilo                                  │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │  🧑            Mario Rossi          │    │
│  │  👤 Utente Premium dal 03/2024     │    │
│  │                                     │    │
│  │  [Modifica profilo]                │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─── ABBONAMENTO ──────────────────────┐   │
│  │  📊 Piano: Premium                  │   │
│  │  Rinnovo: 03/03/2025               │   │
│  │  Documenti: 12/100 usati            │   │
│  │  Casi: 3/5 attivi                   │   │
│  │                                     │   │
│  │  [Gestisci]                         │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─── PRIVACY ──────────────────────────┐   │
│  │  🔒 Dati biometrici: ✅ attivo       │   │
│  │  🔑 Password: modifica               │   │
│  │  📱 2FA: attivo                       │   │
│  │  🗑️ Richiedi eliminazione dati      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─── PREFERENZE ───────────────────────┐   │
│  │  🌙 Modalità scura: attiva           │   │
│  │  🔇 Low-stimulus: disattiva          │   │
│  │  📢 Notifiche: [Push] [Email] [SMS]  │   │
│  │  🔤 Dimensione testo: [A] [A] [A]   │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─── DATI ─────────────────────────────┐   │
│  │  [📥 Esporta tutti i dati]           │   │
│  │  [📤 Esporta casi in PDF]            │   │
│  │  [🔄 Sincronizza ora]                │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─── SUPPORTO ─────────────────────────┐   │
│  │  [❓ FAQ e guide]                    │   │
│  │  [💬 Supporto in app]               │   │
│  │  [📧 info@casagiusta.it]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ═══════════════════════════════════════    │
│  [Esci]                     [Elimina] ❌   │
│                                             │
└─────────────────────────────────────────────┘
```

**Specifiche Profilo**:

- **Info utente**: Nome, avatar editabile, tipo account, data iscrizione
- **Stato abbonamento**: piano corrente, scadenza, utilizzo risorse
- **Privacy**: biometrico, password, 2FA, eliminazione dati con conferma
- **Preferenze**: dark mode, low-stimulus mode, notifiche, dimensione font
- **Esportazione dati**: GDPR compliant, ZIP con tutti i documenti in formato aperto
- **Elimina account**: processo in 3 step (conferma → inserisci password → OK irreversibile), invia email di conferma
- **Logout**: immediato, senza conferma (ma se ci sono dati non salvati, avvisa)
- **Supporto**: FAQ, chat supporto, email
- **Versione app**: in fondo con build number

---

## 7. Animazioni e Motion

### Filosofia

Ogni animazione in CasaGiusta ha un **significato funzionale**, non è decorativa. Le animazioni:

1. **Guidano l'attenzione** verso ciò che è cambiato
2. **Riducono l'ansia** mostrando progresso e prevedibilità
3. **Comunicano stato** senza parole (caricamento, successo, errore)
4. **Rispettano** `prefers-reduced-motion`

### Transizioni di pagina

| Navigazione | Animazione | Durata | Easing |
|---|---|---|---|
| Push (avanti) | Slide left → Nuova pagina entra da destra | 300ms | ease-out |
| Pop (indietro) | Slide right → Pagina corrente esce a destra | 300ms | ease-out |
| Tab switch (bottom nav) | Fade + scale 0.98→1 | 200ms | ease-out |
| Modale / bottom sheet | Slide up dal basso | 300ms | ease-out |
| Full-screen AI | Scale up + fade (da bottom nav tab) | 350ms | ease-out |
| Deep link (notifica → schermata) | Zoom from tap point | 400ms | ease-out |

### Micro-interazioni

| Elemento | Trigger | Animazione | Durata | Significato |
|---|---|---|---|---|
| **Button** | Tap | Scale 0.97, poi 1.0 + feedback tattile | 100ms | "Hai premuto" |
| **Card** | Tap | Scale 0.98, ombra aumenta | 150ms | "Stai selezionando" |
| **Like / bookmark** | Tap | Icona scale 1→1.3→1 + cambio colore | 300ms | "Salvato" |
| **Upload file** | Completato | Checkmark verde con scale-in | 300ms | "Fatto" |
| **Step completato** | Transizione stato | Dot si riempie + checkmark + linea connettore si colora | 400ms | "Sei più avanti" |
| **Toggle switch** | Tap | Thumb slide 20px + bg color change | 200ms | "Attivato/disattivato" |
| **Badge notifica** | Nuova notifica | Scale 0→1 dall'alto | 250ms | "Novità" |
| **Delete item** | Conferma | Item si comprime (scale verticale 1→0) + fade out | 300ms | "Rimosso" |
| **Lista reorder** | Drag | Item scale 1.05, ombra aumenta, gap si apre | 200ms | "Lo stai spostando" |
| **Error shake** | Validazione fallita | Input shake orizzontale 3px × 3 oscillazioni | 400ms | "Qualcosa non va" |
| **Success pulse** | Operazione riuscita | Bottone/icona pulse verde + glow | 600ms | "Tutto ok" |

### Loading & Skeleton

**Regola**: **Skeleton screens sempre**, mai spinner (tranne per operazioni puntuali < 2 secondi).

```
┌─────────────────────────────────────┐
│  ┌─────────────────────────────────┐│
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░  ││  → Skeleton bar (animata shimmer)
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  ▓▓▓▓▓▓▓▓░░░░░░░░              ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░  ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

- **Shimmer animation**: gradient da bg-tertiary a bg-secondary a bg-tertiary, animato da sinistra a destra (1.5 secondi, loop)
- **Skeleton card**: stesse dimensioni della card finale, border-radius identico
- **Skeleton text**: blocks proporzionali alla lunghezza del testo (più corto per seconda riga)
- **Skeleton avatar**: cerchio 40×40pt
- **Tempo massimo skeleton**: 10 secondi (poi mostra errore con retry)
- **No skeleton per schermate già in cache**: passaggio immediato

### AI Typing Indicator

```
┌─────────────────────────────────┐
│  ⚡ Giusta sta scrivendo       │
│  ● ● ● (dots con pulse)       │
└─────────────────────────────────┘
```

- Dots animati con staggered delay (0ms, 200ms, 400ms)
- Ogni dot: scale 1→1.3→1 con opacity 0.5→1→0.5
- Ciclo: 1.4 secondi
- Accompagnato da leggero pulse del fulmine (opacity 0.8→1)
- Massimo 15 secondi visibile

### Push Notification Arrival

```
┌── Notifica ──────────────────────────────┐
│  🛡️ Nuova scadenza sul caso             │
│  "Trattenuta cauzione"                   │
│                                          │
│  ───────────────────────────────────     │
│  >>> Slide down from top, stays 5s     │
└──────────────────────────────────────────┘
```

- Slide down da sopra l'header (top: -100px → top: safe-area-top + 8px)
- Durata: 400ms ease-out
- Rimane visibile 5 secondi, poi slide up
- Swipe up per chiudere manualmente
- Tap per navigare alla schermata relativa
- Massimo 3 notifiche impilabili (stack con offset)

### Motion e significato

| Movimento | Significato psicologico | Applicazione |
|---|---|---|
| Slide da destra | "Prosegui, avanza" | Navigazione push |
| Slide da sinistra | "Torna indietro" | Navigazione pop |
| Slide da basso | "Nuova informazione contestuale" | Bottom sheet, modali |
| Fade in | "Apparizione morbida" | Nuovi elementi, notifiche |
| Scale up | "Diventa importante" | Focus mode, alert dialog |
| Pulse | "Vivo, in attesa" | AI typing, stato in corso |
| Shimmer | "In caricamento, ma tra poco" | Skeleton loading |
| Shake | "Attenzione, errore" | Validazione fallita |
| Checkmark path | "Completato, successo" | Step completato, upload ok |

### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Mantieni solo transizioni funzionali essenziali */
  .skeleton {
    background: var(--color-bg-tertiary) !important;
    animation: none !important;
  }

  .typing-indicator .dot {
    animation: none !important;
    opacity: 1 !important;
  }
}
```

---

## 8. Tailwind Config

```js
// tailwind.config.js — CasaGiusta Design System v1.0

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{tsx,ts}',
    './components/**/*.{tsx,ts}',
    './features/**/*.{tsx,ts}',
    './screens/**/*.{tsx,ts}',
    './shared/**/*.{tsx,ts}',
  ],

  // Usa 'class' per controllo esplicito (toggle utente)
  // 'media' per auto seguendo sistema operativo
  darkMode: 'class',

  theme: {
    extend: {
      // ── Colori ──
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        surface: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          'dark-primary': 'var(--color-dark-bg-primary)',
          'dark-secondary': 'var(--color-dark-bg-secondary)',
          'dark-tertiary': 'var(--color-dark-bg-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          'dark-primary': 'var(--color-dark-text-primary)',
          'dark-secondary': 'var(--color-dark-text-secondary)',
          'dark-tertiary': 'var(--color-dark-text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          'dark': 'var(--color-dark-border)',
        },
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
        },
      },

      // ── Tipografia ──
      fontFamily: {
        display: ['Satoshi', 'Geist Sans', ...defaultTheme.fontFamily.sans],
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],   // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.8rem' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.1rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],       // 60px
        '7xl': ['4.5rem', { lineHeight: '1.1' }],        // 72px
      },
      fontWeight: {
        book: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
      },
      letterSpacing: {
        tight: '-0.02em',
        normal: '0em',
        wide: '0.02em',
      },

      // ── Spacing (4px base) ──
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '64': '256px',
      },

      // ── Layout ──
      maxWidth: {
        'mobile': '480px',
        'tablet': '768px',
        'desktop': '1200px',
        'content': '1200px',
      },
      minHeight: {
        'touch': '44px',
        'screen-safe': '100dvh',
      },
      minWidth: {
        'touch': '44px',
      },

      // ── Border Radius ──
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },

      // ── Border Width ──
      borderWidth: {
        'DEFAULT': '1px',
        '0': '0px',
        '1.5': '1.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },

      // ── Box Shadow ──
      boxShadow: {
        'soft': '0 1px 3px rgba(15, 23, 42, 0.05)',
        'card': '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.1)',
        'card-hover': '0 4px 12px rgba(15, 23, 42, 0.08)',
        'card-danger': '0 2px 8px rgba(239, 68, 68, 0.15)',
        'elevated': '0 4px 16px rgba(15, 23, 42, 0.1)',
        'bottom-sheet': '0 -4px 24px rgba(15, 23, 42, 0.1)',
        'fab': '0 4px 12px rgba(239, 68, 68, 0.3)',
        'focus-ring': '0 0 0 3px rgba(20, 184, 166, 0.15)',
        'focus-ring-danger': '0 0 0 3px rgba(239, 68, 68, 0.15)',
        'inner-soft': 'inset 0 1px 2px rgba(15, 23, 42, 0.05)',
      },

      // ── Safe Area ──
      // Usare variabili CSS per safe area (env(safe-area-inset-*))

      // ── Animazioni ──
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'typing-dot-1': 'typingDot 1.4s ease-in-out infinite',
        'typing-dot-2': 'typingDot 1.4s ease-in-out 0.2s infinite',
        'typing-dot-3': 'typingDot 1.4s ease-in-out 0.4s infinite',
        'shake': 'shake 0.4s ease-in-out',
        'check-path': 'checkPath 0.3s ease-out forwards',
        'notification-in': 'notificationIn 0.4s ease-out forwards',
        'notification-out': 'notificationOut 0.4s ease-in forwards',
        'skeleton-pulse': 'skeletonPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        typingDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        checkPath: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        notificationIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        notificationOut: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        skeletonPulse: {
          '0%': { backgroundColor: 'var(--color-bg-tertiary)' },
          '50%': { backgroundColor: 'var(--color-bg-secondary)' },
          '100%': { backgroundColor: 'var(--color-bg-tertiary)' },
        },
      },

      // ── Transition Timing ──
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
        'slower': '400ms',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### CSS Custom Properties (temi)

```css
/* styles/tokens.css — Design Tokens globali */

@layer base {
  :root {
    /* Primary */
    --color-primary-50: #f0fdfa;
    --color-primary-100: #ccfbf1;
    --color-primary-200: #99f6e4;
    --color-primary-300: #5eead4;
    --color-primary-400: #2dd4bf;
    --color-primary-500: #14b8a6;
    --color-primary-600: #0d9488;
    --color-primary-700: #0f766e;
    --color-primary-800: #115e59;
    --color-primary-900: #134e4a;

    /* Accent */
    --color-accent-50: #fff7ed;
    --color-accent-500: #f97316;
    --color-accent-600: #ea580c;
    --color-accent-700: #c2410c;

    /* Surface — Light */
    --color-surface-primary: #ffffff;
    --color-surface-secondary: #f8fafc;
    --color-surface-tertiary: #f1f5f9;

    /* Text — Light */
    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
    --color-text-tertiary: #94a3b8;

    /* Border */
    --color-border-light: #e2e8f0;
    --color-border-medium: #cbd5e1;
    --color-border-strong: #94a3b8;

    /* Semantic */
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-danger: #ef4444;
    --color-info: #3b82f6;

    /* Typography */
    --font-display: 'Satoshi', 'Geist Sans', system-ui, -apple-system, sans-serif;
    --font-body: 'Inter', system-ui, -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;

    /* Safe area */
    --safe-area-top: env(safe-area-inset-top, 0px);
    --safe-area-bottom: env(safe-area-inset-bottom, 0px);
    --safe-area-left: env(safe-area-inset-left, 0px);
    --safe-area-right: env(safe-area-inset-right, 0px);

    /* Spacing */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 20px;
    --space-6: 24px;
    --space-8: 32px;
    --space-10: 40px;
    --space-12: 48px;
    --space-16: 64px;

    /* Border radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
  }

  .dark {
    --color-surface-primary: #0f172a;
    --color-surface-secondary: #1e293b;
    --color-surface-tertiary: #334155;

    --color-text-primary: #f8fafc;
    --color-text-secondary: #cbd5e1;
    --color-text-tertiary: #64748b;

    --color-border-light: #334155;
    --color-border-medium: #475569;
    --color-border-strong: #64748b;
  }

  /* Low-stimulus mode — applicato a body quando attivo */
  .low-stimulus {
    --color-primary-500: #5a9e92;
    --color-accent-500: #b8865a;
    --color-danger: #c47a7a;
    --color-success: #7a9e7a;
    --color-warning: #b8a040;

    filter: saturate(0.7);
  }

  .low-stimulus * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Accessibilità

### Principi generali

CasaGiusta è progettata per essere accessibile a **tutti**, indipendentemente da abilità visive, motorie, uditive o cognitive. L'accessibilità non è un optional: è un requisito legale (Legge 4/2004, WCAG 2.2 AA minimo, target AAA dove possibile).

### WCAG Compliance Targets

| Criterio | Target | Note |
|---|---|---|
| Contrasto colore (testo normale) | **AAA** (≥ 7:1) | Testo body, label, button |
| Contrasto colore (testo grande) | **AAA** (≥ 4.5:1) | Headline ≥ 24px/19px bold |
| Contrasto colore (UI non testo) | **AA** (≥ 3:1) | Icone, bordi, stati |
| Touch target | **≥ 44×44pt** | Tutti gli elementi interattivi |
| Focus indicator | **≥ 2px outline + 3px gap** | Visibile in tutti i temi |
| Text resize | **Fino a 200%** senza perdita funzionalità |
| Riduzione animazioni | Supporto `prefers-reduced-motion` | |

### Dynamic Type / Font Scaling

```css
/* Supporto Dynamic Type (iOS) e Font Size (Android/web) */

/* Base: usa rem, non px per font-size */
html {
  font-size: 100%; /* 16px default */
}

/* Tutte le dimensioni in rem scalano con preferenze utente */
body {
  font-size: var(--text-base); /* 1rem = 16px */
}

/* Input e button rispettano font scaling */
input, button, select, textarea {
  font-size: inherit;
}

/* Layout fluido: breakpoint in rem, non px */
@media (min-width: 48rem) { /* 768px a 16px, ma scala */
  ...
}

/* Line-height proporzionale (unità senza unità) per scalare col font */
body {
  line-height: 1.5;
}
```

**Regole**:
- Tutte le font-size in `rem`, mai in `px`
- Tutti i padding/margin in `rem` per elementi che contengono testo
- `max-width` del contenuto in `rem` o `ch`
- Testare con Dynamic Type iOS a tutte le taglie (XS → XXXL)
- L'app non deve rompersi a nessuna scala

### VoiceOver / TalkBack Labels

```tsx
// Ogni elemento interattivo DEVE avere:
// - accessibilityLabel (obbligatorio)
// - accessibilityHint (opzionale, ma raccomandato per azioni complesse)
// - accessibilityRole (obbligatorio)
// - accessibilityState (se applicabile, es. disabled, checked)

// Esempi:

<button
  aria-label="Carica prova: carica un documento o una foto come prova"
  role="button"
>
  <Icon name="upload" />
  Carica prova
</button>

// Icona decorativa (deve essere nascosta agli screen reader)
<Icon name="arrow-right" aria-hidden="true" />

// Card cliccabile
<article
  role="button"
  tabIndex={0}
  aria-label={`Caso: Trattenuta cauzione, stato in istruttoria, aperto il 12 marzo 2024. ${proveCount} prove collegate.`}
  onClick={...}
  onKeyDown={...}
>
  ...
</article>

// Stato "completato" in progress tracker
<div
  role="progressbar"
  aria-valuenow={currentStep}
  aria-valuemin={0}
  aria-valuemax={totalSteps}
  aria-label={`Step ${currentStep} di ${totalSteps}: ${stepName}`}
>
  ...
</div>
```

### Keyboard Navigation (Web)

- Tutte le funzionalità accessibili da tastiera
- Tab order logico (non basato su DOM order se diverso dal flusso visivo)
- Focus trap in modali (Tab cicla dentro, non esce)
- Escape chiude modali, bottom sheet, dropdown
- Enter/Space attivano elementi
- Arrow keys per stepper, tab, carousel
- Skip to main content link presente

```html
<!-- Skip link: primo elemento dopo <body> -->
<a href="#main-content" class="skip-link">
  Salta al contenuto principale
</a>
```

### Touch Target

```
● Tutti gli elementi interattivi: minimo 44×44pt area cliccabile
● Icon button: 44×44pt (anche se icona è 24×24)
● Link in testo: 44×44pt (line-height aiuta)
● Button piccolo (sm): padding extra per raggiungere 44pt
● Radio/checkbox: label tappabile che estende area touch
● Distanza minima tra elementi tappabili: 8px
```

### Focus Indicators

```css
/* Focus indicator visibile per tutti */
:focus-visible {
  outline: 2.5px solid var(--color-primary-500);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Focus danger per azioni distruttive */
.danger-button:focus-visible {
  outline-color: var(--color-danger);
}

/* Mai rimuovere outline senza fornire alternativa */
:focus {
  outline: none;
}
```

### Semantic HTML (Web)

```html
<!-- Esempio di struttura semantica -->
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only">Salta al contenuto</a>

  <header role="banner">
    <nav aria-label="Navigazione principale">
      <!-- Bottom nav -->
    </nav>
  </header>

  <main id="main-content" role="main">
    <h1>I tuoi casi</h1>

    <section aria-label="Casi attivi">
      <article aria-labelledby="case-1-title">
        <h2 id="case-1-title">Trattenuta cauzione</h2>
        <p>Stato: Istruttoria</p>
      </article>
    </section>
  </main>

  <footer role="contentinfo">
    <!-- Disclaimer -->
  </footer>
</body>
```

### Error Messages

```tsx
// Ogni errore deve:
// 1. Essere associato all'input via aria-describedby
// 2. Essere chiaro, specifico, non generico
// 3. Suggerire come risolvere

// Buono:
"L'indirizzo email non è valido. Inserisci un indirizzo come nome@esempio.com"
// Cattivo:
"Errore nel campo email"  // Non specifico
"Campo obbligatorio"      // Non dice cosa manca

<label htmlFor="email">Indirizzo email</label>
<input
  id="email"
  type="email"
  aria-describedby={errors.email ? 'email-error' : undefined}
  aria-invalid={!!errors.email}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email}
  </p>
)}
```

### Accessibility Checklist

- [ ] Tutti i touch target ≥ 44×44pt
- [ ] Tutte le immagini non decorative hanno `alt` text descrittivo
- [ ] Icone decorative hanno `aria-hidden="true"`
- [ ] Form errori associati via `aria-describedby`
- [ ] Stati (caricamento, errore, vuoto) comunicati via `aria-live`
- [ ] Modali hanno focus trap
- [ ] Navigazione via tastiera completa
- [ ] Skip link presente
- [ ] Colori non usati come unico canale informativo
- [ ] Dynamic Type supportato (rem, line-height proportionale)
- [ ] `prefers-reduced-motion` rispettato
- [ ] Testato con VoiceOver (iOS) e TalkBack (Android)
- [ ] Testato con ingrandimento testo al 200%
- [ ] Focus indicator visibile su tutti i temi

---

## 10. Low-Stimulus Mode

### Cos'è

La Low-Stimulus Mode è una modalità speciale di CasaGiusta progettata per utenti in stato di ansia, stress elevato, o con sensibilità sensoriale (es. neurodivergenza). Riduce tutti gli stimoli visivi e sonori al minimo, mantenendo solo la funzionalità essenziale.

### Attivazione

- **Manuale**: Impostazioni → Preferenze → Low-Stimulus Mode (toggle)
- **Automatica**: Dopo un'emergenza (procedura di sfratto, notifica di avviso esecutivo), l'app chiede: "Vuoi passare alla modalità tranquilla? Meno colori, meno movimento."
- **Raccomandata**: Dopo 3+ notifiche in 10 minuti
- **Temporanea**: "Per quanto? [30 min] [1 ora] [2 ore] [Tutto il giorno] [Sempre]"

### Cambiamenti visivi

```css
/* Low-Stimulus Mode - Token overrides */
.low-stimulus {
  /* Colori desaturati */
  --color-primary-500: #5a9e92;
  --color-accent-500: #b8865a;
  --color-danger: #c47a7a;
  --color-success: #7a9e7a;
  --color-warning: #b8a040;
  --color-info: #6a8aaa;

  /* Saturazione generale ridotta */
  filter: saturate(0.7);

  /* Rimuovi gradienti e pattern */
  background-image: none !important;

  /* Rimuovi ombre */
  --shadow-soft: none;
  --shadow-card: none;
}

.low-stimulus * {
  /* Nessuna animazione */
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

.low-stimulus .card {
  border: 1px solid var(--color-border-light);
  box-shadow: none;
}

.low-stimulus .button--primary {
  background: var(--color-primary-600);
  color: white;
}
```

**Cosa cambia**:

| Elemento | Normale | Low-Stimulus |
|---|---|---|
| **Colori** | Teal brillante + coral vivace | Teal desaturato, coral tenue |
| **Ombre** | Soft shadow su card | Nessuna ombra |
| **Gradienti** | Sfumature leggere | Tinte piatte |
| **Animazioni** | Tutte | Nessuna (tranne feedback essenziali) |
| **Skeleton** | Shimmer animation | Sfondo piatto, nessuna animazione |
| **Icone** | Tutte | Solo icone essenziali (CTA principali) |
| **Card density** | Normale | Ridotta (meno info per card) |
| **Notifiche** | Banner animato | Badge statico, nessun slide |
| **AI typing** | Dots animati | Testo statico "Giusta sta scrivendo..." |
| **Bottom nav** | 5 tab + FAB | 4 tab (nascondi Giusta icon animation), FAB normale |
| **Background** | Bianco/grigio chiaro | Grigio uniforme (#f0f2f5) |

### Layout modifiche

- **Font +2 dimensioni** (es. body da 16px a 20px)
- **Meno elementi per schermo**: nascondere widget non essenziali
- **Più spazio bianco** tra elementi (gap aumentato 1.5×)
- **Bordi più marcati** (2px invece di 1px) per maggiore definizione
- **Testo guida aggiuntivo**: ogni schermata ha una breve didascalia testuale che spiega cosa fare

```
Esempio: Home in Low-Stimulus Mode
┌─────────────────────────────────────┐
│  ← Ciao Mario                       │
│                                     │
│  Il tuo contratto                   │
│  Via Roma 12, Milano                │
│  Scade tra 4 mesi                   │
│                                     │
│  [Azioni]                           │
│                                     │
│  ═══════════════════════════════    │
│                                     │
│  I tuoi casi                        │
│                                     │
│  Trattenuta cauzione               │
│  Stato: in corso                    │
│  [Dettaglio]                        │
│                                     │
│  ═══════════════════════════════    │
│                                     │
│  Hai dubbi? Parla con Giusta       │
│  [Scrivi...]                        │
│                                     │
└─────────────────────────────────────┘
```

### Testo in Low-Stimulus

- **Niente emoji** (rimuovere tutte)
- **Niente esclamativi** (sostituire "Clicca qui!" con "Clicca qui.")
- **Frasi più brevi**: massimo 15 parole
- **Istruzioni più esplicite**: "Scrivi la tua domanda qui sotto" invece di "Scrivici"
- **Conferme più verbose**: "Hai cliccato 'Elimina'. Sei sicuro? Questa azione non può essere annullata."

### Uscita

- Button "Torna alla modalità normale" sempre visibile in alto (bg trasparente, testo primary)
- O impostazione timer dopo cui torna automaticamente
- Su richiesta: "Ti senti meglio? Possiamo tornare alla modalità normale quando vuoi."

---

## 11. Dark Mode

### Filosofia

CasaGiusta sceglie **dark mode come default** per un motivo preciso: chi usa l'app ha spesso ansia, paura, o sta affrontando situazioni stressanti. La dark mode è calmante, riduce l'affaticamento visivo, e comunica *"siamo in un posto tranquillo, non in un ufficio luminoso"*.

### Attivazione

- **Default**: Dark mode attiva al primo avvio
- **Toggle**: Impostazioni → Preferenze → "Modalità scura" (on/off)
- **Auto**: Opzione "Segui sistema" (iOS/Android)
- **Suggerimento contestuale**: Se utente apre l'app di notte, non chiedere; se apre di giorno con sole, suggerire "Vuoi passare alla modalità chiara?"

### Colori Dark Mode

```css
.dark {
  /* Background */
  --color-bg-primary:     #0f172a;  /* Slate 900 - base */
  --color-bg-secondary:   #1e293b;  /* Slate 800 - card, sheet */
  --color-bg-tertiary:    #334155;  /* Slate 700 - input, skeleton */

  /* Text */
  --color-text-primary:   #f8fafc;  /* Slate 50 - headline, body */
  --color-text-secondary: #cbd5e1;  /* Slate 300 - label, descrizione */
  --color-text-tertiary:  #64748b;  /* Slate 500 - placeholder, helper */

  /* Border */
  --color-border:         #334155;  /* Slate 700 */

  /* Primary (adattato per dark bg) */
  --color-primary-100: #134e4a;
  --color-primary-200: #115e59;
  --color-primary-300: #0f766e;
  --color-primary-400: #0d9488;
  --color-primary-500: #14b8a6;  /* Stessa luce, risalta sul buio */
  --color-primary-600: #2dd4bf;
  --color-primary-700: #5eead4;

  /* Accent (adattato per dark bg) */
  --color-accent-500: #fb923c;
  --color-accent-600: #f97316;
  --color-accent-700: #ea580c;

  /* Semantic (adattati per dark bg) */
  --color-success: #34d399;
  --color-warning: #fbbf24;
  --color-danger:  #f87171;
  --color-info:    #60a5fa;
}
```

### Regole Dark Mode

1. **Mai nero puro** (`#000000`) come sfondo: causa affaticamento dovuto al contrasto eccessivo con testo bianco. Usare `#0f172a` (slate 900) che è nero ma più morbido.
2. **Ombre invertite**: Su dark mode, le ombre diventano highlight (bordo chiaro leggero sopra) per simulare luce dall'alto.
3. **Contrasto sufficiente**: Anche in dark mode, testo body su bg primario deve mantenere AAA (ratio ≥ 7:1). `#f8fafc` su `#0f172a` = 14.8:1 — perfetto.
4. **Non scurire le icone**: Icone in dark mode usano `--color-text-secondary` o primary-400 per stare sul leggibile.
5. **Stessa gerarchia**: La gerarchia visiva (cosa è importante, cosa è secondario) deve rimanere identica tra light e dark.
6. **Test su sfondi scuri**: Verificare che il teal primary non perda leggibilità su bg scuro. `#14b8a6` su `#0f172a` = 6.5:1 (AA per testo grande, OK per UI).

### Dark Mode per componenti specifici

| Componente | Light | Dark |
|---|---|---|
| **Card** | bg #fff, border #e2e8f0 | bg #1e293b, border #334155 |
| **Input** | bg #fff, border #e2e8f0 | bg #0f172a, border #334155 |
| **Header** | bg #fff (opaco) | bg #0f172a (opaco, con border-bottom) |
| **Bottom nav** | bg #fff, border-top #e2e8f0 | bg #1e293b, border-top #334155 |
| **Skeleton** | bg-tertiary → bg-secondary | bg-tertiary #334155 → bg-secondary #1e293b |
| **Empty state** | bg-tertiary #f1f5f9 | bg-tertiary #334155 |
| **AI bubble (AI)** | bg-secondary #f8fafc | bg-secondary #1e293b |
| **AI bubble (user)** | primary-500 #14b8a6 | primary-500 #14b8a6 (testo bianco) |
| **Alert dialog** | bg #fff | bg #1e293b |
| **Modale backdrop** | rgba(15,23,42,0.4) | rgba(0,0,0,0.6) |
| **Link** | primary-600 | primary-400 |
| **Placeholder** | #94a3b8 | #64748b |

### Test in condizione di ansia simulata

Tutti i colori e contrasti dark mode devono essere testati simulando condizioni di:

- **Luminosità schermo ridotta** (20%): i colori devono rimanere distinguibili
- **Modalità notte sistema**: True Tone/Night Shift non devono alterare i colori al punto da renderli illeggibili
- **Utente affaticato**: Ridurre intenzionalmente acutezza visiva (sfocato) per verificare che CTA e testi principali siano comunque individuabili
- **Utente in movimento**: Leggibilità rapida (2 secondi di sguardo) — il primary CTA deve essere identificabile immediatamente

---

## Appendice A: Esempi di Schermate (Wireframe Testuali)

### Schermata Onboarding (Primo avvio)

```
┌──────────────────────────────────────────────┐
│                                              │
│                                              │
│         ╔═════════════════╗                  │
│         ║      🛡️        ║                  │
│         ╚═════════════════╝                  │
│                                              │
│        CasaGiusta                            │
│    Il tuo scudo digitale                     │
│                                              │
│    3 passi per iniziare:                     │
│                                              │
│    1. Carica il contratto                    │
│    2. Scopri i tuoi diritti                 │
│    3. Proteggiti con un caso                │
│                                              │
│         [Inizia →]                          │
│                                              │
│    ⚠️ I tuoi dati sono crittografati        │
│    e non vengono condivisi con nessuno.      │
│                                              │
│    [Ho già un account]                      │
│                                              │
└──────────────────────────────────────────────┘
```

### Schermata Emergenza (Sfratto)

```
┌──────────────────────────────────────────────┐
│  ← Emergenza                                 │
│                                              │
│  ╔══════════════════════════════════════╗    │
│  ║                                      ║    │
│  ║          🛡️                          ║    │
│  ║                                      ║    │
│  ║  Hai ricevuto un atto di sfratto?   ║    │
│  ║                                      ║    │
│  ║  Non sei solo. Ti guido io passo    ║    │
│  ║  passo. La prima cosa da fare è     ║    │
│  ║  non firmare nulla.                 ║    │
│  ║                                      ║    │
│  ║  [Inizia procedura guidata]         ║    │
│  ║                                      ║    │
│  ╚══════════════════════════════════════╝    │
│                                              │
│  Oppure:                                     │
│  [Parla subito con Giusta]                   │
│  [Trova sportello di tutela]                 │
│  [Scarica guida completa]                    │
│                                              │
│  ℹ️  Tutte le azioni sono reversibili       │
│  fino all'invio ufficiale.                   │
│                                              │
└──────────────────────────────────────────────┘
```

### Schermata Calcolatore (Aumento ISTAT)

```
┌──────────────────────────────────────────────┐
│  ← Calcolatore aumento                       │
│                                              │
│  Calcola l'aumento del canone               │
│                                              │
│  Canone attuale                              │
│  ┌─────────────────────────────────────┐     │
│  │ € 800                              │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  Data ultimo aumento                        │
│  ┌─────────────────────────────────────┐     │
│  │ 12/03/2023                    📅    │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  ISTAT applicato dal proprietario            │
│  ┌─────────────────────────────────────┐     │
│  │ 5.5%                              │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │  Risultato                          │     │
│  │                                     │     │
│  │  Aumento massimo consentito: 3.2%  │     │
│  │  Aumento richiesto: 5.5%           │     │
│  │  Differenza: +2.3% non dovuta      │     │
│  │                                     │     │
│  │  L'aumento richiesto SUPERA        │     │
│  │  il limite ISTAT di 2.3%           │     │
│  │                                     │     │
│  │  [Genera diffida di contestazione] │     │
│  └─────────────────────────────────────┘     │
│                                              │
└──────────────────────────────────────────────┘
```

---

## Appendice B: Pattern di Copywriting

### Regole generali

| Regola | Spiegazione | Esempio ✅ | Esempio ❌ |
|---|---|---|---|
| **"Tu" sempre** | Mai "Lei", mai "utente" | "I tuoi contratti" | "I contratti dell'utente" |
| **Attivo sempre** | Mai forma passiva | "Ti guido io" | "Verrà guidato da..." |
| **Positivo prima** | Prima il lato buono | "Puoi caricare la prova ora" | "Non hai ancora caricato..." |
| **Azione chiara** | Ogni CTA dice COSA fa | "Carica il contratto" | "Invia" / "Procedi" |
| **Punto fermo** | Frasi brevi, punti fermi | "Respiriamo. Ti guido." | "Ti guideremo passo dopo passo..." |
| **Niente legalese** | Mai "ai sensi del", "ex art." | "La legge dice che..." | "Ai sensi dell'art. 157 c.c." |
| **Sbagliare ok** | Mai colpevolizzare | "Non preoccuparti, ci pensiamo ora" | "Avresti dovuto farlo prima" |

### Pattern per stati emotivi

| Stato utente | Tono | Apertura | Chiusura |
|---|---|---|---|
| **Paura** | Calmo, lento, sicuro | "Hai ricevuto...? Respiriamo." | "Sei in buone mani." |
| **Confusione** | Chiaro, strutturato, semplice | "Non sai da dove iniziare? Inizia da qui." | "Adesso è tutto più chiaro?" |
| **Frustrazione** | Empatico, comprensivo, azione | "Capisco. È davvero frustrante." | "Facciamo qualcosa insieme." |
| **Urgenza** | Deciso, veloce, azione immediata | "Subito. Ecco cosa fare." | "Fatto. Sei protetto." |
| **Successo** | Caldo, celebrativo (sobrio) | "Ce l'abbiamo fatta." | "Siamo qui se serve ancora." |
| **Errore utente** | Mai colpevolizzare, soluzione | "Non fa niente. Riproviamo." | "Meglio ora?" |
| **Sistema error** | Scusa chiara, azione, tempistica | "Mi dispiace, non sono riuscito a..." | "Ho già riprovato tra 30 secondi." |

### Pattern per CTA

| Contesto | CTA debole | CTA CasaGiusta |
|---|---|---|
| Carica prova | "Carica" | "Carica la tua prova" |
| Genera documento | "Genera" | "Genera la diffida pronta" |
| Contatta supporto | "Supporto" | "Parla con un esperto" |
| Inizia procedura | "Inizia" | "Inizia la procedura guidata" |
| Scarica guida | "Scarica" | "Scarica la guida completa" |
| Elimina account | "Elimina" | "Elimina account (irreversibile)" |

---

## Appendice C: Design Tokens — Riepilogo JSON

```json
{
  "version": "1.0.0",
  "app": "CasaGiusta",
  "tokens": {
    "colors": {
      "primary": { "50": "#f0fdfa", "100": "#ccfbf1", "200": "#99f6e4", "300": "#5eead4", "400": "#2dd4bf", "500": "#14b8a6", "600": "#0d9488", "700": "#0f766e", "800": "#115e59", "900": "#134e4a" },
      "accent": { "50": "#fff7ed", "100": "#ffedd5", "200": "#fed7aa", "300": "#fdba74", "400": "#fb923c", "500": "#f97316", "600": "#ea580c", "700": "#c2410c" },
      "semantic": { "success": "#10b981", "warning": "#f59e0b", "danger": "#ef4444", "info": "#3b82f6" }
    },
    "typography": {
      "fontFamily": { "display": ["Satoshi", "Geist Sans", "system-ui", "sans-serif"], "body": ["Inter", "system-ui", "sans-serif"], "mono": ["JetBrains Mono", "SF Mono", "monospace"] },
      "fontSize": { "xs": 12, "sm": 14, "base": 16, "lg": 18, "xl": 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 60, "7xl": 72 },
      "lineHeight": { "tight": 1.1, "sub": 1.2, "compact": 1.4, "body": 1.5, "long": 1.6, "mono": 1.7 },
      "letterSpacing": { "tight": -0.02, "normal": 0, "wide": 0.02 }
    },
    "spacing": { "base": 4, "scale": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256] },
    "breakpoints": { "mobile": 480, "tablet": 768, "desktop": 1200 },
    "borderRadius": { "xs": 4, "sm": 6, "md": 8, "lg": 12, "xl": 16 },
    "animation": {
      "duration": { "fast": 100, "normal": 200, "slow": 300, "slower": 400 },
      "easing": { "default": "ease-out", "spring": "cubic-bezier(0.68, -0.55, 0.27, 1.55)" }
    }
  }
}
```

---

> **CasaGiusta Design System v1.0**
> Progettato con empatia radicale. Costruito per proteggere.
> "Il tuo scudo digitale. I tuoi diritti, subito."
