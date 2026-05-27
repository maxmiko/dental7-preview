/* DentalSeptiņi v2 — softer UI primitives */
const { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } = React;

/* ============== i18n ============== */
const I18nCtx = createContext({ lang: "lv", t: (k) => k, setLang: () => {} });
const useI18n = () => useContext(I18nCtx);

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.04 });
    document.querySelectorAll("[data-reveal]:not(.on)").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ============== Logo ============== */
function Logo() {
  return (
    <span className="logo">
      <span className="logo-mark" aria-hidden="true">D<span style={{ fontSize: 9, marginLeft: 1, verticalAlign: "top" }}>7</span></span>
      <span className="logo-text">Dental<em>Septiņi</em></span>
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

/* ============== Acute banner — soft, friendly ============== */
function AcuteBanner() {
  const { t } = useI18n();
  return (
    <div style={{ background: "var(--brand-soft)", color: "var(--brand-deep)", fontSize: 13.5, fontWeight: 500 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <IconAlert size={16}/>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t("acuteBanner")}</span>
        </div>
        <a href={`tel:${t("phone1").replace(/\s/g,"")}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", fontWeight: 600 }}>
          <IconPhone size={13}/>
          <span className="hide-md">{t("acuteCall")} · </span>
          {t("phone1")}
        </a>
      </div>
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
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="container nav-inner">
          <button onClick={() => go("home")} aria-label="Home"><Logo/></button>
          <nav className="nav-links" aria-label="Primary">
            {items.map(it => (
              <button key={it.id} onClick={() => go(it.id)} className={"nav-link" + (route === it.id ? " active" : "")}>{it.label}</button>
            ))}
          </nav>
          <div className="nav-right">
            <LangSwitch/>
            <button className="btn btn-primary btn-sm btn-book-desktop" onClick={onBook}>
              {t("cta.bookShort")}
            </button>
            <button className="mobile-toggle" aria-label="Menu" onClick={() => setOpen(o => !o)}>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="mobile-menu open">
          <div className="nav-inner" style={{ borderBottom: "1px solid var(--line)" }}>
            <Logo/>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close"><IconClose/></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 32 }}>
            {items.map(it => (
              <button key={it.id} onClick={() => go(it.id)} style={{ textAlign: "left", fontSize: 22, padding: "14px 0", fontWeight: 600, color: route === it.id ? "var(--brand-deep)" : "var(--ink)" }}>{it.label}</button>
            ))}
          </div>
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
            <LangSwitch/>
            <button className="btn btn-primary btn-lg" onClick={() => { setOpen(false); onBook(); }}>
              {t("cta.book")}
            </button>
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
              {t("phone1")} · {t("address")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============== Footer ============== */
function Footer({ setRoute, onBook }) {
  const { t, lang } = useI18n();
  return (
    <footer style={{ background: "var(--bg-soft)", padding: "72px 0 32px", marginTop: 64, borderTop: "1px solid var(--line)" }}>
      <div className="container">
        <div className="grid grid-12" style={{ gap: 40, alignItems: "start" }}>
          <div className="col-4">
            <Logo/>
            <p style={{ marginTop: 18, color: "var(--ink-2)", maxWidth: "32ch", lineHeight: 1.6, fontSize: 15 }}>
              {t("footer.tagline")}
            </p>
            <button className="btn btn-primary" onClick={onBook} style={{ marginTop: 22 }}>{t("cta.book")}</button>
          </div>

          <div className="col-3" style={{ gridColumn: "span 2" }}>
            <FooterCol title={t("nav.services")} items={SERVICES.slice(0,5).map(s => s[lang].name)} />
          </div>
          <div className="col-3" style={{ gridColumn: "span 2" }}>
            <FooterCol title={lang === "ru" ? "Разделы" : (lang === "en" ? "Sections" : "Sadaļas")}
              items={[t("nav.home"), t("nav.services"), t("nav.team"), t("nav.pricing"), t("nav.contacts")]}
              onClick={(i) => { const ids=["home","services","team","pricing","contacts"]; setRoute(ids[i]); window.scrollTo({top:0,behavior:"smooth"}); }} />
          </div>

          <div className="col-4">
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 14 }}>{t("section.contacts")}</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5, color: "var(--ink-2)" }}>
              <li><a className="link" href={`tel:${t("phone1").replace(/\s/g,"")}`}>{t("phone1")}</a></li>
              <li><a className="link" href={`tel:${t("phone2").replace(/\s/g,"")}`}>{t("phone2")}</a></li>
              <li><a className="link" href="mailto:info@dentalseptini.lv">info@dentalseptini.lv</a></li>
              <li>{t("address")}</li>
              <li>{t("hours")}</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", marginTop: 48, paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--ink-3)", flexWrap: "wrap", gap: 12 }}>
          <div>© 2026 DentalSeptiņi · {t("footer.legal")}</div>
          <div>{lang === "ru" ? "Разработка" : (lang === "en" ? "Built by" : "Izstrāde")} · <a className="link" href="https://maxweb.lv" target="_blank" rel="noopener">maxweb.lv</a></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 14 }}>{title}</div>
      <ul style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14.5, color: "var(--ink-2)" }}>
        {items.map((it, i) => (
          <li key={i}>
            {onClick
              ? <button onClick={() => onClick(i)} style={{ color: "var(--ink-2)", transition: "color .15s" }} onMouseEnter={e => e.currentTarget.style.color="var(--brand-deep)"} onMouseLeave={e => e.currentTarget.style.color="var(--ink-2)"}>{it}</button>
              : <span>{it}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============== Icons — outlined, friendly ============== */
const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
function IconArrow({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>;
}
function IconClose({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>;
}
function IconPhone({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
}
function IconMail({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>;
}
function IconMapPin({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function IconClock({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>;
}
function IconCheck({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} strokeWidth="2.2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
}
function IconStar({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function IconAlert({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="0.6" fill="currentColor"/></svg>;
}
function IconSearch({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function IconShield({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
}
function IconHeart({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function IconTooth({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} strokeWidth="1.6" aria-hidden="true"><path d="M12 3c-2.5 0-4 1-5.5 1S3 5.5 3 8.5c0 2 .5 3.5 1 5s1 2.5 1.5 4.5S6.5 22 8 22s2-3 2.5-5 .5-3 1.5-3 1 1 1.5 3 1 5 2.5 5 1.5-2 2-5 1-3 1.5-4.5 1-3 1-5c0-3-1.5-3.5-3.5-3.5S14.5 3 12 3z"/></svg>;
}
function IconSparkle({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} strokeWidth="1.8" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></svg>;
}
function IconUsers({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function IconCalendar({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" {...ic} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>;
}

/* ============== Form fields ============== */
function Field({ label, error, children, hint }) {
  return (
    <div className="field">
      {label && <label className="field-label">{label}</label>}
      {children}
      {hint && !error && <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{hint}</span>}
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
      <IconCheck size={16}/>
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
            <span className="plus" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </span>
          </button>
          <div className="acc-body">
            <div className="acc-body-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============== Section head ============== */
function SectionHead({ eyebrow, title, lead, align = "left", action }) {
  return (
    <div data-reveal style={{
      display: "flex",
      justifyContent: align === "center" ? "center" : "space-between",
      alignItems: "end", gap: 32, marginBottom: 48, flexWrap: "wrap",
      textAlign: align === "center" ? "center" : "left",
    }}>
      <div style={{ maxWidth: align === "center" ? "40ch" : "30ch" }}>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 12 }}>{eyebrow}</div>}
        <h2 className="h1">{title}</h2>
        {lead && <p className="lead" style={{ marginTop: 14, maxWidth: "46ch" }}>{lead}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

/* ============== Insurer marquee ============== */
function InsurerStrip() {
  const { t } = useI18n();
  const items = [...INSURERS, ...INSURERS, ...INSURERS];
  return (
    <section style={{ padding: "44px 0", background: "var(--bg-soft)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 22, fontSize: 13.5, color: "var(--ink-2)", fontWeight: 500 }}>
          {t("section.insurers")}
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {items.map((it, i) => (
              <div key={i} style={{ fontSize: 22, fontWeight: 700, color: "var(--ink-2)", opacity: .55, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{it}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* expose */
Object.assign(window, {
  I18nCtx, useI18n, useReveal, Logo, LangSwitch, AcuteBanner, Nav, Footer,
  IconArrow, IconClose, IconPhone, IconMail, IconMapPin, IconClock, IconCheck, IconStar,
  IconAlert, IconSearch, IconShield, IconHeart, IconTooth, IconSparkle, IconUsers, IconCalendar,
  Field, TextInput, TextArea, Modal, useToast, Accordion, SectionHead, InsurerStrip,
});
