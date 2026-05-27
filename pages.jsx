/* DentalSeptiņi v2 — pages (Home, Services, Team, Pricing, Contacts) */

/* ============== HOME ============== */
function HomePage({ onBook, setRoute }) {
  useReveal();
  return (
    <>
      <Hero onBook={onBook} setRoute={setRoute}/>
      <InsurerStrip/>
      <ServicesSection setRoute={setRoute} onBook={onBook}/>
      <WhySection/>
      <TechSection/>
      <TeamPreview setRoute={setRoute}/>
      <InlineBookSection onBook={onBook}/>
      <ReviewsSection/>
      <NewsSection/>
      <FAQSection/>
      <ContactsTeaser setRoute={setRoute}/>
    </>
  );
}

/* ============== Hero ============== */
function Hero({ onBook, setRoute }) {
  const { t, lang } = useI18n();
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob-1"></div>
        <div className="hero-blob-2"></div>
      </div>
      <div className="container hero-inner">
        <div className="grid grid-12" style={{ alignItems: "center", gap: 48 }}>
          <div className="col-7" data-reveal>
            <span className="chip"><span className="chip-dot"></span>{t("hero.eyebrow")}</span>
            <h1 className="h-display" style={{ marginTop: 22, maxWidth: "16ch" }}>
              {t("hero.title1")} <span style={{ color: "var(--brand-deep)" }}>{t("hero.title2")}</span>
            </h1>
            <p className="lead" style={{ marginTop: 22, maxWidth: "46ch" }}>{t("hero.lead")}</p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={onBook}>
                <IconCalendar size={16}/> {t("cta.book")}
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => setRoute("services")}>
                {t("cta.allServices")}
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 36, flexWrap: "wrap" }}>
              <div style={{ display: "flex" }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    width: 38, height: 38, borderRadius: 999,
                    background: "var(--bg-tint)",
                    border: "2px solid #fff",
                    marginLeft: i === 0 ? 0 : -10,
                    boxShadow: "0 1px 4px rgba(0,0,0,.08)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 600, color: "var(--brand-deep)",
                  }}>{["G","K","M","A"][i]}</div>
                ))}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--warn)" }}>
                  {[0,1,2,3,4].map(i => <IconStar key={i} size={14}/>)}
                  <span style={{ color: "var(--ink)", fontWeight: 600, fontSize: 14, marginLeft: 6 }}>4.9 / 5</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
                  {lang === "ru" ? "200+ отзывов в Google" : (lang === "en" ? "200+ reviews on Google" : "200+ atsauksmes Google")}
                </div>
              </div>
            </div>
          </div>

          <div className="col-5" data-reveal>
            <HeroVisual/>
          </div>
        </div>

        <div className="grid grid-4" style={{ marginTop: 72, gap: 16 }} data-reveal>
          <StatCard num="16" label={t("hero.years")}/>
          <StatCard num="4" label={t("hero.docs")}/>
          <StatCard num="7" label={t("hero.insurers")}/>
          <StatCard num="5" label={t("hero.warranty")}/>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const { t, lang } = useI18n();
  return (
    <div style={{ position: "relative", paddingBottom: 30, paddingRight: 16 }}>
      {/* main image */}
      <div className="img-ph" style={{
        aspectRatio: "4/5", borderRadius: 28,
        boxShadow: "var(--shadow-3)",
      }}>
        <div style={{ position: "absolute", top: 18, left: 18 }}>
          <span className="chip" style={{ background: "rgba(255,255,255,.85)", backdropFilter: "blur(8px)" }}>
            <IconShield size={14}/> {lang === "ru" ? "Сертифицированные врачи" : (lang === "en" ? "Certified doctors" : "Sertificēti ārsti")}
          </span>
        </div>
        <span className="img-ph-label">{lang === "ru" ? "Фото врача · 4:5" : (lang === "en" ? "Doctor photo · 4:5" : "Ārsta foto · 4:5")}</span>
      </div>

      {/* floating card 1: reviews */}
      <div style={{
        position: "absolute", left: -16, bottom: 50,
        background: "#fff", borderRadius: 16, padding: "14px 18px",
        boxShadow: "var(--shadow-2)",
        display: "flex", alignItems: "center", gap: 12,
        maxWidth: 230,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 999,
          background: "var(--brand-soft)", color: "var(--brand-deep)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconHeart size={18}/>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>200+</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
            {lang === "ru" ? "довольных пациентов" : (lang === "en" ? "happy patients" : "apmierināti pacienti")}
          </div>
        </div>
      </div>

      {/* floating card 2: phone */}
      <div style={{
        position: "absolute", right: -8, top: 30,
        background: "#fff", borderRadius: 16, padding: "12px 14px",
        boxShadow: "var(--shadow-2)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 999,
          background: "var(--brand)", color: "#fff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <IconPhone size={14}/>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "var(--ink-3)" }}>
            {lang === "ru" ? "Острая боль" : (lang === "en" ? "Acute pain" : "Akūtās sāpes")}
          </div>
          <div style={{ fontWeight: 700, fontSize: 13.5 }}>+371 291 135 84</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--radius)",
      padding: "22px 24px",
      display: "flex", flexDirection: "column", gap: 6,
      transition: "border-color .2s",
    }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: "var(--brand-deep)", letterSpacing: "-0.02em", lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

/* ============== Services ============== */
const SERVICE_ICONS = {
  treatment: IconHeart,
  hygiene: IconSparkle,
  implants: IconShield,
  prosth: IconTooth,
  whitening: IconSparkle,
  surgery: IconShield,
  endo: IconHeart,
  kids: IconUsers,
};

function ServicesSection({ setRoute, onBook }) {
  const { t, lang } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow={t("services.eyebrow").toUpperCase()}
          title={t("section.services")}
          lead={t("section.services.lead")}
          action={
            <button className="btn btn-secondary" onClick={() => setRoute("services")}>
              {t("cta.allServices")} <IconArrow size={14}/>
            </button>
          }
        />
        <div data-reveal className="grid grid-4" style={{ gap: 16 }}>
          {SERVICES.slice(0, 8).map((s) => (
            <ServiceCard key={s.id} svc={s} onBook={onBook} setRoute={setRoute}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, onBook, setRoute }) {
  const { t, lang } = useI18n();
  const Ico = SERVICE_ICONS[svc.id] || IconTooth;
  return (
    <article className="card card-hover" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 22, height: "100%" }}>
      <div className="feat-icon"><Ico size={22}/></div>
      <h3 className="h3" style={{ marginTop: 2 }}>{svc[lang].name}</h3>
      <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, flex: 1 }}>{svc[lang].short}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid var(--line)", marginTop: 4 }}>
        <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{t("form.from")} <strong style={{ color: "var(--ink)" }}>{svc.priceFrom} €</strong></span>
        <button onClick={() => setRoute("services")} className="link" style={{ fontSize: 13.5 }}>
          {t("cta.readMore")}
        </button>
      </div>
    </article>
  );
}

/* ============== Why us ============== */
function WhySection() {
  const { t, lang } = useI18n();
  const items = [
    { k: "exp",      Icon: IconShield },
    { k: "tech",     Icon: IconSparkle },
    { k: "team",     Icon: IconUsers },
    { k: "warranty", Icon: IconHeart },
  ];
  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <SectionHead
          eyebrow={(lang === "ru" ? "О КЛИНИКЕ" : (lang === "en" ? "ABOUT THE CLINIC" : "PAR KLĪNIKU"))}
          title={t("section.why")}
          lead={lang === "ru" ? "Клиника работает с 2010 года. Внимательный подход, современное оборудование и команда, которая постоянно учится." :
                (lang === "en" ? "We have been operating since 2010. A thoughtful approach, modern equipment and a team that keeps learning." :
                  "Mēs strādājam kopš 2010. gada. Saudzīga pieeja, mūsdienīgs aprīkojums un komanda, kas pastāvīgi mācās.")}
        />
        <div data-reveal className="grid grid-4">
          {items.map(it => (
            <div key={it.k} style={{ padding: 0 }}>
              <div className="feat-icon lg" style={{ marginBottom: 18 }}><it.Icon size={26}/></div>
              <h3 className="h3" style={{ marginBottom: 8 }}>{t("why." + it.k)}</h3>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6 }}>{t("why." + it.k + ".d")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Tech ============== */
function TechSection() {
  const { t, lang } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-12" style={{ gap: 56, alignItems: "start" }}>
          <div className="col-5" data-reveal style={{ position: "sticky", top: 110 }}>
            <span className="chip"><IconSparkle size={14}/>{lang === "ru" ? "Оборудование" : (lang === "en" ? "Equipment" : "Aprīkojums")}</span>
            <h2 className="h1" style={{ marginTop: 16 }}>{t("section.tech")}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("section.tech.lead")}</p>

            <div className="img-ph" style={{ aspectRatio: "4/3", borderRadius: "var(--radius-lg)", marginTop: 32 }}>
              <span className="img-ph-label">
                {lang === "ru" ? "Кабинет · 4:3" : (lang === "en" ? "Cabinet · 4:3" : "Kabinets · 4:3")}
              </span>
            </div>
          </div>

          <div className="col-7" data-reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {TECH.map((tech, i) => (
                <div key={i} style={{
                  display: "flex", gap: 20, padding: "24px 0",
                  borderBottom: i < TECH.length - 1 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{
                    width: 48, height: 48, flexShrink: 0,
                    borderRadius: 14, background: "var(--brand-soft)", color: "var(--brand-deep)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 14,
                  }}>0{i+1}</div>
                  <div style={{ flex: 1 }}>
                    <h3 className="h3">{tech[lang].name}</h3>
                    <p style={{ color: "var(--ink-2)", marginTop: 8, fontSize: 14.5, lineHeight: 1.55 }}>{tech[lang].desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Team preview ============== */
function TeamPreview({ setRoute }) {
  const { t } = useI18n();
  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <SectionHead
          eyebrow={t("team.eyebrow").toUpperCase()}
          title={t("section.team")}
          lead={t("section.team.lead")}
          action={<button className="btn btn-secondary" onClick={() => setRoute("team")}>{t("nav.team")} <IconArrow size={14}/></button>}
        />
        <div data-reveal className="grid grid-4" style={{ gap: 16 }}>
          {TEAM.map(p => <PersonCard key={p.id} p={p}/>)}
        </div>
      </div>
    </section>
  );
}

function PersonCard({ p, big = false }) {
  const { lang } = useI18n();
  return (
    <article className="card card-hover" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff" }}>
      <div className="img-ph" style={{
        aspectRatio: "4/5", borderRadius: 0, border: "none",
        borderBottom: "1px solid var(--line)",
      }}>
        <span className="img-ph-label">{p.id} · 4:5</span>
      </div>
      <div style={{ padding: 20 }}>
        <h3 className="h3">{p.name}</h3>
        <div style={{ fontSize: 13.5, color: "var(--brand-deep)", marginTop: 4, fontWeight: 500 }}>{p.role[lang]}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
          {p.tags.slice(0, 3).map(tag => (
            <span key={tag} className="chip chip-outline" style={{ fontSize: 12, padding: "5px 10px" }}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ============== Inline booking ============== */
function InlineBookSection({ onBook }) {
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!name.trim()) er.name = t("form.req");
    if (!phone.trim()) er.phone = t("form.req");
    else if (!/^[+0-9()\-\s]{7,}$/.test(phone)) er.phone = t("form.phoneInvalid");
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setTimeout(() => { setDone(true); setName(""); setPhone(""); setNote(""); }, 400);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-12" style={{ gap: 40, alignItems: "stretch" }}>
          <div className="col-5" data-reveal style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="chip"><IconCalendar size={14}/>{t("section.book")}</span>
            <h2 className="h1" style={{ marginTop: 18 }}>
              {lang === "ru" ? "Запишитесь онлайн — мы перезвоним" :
               (lang === "en" ? "Book online — we'll call you back" :
                "Piesakies online — mēs atzvanīsim")}
            </h2>
            <p className="lead" style={{ marginTop: 16 }}>{t("section.book.lead")}</p>

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="feat-icon" style={{ width: 40, height: 40, borderRadius: 12 }}><IconClock size={16}/></span>
                <div style={{ fontSize: 14.5 }}>
                  <strong>{lang === "ru" ? "За 2 часа" : (lang === "en" ? "Within 2 hours" : "2 stundu laikā")}</strong>
                  <span style={{ color: "var(--ink-2)" }}> · {lang === "ru" ? "перезвоним для подтверждения" : (lang === "en" ? "we call to confirm" : "atzvanīsim apstiprināt")}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className="feat-icon" style={{ width: 40, height: 40, borderRadius: 12 }}><IconShield size={16}/></span>
                <div style={{ fontSize: 14.5 }}>
                  <strong>{lang === "ru" ? "7 страховых" : (lang === "en" ? "7 insurers" : "7 apdrošinātāji")}</strong>
                  <span style={{ color: "var(--ink-2)" }}> · {lang === "ru" ? "оплата напрямую" : (lang === "en" ? "direct billing" : "tieši ar polisi")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-7" data-reveal>
            <form className="card card-elev" style={{ padding: 32 }} onSubmit={submit}>
              {done ? (
                <div style={{ textAlign: "center", padding: "32px 20px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                    <IconCheck size={26}/>
                  </div>
                  <div className="h2">{t("form.success")}</div>
                  <button className="btn btn-secondary" type="button" onClick={() => setDone(false)} style={{ marginTop: 22 }}>
                    {lang === "ru" ? "Отправить ещё" : (lang === "en" ? "Send another" : "Sūtīt vēlreiz")}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="h2" style={{ marginBottom: 8 }}>{lang === "ru" ? "Быстрая запись" : (lang === "en" ? "Quick booking" : "Ātrā pieteikšanās")}</h3>
                  <p className="muted" style={{ marginBottom: 22, fontSize: 14.5 }}>
                    {lang === "ru" ? "Имя и телефон — остальное подберём в звонке." :
                     (lang === "en" ? "Name and phone — the rest we figure out by call." :
                      "Vārds un telefons — pārējo izlemsim zvanā.")}
                  </p>
                  <div className="grid grid-2" style={{ gap: 14 }}>
                    <Field label={t("form.name") + " *"} error={errors.name}>
                      <TextInput value={name} onChange={setName} error={errors.name} placeholder="Jānis Bērziņš"/>
                    </Field>
                    <Field label={t("form.phone") + " *"} error={errors.phone}>
                      <TextInput value={phone} onChange={setPhone} error={errors.phone} placeholder="+371 …" type="tel"/>
                    </Field>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <Field label={t("form.note")}>
                      <TextArea value={note} onChange={setNote} placeholder={lang === "ru" ? "Опишите проблему или удобное время…" : (lang === "en" ? "Describe the issue or a convenient time…" : "Apraksti problēmu vai ērtu laiku…")}/>
                    </Field>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, flexWrap: "wrap", gap: 12 }}>
                    <button type="button" onClick={onBook} className="link" style={{ fontSize: 13.5 }}>
                      {lang === "ru" ? "Открыть полную форму" : (lang === "en" ? "Open full form" : "Atvērt pilno formu")}
                    </button>
                    <button className="btn btn-primary" type="submit">{t("form.submit")} <IconArrow size={14}/></button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Reviews ============== */
function ReviewsSection() {
  const { t, lang } = useI18n();
  const [idx, setIdx] = useState(0);
  const max = REVIEWS.length;
  const prev = () => setIdx((idx - 1 + max) % max);
  const next = () => setIdx((idx + 1) % max);
  useEffect(() => {
    const tm = setInterval(next, 6500);
    return () => clearInterval(tm);
  });
  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <SectionHead
          eyebrow={(lang === "ru" ? "ОТЗЫВЫ" : (lang === "en" ? "REVIEWS" : "ATSAUKSMES"))}
          title={t("section.reviews")}
          lead={lang === "ru" ? "Что говорят пациенты после визита." : (lang === "en" ? "What patients say after their visit." : "Ko pacienti saka pēc vizītes.")}
          action={
            <div style={{ display: "flex", gap: 6 }}>
              <button className="icon-btn" onClick={prev} aria-label="Previous"><span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><IconArrow size={14}/></span></button>
              <button className="icon-btn" onClick={next} aria-label="Next"><IconArrow size={14}/></button>
            </div>
          }
        />
        <div data-reveal className="grid grid-3" style={{ gap: 16 }}>
          {[idx, (idx + 1) % max, (idx + 2) % max].map((j, k) => {
            const r = REVIEWS[j];
            return (
              <div key={k} className="card" style={{ background: "#fff", display: "flex", flexDirection: "column", gap: 14, padding: 26, minHeight: 220 }}>
                <div style={{ color: "var(--warn)", display: "flex", gap: 2 }}>
                  {Array.from({ length: r.rating }).map((_, i) => <IconStar key={i} size={14}/>)}
                </div>
                <p style={{ flex: 1, color: "var(--ink)", fontSize: 15, lineHeight: 1.55 }}>"{r[lang]}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{r.author[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.author}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.source}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== News ============== */
function NewsSection() {
  const { t, lang } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          eyebrow={(lang === "ru" ? "ЖУРНАЛ" : (lang === "en" ? "JOURNAL" : "ŽURNĀLS"))}
          title={t("section.news")}
          lead={lang === "ru" ? "Новости клиники, технологии и материалы." : (lang === "en" ? "Clinic news, technologies and materials." : "Klīnikas jaunumi, tehnoloģijas un materiāli.")}
          action={<button className="btn btn-secondary">{t("cta.allNews")} <IconArrow size={14}/></button>}
        />
        <div data-reveal className="grid grid-3" style={{ gap: 16 }}>
          {NEWS.map((n, i) => (
            <article key={i} className="card card-hover" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="img-ph" style={{ aspectRatio: "16/10", border: "none", borderRadius: 0, borderBottom: "1px solid var(--line)" }}>
                <span className="img-ph-label">{n.tag.toLowerCase()} · 16:10</span>
              </div>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5, color: "var(--ink-3)" }}>
                  <span>{n.date}</span>
                  <span className="chip chip-outline" style={{ fontSize: 11, padding: "3px 9px" }}>{n.tag}</span>
                </div>
                <h3 className="h3">{n[lang].title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, flex: 1 }}>{n[lang].body}</p>
                <button className="link" style={{ alignSelf: "flex-start", fontSize: 13.5 }}>{t("cta.readMore")}</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== FAQ ============== */
function FAQSection() {
  const { t, lang } = useI18n();
  const items = FAQ.map(f => ({ q: f.q[lang], a: f.a[lang] }));
  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="container">
        <div className="grid grid-12" style={{ gap: 48, alignItems: "start" }}>
          <div className="col-5" data-reveal>
            <span className="chip">FAQ</span>
            <h2 className="h1" style={{ marginTop: 16 }}>
              {lang === "ru" ? "Часто задаваемые вопросы" : (lang === "en" ? "Frequently asked questions" : "Bieži uzdotie jautājumi")}
            </h2>
            <p className="lead" style={{ marginTop: 14 }}>
              {lang === "ru" ? "Не нашли ответ? Позвоните — отвечаем по будням с 09:00 до 19:00." :
               (lang === "en" ? "Didn't find your answer? Call us — Mon-Fri 09:00 – 19:00." :
                "Neatradi atbildi? Zvani — P-Pk 09:00 – 19:00.")}
            </p>
            <a href={`tel:${t("phone1").replace(/\s/g,"")}`} className="btn btn-soft" style={{ marginTop: 22 }}>
              <IconPhone size={14}/> {t("phone1")}
            </a>
          </div>
          <div className="col-7" data-reveal>
            <Accordion items={items}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Contacts teaser ============== */
function ContactsTeaser({ setRoute }) {
  const { t, lang } = useI18n();
  return (
    <section className="section-sm">
      <div className="container">
        <div className="card card-elev" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 24 }}>
          <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-deep) 100%)", color: "#fff" }}>
            <h2 className="h1" style={{ color: "#fff" }}>
              {lang === "ru" ? "Заходите в гости." : (lang === "en" ? "Come pay us a visit." : "Atnāc ciemos.")}
            </h2>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.85)", maxWidth: "36ch", lineHeight: 1.55 }}>
              {lang === "ru" ? "Мы в Риге, ул. Дзеню 7. Удобный подъезд и парковка." :
               (lang === "en" ? "We're in Riga, Dzeņu 7. Easy access and parking." :
                "Esam Rīgā, Dzeņu 7. Ērta piekļuve un stāvvieta.")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5, marginTop: 4 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><IconMapPin size={16}/> {t("address")}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><IconPhone size={16}/> {t("phone1")}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}><IconClock size={16}/> {t("hours")}</div>
            </div>
            <div style={{ marginTop: 14 }}>
              <button className="btn" onClick={() => setRoute("contacts")} style={{ background: "#fff", color: "var(--brand-deep)" }}>
                {t("nav.contacts")} <IconArrow size={14}/>
              </button>
            </div>
          </div>
          <div style={{ position: "relative", minHeight: 320 }}>
            <MapBlock noRadius/>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapBlock({ noRadius = false }) {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 320, position: "relative", background: "var(--bg-tint)", borderRadius: noRadius ? 0 : "var(--radius-lg)", overflow: "hidden" }}>
      <svg viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-label="Map">
        <defs>
          <pattern id="gp" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 L0 0 0 40" fill="none" stroke="rgba(27,176,206,.08)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="var(--bg-tint)"/>
        <rect width="500" height="400" fill="url(#gp)"/>
        <path d="M-20 230 C 100 200, 180 280, 280 250 S 460 220, 540 240 L 540 280 C 460 260, 380 320, 280 290 S 100 240, -20 270 Z" fill="rgba(27,176,206,.18)"/>
        <path d="M0 120 L 500 140" stroke="rgba(27,42,58,.10)" strokeWidth="2" fill="none"/>
        <path d="M0 320 L 500 300" stroke="rgba(27,42,58,.10)" strokeWidth="2" fill="none"/>
        <path d="M200 0 L 220 400" stroke="rgba(27,42,58,.10)" strokeWidth="2" fill="none"/>
        <path d="M380 0 L 360 400" stroke="rgba(27,42,58,.10)" strokeWidth="2" fill="none"/>
        {Array.from({length:18}).map((_,i) => {
          const x = 30 + (i%6)*78;
          const y = 30 + Math.floor(i/6)*120;
          return <rect key={i} x={x} y={y} width="54" height="40" rx="4" fill="rgba(255,255,255,.5)"/>;
        })}
        <g transform="translate(258,210)">
          <circle r="38" fill="rgba(27,176,206,.22)"/>
          <circle r="20" fill="var(--brand)"/>
          <circle r="7" fill="#fff"/>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 16, bottom: 16, background: "#fff", padding: "10px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, boxShadow: "var(--shadow-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
        <IconMapPin size={14}/> Dzeņu 7/1-97 · Rīga
      </div>
    </div>
  );
}


/* ============== SERVICES page ============== */
function ServicesPage({ onBook, setRoute }) {
  useReveal();
  const { t, lang } = useI18n();
  const [active, setActive] = useState(SERVICES[0].id);
  const svc = SERVICES.find(s => s.id === active);
  const Ico = SERVICE_ICONS[svc.id] || IconTooth;
  return (
    <>
      <PageHero eyebrow={t("services.eyebrow")} title={t("services.title")} lead={t("services.lead")}/>
      <section className="section">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 40, alignItems: "start" }}>
            <aside className="col-4" data-reveal style={{ position: "sticky", top: 100 }}>
              <div className="card" style={{ padding: 8, background: "var(--bg-soft)", border: "1px solid var(--line)" }}>
                {SERVICES.map((s, i) => {
                  const sel = active === s.id;
                  const SI = SERVICE_ICONS[s.id] || IconTooth;
                  return (
                    <button key={s.id} onClick={() => setActive(s.id)}
                      style={{
                        width: "100%", textAlign: "left",
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 14px", borderRadius: 12,
                        background: sel ? "#fff" : "transparent",
                        color: sel ? "var(--brand-deep)" : "var(--ink-2)",
                        boxShadow: sel ? "var(--shadow-1)" : "none",
                        fontWeight: sel ? 600 : 500, fontSize: 15,
                        transition: "all .15s",
                      }}>
                      <span style={{ width: 32, height: 32, borderRadius: 10, background: sel ? "var(--brand-soft)" : "transparent", color: sel ? "var(--brand-deep)" : "var(--ink-3)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <SI size={16}/>
                      </span>
                      <span style={{ flex: 1 }}>{s[lang].name}</span>
                      {sel && <IconArrow size={14}/>}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="col-8" data-reveal key={active}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="feat-icon"><Ico size={22}/></div>
                <span className="chip">{t("form.from")} {svc.priceFrom} €</span>
              </div>
              <h2 className="h1" style={{ marginTop: 18, maxWidth: "22ch" }}>{svc[lang].name}</h2>
              <p className="lead" style={{ marginTop: 16 }}>{svc[lang].long}</p>

              <div className="img-ph" style={{ aspectRatio: "16/9", marginTop: 32, borderRadius: "var(--radius-lg)" }}>
                <span className="img-ph-label">{svc.id} · 16:9</span>
              </div>

              <div className="grid grid-2" style={{ marginTop: 28, gap: 0 }}>
                {svc[lang].bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: i < 2 ? "none" : "1px solid var(--line)" }}>
                    <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IconCheck size={14}/>
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                  </div>
                ))}
              </div>

              <div className="card card-elev" style={{ marginTop: 36, padding: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", background: "var(--bg-soft)" }}>
                <div>
                  <div className="eyebrow">{t("form.priceFrom")}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>{svc.priceFrom} €</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-secondary" onClick={() => setRoute("pricing")}>{t("cta.viewPricing")}</button>
                  <button className="btn btn-primary" onClick={onBook}>{t("cta.book")} <IconArrow size={14}/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============== Page hero ============== */
function PageHero({ eyebrow, title, lead }) {
  return (
    <section style={{ padding: "56px 0 32px", background: "var(--bg-soft)", borderBottom: "1px solid var(--line)" }} data-reveal>
      <div className="container">
        <span className="chip"><span className="chip-dot"></span>{eyebrow}</span>
        <h1 className="h-display" style={{ marginTop: 18, maxWidth: "18ch" }}>{title}</h1>
        {lead && <p className="lead" style={{ marginTop: 18, maxWidth: "52ch" }}>{lead}</p>}
      </div>
    </section>
  );
}

/* ============== TEAM page ============== */
function TeamPage({ onBook }) {
  useReveal();
  const { t, lang } = useI18n();
  return (
    <>
      <PageHero eyebrow={t("team.eyebrow")} title={t("team.title")} lead={t("team.lead")}/>
      <section className="section">
        <div className="container">
          <div className="grid grid-3" style={{ gap: 32 }} data-reveal>
            {TEAM.map(p => (
              <article key={p.id} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="img-ph" style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }}>
                  <span className="img-ph-label">{p.id} · 4:5</span>
                </div>
                <div>
                  <div className="eyebrow">{p.role[lang]} · {2026 - p.since} {t("yearsClinic")}</div>
                  <h3 className="h2" style={{ marginTop: 8 }}>{p.name}</h3>
                  <p style={{ color: "var(--ink-2)", lineHeight: 1.6, marginTop: 12, fontSize: 15 }}>{p.bio[lang]}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                    {p.tags.map(tag => (
                      <span key={tag} className="chip chip-outline" style={{ fontSize: 12 }}>{tag}</span>
                    ))}
                  </div>
                  <button className="btn btn-soft btn-sm" onClick={onBook} style={{ marginTop: 20 }}>
                    {t("cta.book")} <IconArrow size={12}/>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ============== PRICING page ============== */
function PricingPage({ onBook }) {
  useReveal();
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState(0);

  const filtered = useMemo(() => {
    if (!q.trim()) return PRICING;
    const qq = q.toLowerCase();
    return PRICING.map(c => ({
      ...c,
      items: c.items.filter(it => it[lang].toLowerCase().includes(qq) || it.price.toLowerCase().includes(qq))
    })).filter(c => c.items.length > 0);
  }, [q, lang]);

  return (
    <>
      <PageHero eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} lead={t("pricing.lead")}/>

      <section className="section">
        <div className="container">
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)" }}>
                <IconSearch size={16}/>
              </span>
              <input className="input" placeholder={t("search.placeholder")} value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 40 }}/>
            </div>
            <button className="btn btn-primary" onClick={onBook}>{t("cta.book")} <IconArrow size={14}/></button>
          </div>

          {/* category chips */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {PRICING.map((c, i) => (
              <button key={i} onClick={() => { setActiveCat(i); document.getElementById("cat-"+i)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                style={{
                  padding: "8px 14px", borderRadius: 999,
                  border: "1px solid " + (activeCat === i ? "var(--brand)" : "var(--line-2)"),
                  background: activeCat === i ? "var(--brand-soft)" : "#fff",
                  color: activeCat === i ? "var(--brand-deep)" : "var(--ink-2)",
                  fontSize: 13, fontWeight: 600, transition: "all .15s",
                }}>
                {c.cat[lang]}
              </button>
            ))}
          </div>

          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {filtered.map((c, i) => (
              <div key={i} id={"cat-"+i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 14, borderBottom: "2px solid var(--brand)", marginBottom: 4 }}>
                  <h3 className="h2">{c.cat[lang]}</h3>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{c.items.length} {lang === "ru" ? "позиций" : (lang === "en" ? "items" : "vienības")}</span>
                </div>
                <ul>
                  {c.items.map((it, j) => (
                    <li key={j} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", alignItems: "baseline" }}>
                      <span style={{ fontSize: 15 }}>{it[lang]}</span>
                      <span style={{ fontWeight: 700, color: "var(--brand-deep)", whiteSpace: "nowrap", fontSize: 15 }}>{it.price} €</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 40, color: "var(--ink-3)" }}>
                {lang === "ru" ? "Ничего не найдено" : (lang === "en" ? "Nothing found" : "Nekas nav atrasts")}
              </div>
            )}
          </div>

          <div className="card" style={{ marginTop: 48, padding: 22, background: "var(--bg-soft)", border: "1px solid var(--line)", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div className="feat-icon" style={{ width: 40, height: 40, borderRadius: 12 }}><IconShield size={16}/></div>
            <div style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{t("pricing.note")}</div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============== CONTACTS page ============== */
function ContactsPage({ onBook }) {
  useReveal();
  const { t, lang } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!name.trim()) er.name = t("form.req");
    if (!email.trim()) er.email = t("form.req");
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) er.email = t("form.emailInvalid");
    if (!msg.trim()) er.msg = t("form.req");
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setTimeout(() => { setDone(true); setName(""); setEmail(""); setMsg(""); }, 400);
    }
  }
  return (
    <>
      <PageHero eyebrow={t("contacts.eyebrow")} title={t("contacts.title")} lead={t("contacts.lead")}/>

      <section className="section">
        <div className="container">
          <div className="grid grid-12" style={{ gap: 40 }}>
            <div className="col-5" data-reveal>
              <MapBlock/>
              <div style={{ marginTop: 28, display: "grid", gap: 18 }}>
                <ContactRow Icon={IconMapPin} label={t("section.contacts")} value={t("address")}/>
                <ContactRow Icon={IconPhone} label={lang === "ru" ? "Телефоны" : "Phones"} value={
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <a className="link" href="tel:+37129113584">{t("phone1")}</a>
                    <a className="link" href="tel:+37167520259">{t("phone2")}</a>
                  </div>
                }/>
                <ContactRow Icon={IconMail} label="E-mail" value={<a className="link" href="mailto:info@dentalseptini.lv">info@dentalseptini.lv</a>}/>
                <ContactRow Icon={IconClock} label={lang === "ru" ? "Часы работы" : (lang === "en" ? "Hours" : "Darba laiks")} value={t("hours")}/>
                <ContactRow Icon={IconShield} label={lang === "ru" ? "Реквизиты" : (lang === "en" ? "Legal" : "Rekvizīti")} value={
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)" }}>
                    DENTAL SEPTIŅI<br/>
                    {lang === "ru" ? "Рег. №" : "Reg. №"} 40203117924<br/>
                    LV28HABA0551044568976
                  </div>
                }/>
              </div>
            </div>

            <div className="col-7" data-reveal>
              <div className="card card-elev" style={{ padding: 32 }}>
                <h2 className="h2">{lang === "ru" ? "Напишите нам" : (lang === "en" ? "Write to us" : "Raksti mums")}</h2>
                <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
                  {lang === "ru" ? "Ответим в течение одного рабочего дня." : (lang === "en" ? "We'll reply within one business day." : "Atbildēsim viena darba dienas laikā.")}
                </p>

                {done ? (
                  <div style={{ marginTop: 28, padding: "32px 20px", textAlign: "center" }}>
                    <div style={{ width: 60, height: 60, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><IconCheck size={24}/></div>
                    <div className="h2">{t("form.success")}</div>
                    <button className="btn btn-secondary" type="button" onClick={() => setDone(false)} style={{ marginTop: 18 }}>
                      {lang === "ru" ? "Отправить ещё" : (lang === "en" ? "Send another" : "Sūtīt vēlreiz")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="grid grid-2" style={{ gap: 14 }}>
                      <Field label={t("form.name") + " *"} error={errors.name}>
                        <TextInput value={name} onChange={setName} error={errors.name}/>
                      </Field>
                      <Field label={t("form.email") + " *"} error={errors.email}>
                        <TextInput value={email} onChange={setEmail} error={errors.email} type="email"/>
                      </Field>
                    </div>
                    <Field label={lang === "ru" ? "Сообщение *" : (lang === "en" ? "Message *" : "Ziņojums *")} error={errors.msg}>
                      <TextArea value={msg} onChange={setMsg} error={errors.msg}/>
                    </Field>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
                      <button type="button" className="link" onClick={onBook} style={{ fontSize: 13.5 }}>
                        {lang === "ru" ? "Или запишитесь онлайн" : (lang === "en" ? "Or book online" : "Vai piesakies online")}
                      </button>
                      <button type="submit" className="btn btn-primary">
                        {lang === "ru" ? "Отправить" : (lang === "en" ? "Send" : "Sūtīt")} <IconArrow size={14}/>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ Icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: 14, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
      <div className="feat-icon" style={{ width: 40, height: 40, borderRadius: 12 }}><Icon size={16}/></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 14.5, color: "var(--ink)" }}>{value}</div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, ServicesPage, TeamPage, PricingPage, ContactsPage });
