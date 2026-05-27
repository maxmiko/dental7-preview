/* DentalSeptiņi — UI primitives & shared components */
const { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } = React;

/* ============== i18n context ============== */
const I18nCtx = createContext({ lang: "lv", t: (k) => k, setLang: () => {} });
const useI18n = () => useContext(I18nCtx);

/* ============== Reveal on scroll ============== */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    document.querySelectorAll("[data-reveal]:not(.on)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ============== Wordmark ============== */
function Wordmark({ size = 22 }) {
  return (
    <span className="nav-wordmark" style={{ fontSize: size }}>
      <span className="dot"></span>
      <span>Dental<em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>Septiņi</em></span>
    </span>
  );
}

/* ============== Lang switch ============== */
function LangSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="lang" role="group" aria-label="Language">
      {["lv","ru","en"].map(l => (
        <button key={l} onClick={() => setLang(l)} className={lang === l ? "on" : ""}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

/* ============== Nav ============== */
function Nav({ route, setRoute, onBook }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const items = [
    { id: "home", label: t("nav.home") },
    { id: "services", label: t("nav.services") },
    { id: "team", label: t("nav.team") },
    { id: "pricing", label: t("nav.pricing") },
    { id: "contacts", label: t("nav.contacts") },
  ];
  const go = (id) => { setRoute(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <>
      <header className={"nav-shell" + (scrolled ? " scrolled" : "")}>
        <div className="container-wide nav-row">
          <button onClick={() => go("home")}><Wordmark/></button>
          <nav className="nav-links" aria-label="Primary">
            {items.map(it => (
              <button key={it.id} onClick={() => go(it.id)} className={"nav-link" + (route === it.id ? " active" : "")}>{it.label}</button>
            ))}
          </nav>
          <div className="nav-right">
            <LangSwitch/>
            <button className="btn btn-primary btn-sm hide-md" onClick={onBook}>
              {t("cta.bookShort")}
              <ArrowRight/>
            </button>
            <button className="mobile-toggle" aria-label="Menu" onClick={() => setOpen(o => !o)}>
              <span className="bars"></span>
            </button>
          </div>
        </div>
      </header>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <div className="nav-row" style={{ borderBottom: "1px solid var(--line)" }}>
          <Wordmark/>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close">
            <Close/>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 28 }}>
          {items.map(it => (
            <button key={it.id} onClick={() => go(it.id)} className="nav-link" style={{ textAlign: "left", fontSize: 22, padding: "12px 0", fontFamily: "var(--font-serif)" }}>{it.label}</button>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
          <LangSwitch/>
          <button className="btn btn-primary btn-lg" onClick={() => { setOpen(false); onBook(); }}>
            {t("cta.book")}
          </button>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".1em", textTransform: "uppercase" }}>
            {t("phone1")} · {t("address")}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============== Footer ============== */
function Footer({ setRoute, onBook }) {
  const { t, lang } = useI18n();
  const year = 2026;
  return (
    <footer style={{ background: "var(--ink)", color: "var(--bg)", padding: "80px 0 32px", marginTop: 80 }}>
      <div className="container-wide">
        <div className="grid grid-12" style={{ gap: 32, alignItems: "start" }}>
          <div style={{ gridColumn: "span 4" }}>
            <div className="nav-wordmark" style={{ fontSize: 28, color: "var(--bg)" }}>
              <span className="dot"></span>
              <span>Dental<em style={{ fontStyle: "italic", color: "var(--accent)" }}>Septiņi</em></span>
            </div>
            <p style={{ marginTop: 18, color: "rgba(255,255,255,.65)", maxWidth: "32ch", lineHeight: 1.6 }}>
              {t("footer.tagline")}
            </p>
            <button className="btn btn-accent" onClick={onBook} style={{ marginTop: 22 }}>{t("cta.book")} <ArrowRight/></button>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <FooterCol title={t("nav.services")} items={SERVICES.slice(0,5).map(s => s[lang].name)} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <FooterCol title={lang === "ru" ? "Разделы" : (lang === "en" ? "Sections" : "Sadaļas")}
              items={[t("nav.home"), t("nav.services"), t("nav.team"), t("nav.pricing"), t("nav.contacts")]}
              onClick={(i) => { const ids=["home","services","team","pricing","contacts"]; setRoute(ids[i]); window.scrollTo({top:0,behavior:"smooth"}); }} />
          </div>

          <div style={{ gridColumn: "span 4" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 14 }}>
              {t("section.contacts")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
              <a className="ulink" href={`tel:${t("phone1").replace(/\s/g,"")}`}>{t("phone1")}</a>
              <a className="ulink" href={`tel:${t("phone2").replace(/\s/g,"")}`}>{t("phone2")}</a>
              <a className="ulink" href="mailto:info@dentalseptini.lv">info@dentalseptini.lv</a>
              <div style={{ color: "rgba(255,255,255,.65)" }}>{t("address")}</div>
              <div style={{ color: "rgba(255,255,255,.65)" }}>{t("hours")}</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.1)", marginTop: 56, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,.5)", flexWrap: "wrap", gap: 12 }}>
          <div>© {year} DentalSeptiņi · {t("footer.legal")}</div>
          <div style={{ fontFamily: "var(--font-mono)", letterSpacing: ".1em", textTransform: "uppercase", fontSize: 10 }}>
            Izstrāde · <span style={{ color: "var(--accent)" }}>maxweb.lv</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginBottom: 14 }}>
        {title}
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
        {items.map((it, i) => (
          <li key={i}>
            {onClick
              ? <button className="ulink" onClick={() => onClick(i)} style={{ color: "rgba(255,255,255,.75)" }}>{it}</button>
              : <span style={{ color: "rgba(255,255,255,.75)" }}>{it}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============== Icons ============== */
function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/>
    </svg>
  );
}
function ArrowDownRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18"/><polyline points="10 18 18 18 18 10"/>
    </svg>
  );
}
function Close({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
    </svg>
  );
}
function Phone({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
function Check({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function Star({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function Quote({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 7h4v4H8c0 2 1 3 3 3v2c-3 0-5-2-5-5V7zm10 0h4v4h-3c0 2 1 3 3 3v2c-3 0-5-2-5-5V7z"/>
    </svg>
  );
}

/* ============== Form fields ============== */
function Field({ label, error, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
      {error && <span className="err-msg">{error}</span>}
    </div>
  );
}

function TextInput({ value, onChange, error, type = "text", ...rest }) {
  return (
    <input className={"input" + (error ? " err" : "")} value={value} onChange={e => onChange(e.target.value)} type={type} {...rest} />
  );
}
function TextArea({ value, onChange, error, ...rest }) {
  return (
    <textarea className={"textarea" + (error ? " err" : "")} value={value} onChange={e => onChange(e.target.value)} {...rest} />
  );
}

/* ============== Modal ============== */
function Modal({ open, onClose, children, ariaLabel }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  return (
    <div className={"modal-back" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label={ariaLabel} onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

/* ============== Toast ============== */
function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 3200);
    return () => clearTimeout(t);
  }, [msg]);
  const node = (
    <div className={"toast" + (msg ? " show" : "")} role="status">
      <Check/>
      <span>{msg}</span>
    </div>
  );
  return [node, setMsg];
}

/* ============== Accordion ============== */
function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={"acc-item" + (open === i ? " open" : "")}>
          <button className="acc-btn" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{it.q}</span>
            <span className="plus" aria-hidden="true"></span>
          </button>
          <div className="acc-body">
            <div className="acc-body-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============== Section header ============== */
function SectionHead({ eyebrow, title, lead, align = "left", action }) {
  return (
    <div data-reveal style={{ display: "flex", justifyContent: align === "center" ? "center" : "space-between", alignItems: "end", gap: 32, marginBottom: 48, flexWrap: "wrap", textAlign: align === "center" ? "center" : "left" }}>
      <div style={{ maxWidth: align === "center" ? "30ch" : "26ch" }}>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 12 }}>· {eyebrow}</div>}
        <h2 className="display-2">{title}</h2>
        {lead && <p style={{ marginTop: 16, color: "var(--ink-2)", maxWidth: "44ch", lineHeight: 1.55 }}>{lead}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/* ============== Acute pain banner ============== */
function AcuteBanner() {
  const { t } = useI18n();
  return (
    <div style={{ background: "var(--ink)", color: "var(--bg)", fontSize: 13, lineHeight: 1.3 }}>
      <div className="container-wide" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 28px", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
          <span className="dot" style={{ background: "var(--accent)", flexShrink: 0 }}></span>
          <span style={{ color: "rgba(255,255,255,.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t("acuteBanner")}</span>
        </div>
        <a href={`tel:${t("phone1").replace(/\s/g,"")}`} className="ulink" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent)", flexShrink: 0, whiteSpace: "nowrap" }}>
          <Phone size={12}/>
          <span className="hide-md">{t("acuteCall")} · </span>
          {t("phone1")}
        </a>
      </div>
    </div>
  );
}

/* ============== Insurance marquee ============== */
function InsurerStrip() {
  const { t } = useI18n();
  const items = [...INSURERS, ...INSURERS];
  return (
    <section style={{ padding: "48px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container-wide" style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
        <div style={{ flexShrink: 0, maxWidth: 240 }}>
          <div className="eyebrow">· {t("section.insurers")}</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, marginTop: 8, color: "var(--ink-2)" }}>BALTA · BTA · Gjensidige · ERGO · Seesam · IF · Compensa</div>
        </div>
        <div className="marquee" style={{ flex: 1, minWidth: 280 }}>
          <div className="marquee-track">
            {items.map((it, i) => (
              <div key={i} style={{
                fontFamily: "var(--font-serif)",
                fontSize: 36, fontStyle: "italic",
                color: "var(--ink)", opacity: .6,
                whiteSpace: "nowrap", letterSpacing: "-0.01em"
              }}>{it}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* expose */
Object.assign(window, {
  I18nCtx, useI18n, useReveal, Wordmark, LangSwitch, Nav, Footer,
  ArrowRight, ArrowDownRight, Close, Phone, Check, Star, Quote,
  Field, TextInput, TextArea, Modal, useToast, Accordion, SectionHead,
  AcuteBanner, InsurerStrip,
});
