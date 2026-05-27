/* DentalSeptiņi — pages (Home, Services, Team, Pricing, Contacts) */

/* ============== HOME ============== */
function HomePage({ onBook, setRoute }) {
  useReveal();
  const { t, lang } = useI18n();
  return (
    <>
      <Hero onBook={onBook} setRoute={setRoute}/>
      <InsurerStrip/>
      <ServicesSection setRoute={setRoute} onBook={onBook}/>
      <WhySection/>
      <FounderSection onBook={onBook}/>
      <TechSection/>
      <TeamPreview setRoute={setRoute}/>
      <ReviewsSection/>
      <BookSection onBook={onBook}/>
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
    <section style={{ paddingTop: 56, paddingBottom: 64, position: "relative", overflow: "hidden" }}>
      <div className="container-wide">
        <div data-reveal style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <span className="tag">· {t("hero.eyebrow")}</span>
        </div>

        <div className="grid grid-12" style={{ gap: 32, alignItems: "end" }}>
          <div style={{ gridColumn: "span 8" }}>
            <h1 data-reveal className="display-1" style={{ marginTop: 0 }}>
              {t("hero.title1")}<br/>
              <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>{t("hero.title2")}</em>
            </h1>
          </div>
          <div style={{ gridColumn: "span 4" }}>
            <p data-reveal style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.55, maxWidth: "38ch" }}>
              {t("hero.lead")}
            </p>
            <div data-reveal style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={onBook}>{t("cta.book")} <ArrowRight/></button>
              <button className="btn btn-ghost btn-lg" onClick={() => setRoute("services")}>{t("cta.allServices")}</button>
            </div>
          </div>
        </div>

        {/* Hero composition */}
        <div data-reveal className="grid grid-12" style={{ marginTop: 56, gap: 16, alignItems: "stretch" }}>
          {/* Main image — Dr. Gražina */}
          <div style={{ gridColumn: "span 7" }}>
            <div className="img-ph" style={{ aspectRatio: "16/10", borderRadius: "var(--radius-lg)", height: "100%", minHeight: 360 }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28 }}>
                <span className="tag ink" style={{ alignSelf: "flex-start" }}>· Founder</span>
                <div style={{ color: "var(--ink)" }}>
                  <div className="display-3" style={{ fontStyle: "italic" }}>Dr. Gražina Šandroha</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 6, color: "var(--ink-2)" }}>
                    {lang === "ru" ? "Стоматолог · с 1993" : (lang === "en" ? "Dentist · since 1993" : "Zobārste · kopš 1993")}
                  </div>
                </div>
              </div>
              <span style={{ position: "absolute", bottom: 18, right: 22, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>[ portrait · 16:10 ]</span>
            </div>
          </div>

          {/* Side column: stats stack */}
          <div style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card" style={{ background: "var(--ink)", color: "var(--bg)", borderColor: "transparent", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 160 }}>
              <span className="eyebrow" style={{ color: "rgba(255,255,255,.5)" }}>· {t("hero.acute")}</span>
              <div>
                <div className="display-2" style={{ color: "var(--bg)" }}>+371 291 135 84</div>
                <a className="ulink" href="tel:+37129113584" style={{ color: "var(--accent)", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                  <Phone/> {t("cta.call")}
                </a>
              </div>
            </div>

            <div className="grid grid-3" style={{ gap: 8 }}>
              <StatCard num="16" label={t("hero.years")}/>
              <StatCard num="4" label={t("hero.docs")}/>
              <StatCard num="7" label={t("hero.insurers")}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="card" style={{ background: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "space-between", aspectRatio: "1/1" }}>
      <span className="dot"></span>
      <div>
        <div className="display-3" style={{ fontFamily: "var(--font-serif)" }}>{num}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".12em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
      </div>
    </div>
  );
}

/* ============== Services ============== */
function ServicesSection({ setRoute, onBook }) {
  const { t, lang } = useI18n();
  return (
    <section className="section-pad">
      <div className="container-wide">
        <SectionHead
          eyebrow={t("services.eyebrow")}
          title={t("section.services")}
          lead={t("section.services.lead")}
          action={
            <button className="btn btn-ghost" onClick={() => setRoute("services")}>
              {t("cta.allServices")} <ArrowRight/>
            </button>
          }
        />
        <div data-reveal className="grid grid-4" style={{ gap: 12 }}>
          {SERVICES.slice(0, 8).map((s, i) => (
            <ServiceCard key={s.id} svc={s} index={i+1} onBook={onBook}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, index, onBook }) {
  const { t, lang } = useI18n();
  return (
    <div className="card card-hover" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", aspectRatio: "1/1.05", minHeight: 240, padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".1em" }}>0{index}</span>
        <span style={{ width: 36, height: 36, borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-serif)", fontSize: 18, fontStyle: "italic" }}>
          {svc.icon}
        </span>
      </div>
      <div>
        <h3 className="display-3" style={{ fontSize: 22, lineHeight: 1.1 }}>{svc[lang].name}</h3>
        <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 13.5, lineHeight: 1.5 }}>{svc[lang].short}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".08em", textTransform: "uppercase" }}>{t("form.from")} {svc.priceFrom} €</span>
        <button onClick={onBook} className="ulink" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}>
          {t("cta.bookShort")} <ArrowRight size={12}/>
        </button>
      </div>
    </div>
  );
}

/* ============== Why ============== */
function WhySection() {
  const { t } = useI18n();
  const items = [
    { k: "exp", icon: "20+" },
    { k: "tech", icon: "✦" },
    { k: "team", icon: "◷" },
    { k: "warranty", icon: "5y" },
    { k: "lang", icon: "Aa" },
    { k: "acute", icon: "24" },
  ];
  return (
    <section className="section-pad" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="container-wide">
        <SectionHead eyebrow={t("section.why").toUpperCase().slice(0,16)} title={t("section.why")} lead={undefined} />
        <div data-reveal className="grid grid-3">
          {items.map((it, i) => (
            <div key={it.k} style={{ padding: 28, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 14, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".1em" }}>0{i+1}</span>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontStyle: "italic", color: "var(--accent-deep)" }}>{it.icon}</span>
              </div>
              <h3 className="display-3" style={{ fontSize: 24 }}>{t("why." + it.k)}</h3>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.55, fontSize: 14.5 }}>{t("why." + it.k + ".d")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Founder section ============== */
function FounderSection({ onBook }) {
  const { t, lang } = useI18n();
  return (
    <section className="section-pad-sm">
      <div className="container-wide">
        <div className="grid grid-12" style={{ gap: 32, alignItems: "center" }}>
          <div style={{ gridColumn: "span 5" }} data-reveal>
            <div className="img-ph warm" style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }}>
              <span style={{ position: "absolute", bottom: 16, left: 18, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>[ clinic interior · 4:5 ]</span>
            </div>
          </div>
          <div style={{ gridColumn: "span 7" }} data-reveal>
            <span className="eyebrow">· {lang === "ru" ? "О клинике" : (lang === "en" ? "About the clinic" : "Par klīniku")}</span>
            <h2 className="display-2" style={{ marginTop: 12 }}>
              {lang === "ru" && <>Клиника <em style={{ fontStyle: "italic" }}>с человеческим</em> отношением.</>}
              {lang === "en" && <>A clinic with a <em style={{ fontStyle: "italic" }}>human</em> touch.</>}
              {lang === "lv" && <>Klīnika ar <em style={{ fontStyle: "italic" }}>cilvēcīgu</em> pieskārienu.</>}
            </h2>
            <p style={{ marginTop: 18, color: "var(--ink-2)", maxWidth: "52ch", fontSize: 17, lineHeight: 1.6 }}>
              {lang === "ru" && "Мы работаем с 2010 года. В клинике приём ведут только сертифицированные специалисты, которые регулярно повышают квалификацию и применяют новые методы лечения."}
              {lang === "en" && "We have been operating since 2010. Only certified specialists work in our clinic — they continuously improve their qualifications and apply the latest treatment methods."}
              {lang === "lv" && "Mēs strādājam kopš 2010. gada. Klīnikā pieņem tikai sertificēti speciālisti, kuri pastāvīgi paaugstina savu kvalifikācijas līmeni un izmanto jaunākās ārstēšanas metodes."}
            </p>
            <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap" }}>
              <Fact num="2010" label={lang === "ru" ? "Год основания" : (lang === "en" ? "Founded" : "Dibināta")}/>
              <Fact num="∞" label={lang === "ru" ? "Кофе бесплатно" : (lang === "en" ? "Free coffee" : "Bezmaksas kafija")}/>
              <Fact num="♿" label={lang === "ru" ? "Доступная среда" : (lang === "en" ? "Accessible" : "Pieejamība")}/>
            </div>
            <button className="btn btn-secondary" onClick={onBook} style={{ marginTop: 28 }}>{t("cta.book")} <ArrowRight/></button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Fact({ num, label }) {
  return (
    <div>
      <div className="display-3" style={{ fontFamily: "var(--font-serif)" }}>{num}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em", color: "var(--ink-3)", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
    </div>
  );
}

/* ============== Tech ============== */
function TechSection() {
  const { t, lang } = useI18n();
  return (
    <section className="section-pad" style={{ background: "var(--accent-soft)" }}>
      <div className="container-wide">
        <SectionHead eyebrow="Equipment" title={t("section.tech")} lead={t("section.tech.lead")}/>
        <div data-reveal className="grid grid-3">
          {TECH.map((tech, i) => (
            <div key={i} style={{ padding: "22px 0", borderTop: "1px solid var(--line-2)", display: "flex", gap: 16 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-3)", letterSpacing: ".08em", minWidth: 28 }}>0{i+1}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em", lineHeight: 1.15 }}>{tech[lang].name}</h3>
                <p style={{ marginTop: 8, color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55 }}>{tech[lang].desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Team preview ============== */
function TeamPreview({ setRoute }) {
  const { t, lang } = useI18n();
  return (
    <section className="section-pad">
      <div className="container-wide">
        <SectionHead
          eyebrow={t("team.eyebrow")}
          title={t("section.team")}
          lead={t("section.team.lead")}
          action={<button className="btn btn-ghost" onClick={() => setRoute("team")}>{t("nav.team")} <ArrowRight/></button>}
        />
        <div data-reveal className="grid grid-4" style={{ gap: 16 }}>
          {TEAM.map((p, i) => (
            <PersonCard key={p.id} p={p} index={i}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonCard({ p, index, big = false }) {
  const { t, lang } = useI18n();
  return (
    <div className="card-hover" style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="img-ph" style={{ aspectRatio: big ? "4/5" : "4/5", borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none", minHeight: big ? 360 : 240 }}>
        <span style={{ fontSize: 11 }}>[ {p.id} · 4:5 ]</span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase" }}>{p.role[lang]}</div>
        <h3 className="display-3" style={{ fontSize: 22, marginTop: 6 }}>{p.name}</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
          {p.tags.slice(0,3).map(tag => (
            <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em", padding: "3px 8px", border: "1px solid var(--line-2)", borderRadius: 999 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============== Reviews ============== */
function ReviewsSection() {
  const { t, lang } = useI18n();
  const [idx, setIdx] = useState(0);
  const max = REVIEWS.length;
  const prev = () => setIdx((idx - 1 + max) % max);
  const next = () => setIdx((idx + 1) % max);
  const r = REVIEWS[idx];
  useEffect(() => {
    const tm = setInterval(next, 6500);
    return () => clearInterval(tm);
  });
  return (
    <section className="section-pad" style={{ background: "var(--ink)", color: "var(--bg)" }}>
      <div className="container-wide">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="eyebrow" style={{ color: "rgba(255,255,255,.55)" }}>· {t("section.reviews")}</div>
            <h2 className="display-2" style={{ color: "var(--bg)", marginTop: 12, maxWidth: "20ch" }}>{t("section.reviews")}.</h2>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="icon-btn" onClick={prev} aria-label="Previous" style={{ borderColor: "rgba(255,255,255,.2)", color: "var(--bg)" }}>
              <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}><ArrowRight size={14}/></span>
            </button>
            <button className="icon-btn" onClick={next} aria-label="Next" style={{ borderColor: "rgba(255,255,255,.2)", color: "var(--bg)" }}>
              <ArrowRight size={14}/>
            </button>
          </div>
        </div>

        <div className="grid grid-12" style={{ alignItems: "start", gap: 32 }}>
          <div style={{ gridColumn: "span 8", minHeight: 220 }}>
            <div style={{ color: "var(--accent)", display: "flex", gap: 2, marginBottom: 18 }}>
              {Array.from({length: r.rating}).map((_,i) => <Star key={i} size={16}/>)}
            </div>
            <p className="serif" style={{ fontSize: "clamp(24px, 2.4vw, 36px)", lineHeight: 1.25, letterSpacing: "-0.01em", fontStyle: "italic" }}>
              "{r[lang]}"
            </p>
            <div style={{ marginTop: 24, fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,.6)", letterSpacing: ".08em", textTransform: "uppercase" }}>
              {r.author} · {r.source}
            </div>
          </div>
          <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 8 }}>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ textAlign: "left", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", gap: 14, alignItems: "center", color: i === idx ? "var(--bg)" : "rgba(255,255,255,.45)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em" }}>0{i+1}</span>
                <span style={{ fontSize: 13 }}>{REVIEWS[i].author}</span>
                <span style={{ marginLeft: "auto", width: 30, height: 1, background: i === idx ? "var(--accent)" : "rgba(255,255,255,.2)" }}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Inline booking section ============== */
function BookSection({ onBook }) {
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
    <section className="section-pad" id="book">
      <div className="container-wide">
        <div className="grid grid-12" style={{ gap: 32, alignItems: "start" }}>
          <div style={{ gridColumn: "span 5" }} data-reveal>
            <span className="eyebrow">· {t("section.book")}</span>
            <h2 className="display-2" style={{ marginTop: 12 }}>
              {lang === "ru" && <>Запись на <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>визит</em>.</>}
              {lang === "en" && <>Book your <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>visit</em>.</>}
              {lang === "lv" && <>Pieteikties <em style={{ fontStyle: "italic", color: "var(--accent-deep)" }}>vizītei</em>.</>}
            </h2>
            <p style={{ color: "var(--ink-2)", marginTop: 16, fontSize: 16, lineHeight: 1.55, maxWidth: "40ch" }}>
              {t("section.book.lead")}
            </p>
            <button className="btn btn-secondary" onClick={onBook} style={{ marginTop: 22 }}>
              {lang === "ru" ? "Открыть полную форму" : (lang === "en" ? "Open full form" : "Atvērt pilno formu")} <ArrowRight/>
            </button>
            <div style={{ marginTop: 32, padding: 22, background: "var(--accent-soft)", borderRadius: "var(--radius)" }}>
              <span className="eyebrow">· {t("acuteBanner")}</span>
              <div style={{ marginTop: 8 }}>
                <a className="ulink display-3" href={`tel:${t("phone1").replace(/\s/g,"")}`} style={{ fontStyle: "italic", color: "var(--ink)" }}>{t("phone1")}</a>
              </div>
            </div>
          </div>

          <form style={{ gridColumn: "span 7" }} className="card" onSubmit={submit} data-reveal>
            {done ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Check size={22}/>
                </div>
                <div className="display-3">{t("form.success")}</div>
                <button className="btn btn-ghost" type="button" onClick={() => setDone(false)} style={{ marginTop: 18 }}>
                  {lang === "ru" ? "Отправить ещё одну" : (lang === "en" ? "Send another" : "Sūtīt vēlreiz")}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-2">
                  <Field label={t("form.name") + " *"} error={errors.name}>
                    <TextInput value={name} onChange={setName} error={errors.name} placeholder="Jānis Bērziņš"/>
                  </Field>
                  <Field label={t("form.phone") + " *"} error={errors.phone}>
                    <TextInput value={phone} onChange={setPhone} error={errors.phone} placeholder="+371 …" type="tel"/>
                  </Field>
                </div>
                <Field label={t("form.note")}>
                  <TextArea value={note} onChange={setNote} placeholder={lang === "ru" ? "Опишите проблему или удобное время…" : (lang === "en" ? "Describe the issue or a convenient time…" : "Apraksti problēmu vai ērtu laiku…")}/>
                </Field>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--font-mono)", letterSpacing: ".06em" }}>
                    {lang === "ru" ? "Перезвоним в течение 2 часов" : (lang === "en" ? "We'll call back within 2 hours" : "Atzvanīsim 2 stundu laikā")}
                  </div>
                  <button className="btn btn-primary" type="submit">{t("form.submit")} <ArrowRight/></button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============== News ============== */
function NewsSection() {
  const { t, lang } = useI18n();
  return (
    <section className="section-pad" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
      <div className="container-wide">
        <SectionHead eyebrow="Journal" title={t("section.news")}
          action={<button className="btn btn-ghost">{t("cta.allNews")} <ArrowRight/></button>}/>
        <div data-reveal className="grid grid-3" style={{ gap: 16 }}>
          {NEWS.map((n, i) => (
            <article key={i} className="card-hover" style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="img-ph" style={{ aspectRatio: "4/3", borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none" }}>
                <span>[ {n.tag.toLowerCase()} · 4:3 ]</span>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".08em" }}>
                  <span>{n.date}</span>
                  <span className="tag">· {n.tag}</span>
                </div>
                <h3 className="display-3" style={{ fontSize: 22 }}>{n[lang].title}</h3>
                <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.55, flex: 1 }}>{n[lang].body}</p>
                <button className="ulink" style={{ alignSelf: "flex-start", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}>
                  {t("cta.readMore")} <ArrowRight size={12}/>
                </button>
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
    <section className="section-pad">
      <div className="container-wide">
        <div className="grid grid-12" style={{ gap: 32 }}>
          <div style={{ gridColumn: "span 4" }} data-reveal>
            <span className="eyebrow">· FAQ</span>
            <h2 className="display-2" style={{ marginTop: 12 }}>
              {lang === "ru" && <>Что чаще всего <em style={{ fontStyle: "italic" }}>спрашивают</em>.</>}
              {lang === "en" && <>What patients <em style={{ fontStyle: "italic" }}>ask</em> most.</>}
              {lang === "lv" && <>Visbiežāk <em style={{ fontStyle: "italic" }}>jautā</em>.</>}
            </h2>
            <p style={{ color: "var(--ink-2)", marginTop: 16, lineHeight: 1.55, fontSize: 15 }}>
              {lang === "ru" ? "Не нашли ответ? Позвоните нам — отвечаем по будням с 09:00 до 19:00." :
               (lang === "en" ? "Didn't find your answer? Call us — Mon-Fri 09:00 – 19:00." :
                "Neatradi atbildi? Zvani mums — P-Pk 09:00 – 19:00.")}
            </p>
          </div>
          <div style={{ gridColumn: "span 8" }} data-reveal>
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
    <section className="section-pad-sm" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
      <div className="container-wide">
        <div className="grid grid-12" style={{ alignItems: "center", gap: 32 }}>
          <div style={{ gridColumn: "span 6" }} data-reveal>
            <span className="eyebrow">· {t("contacts.eyebrow")}</span>
            <h2 className="display-2" style={{ marginTop: 12 }}>
              {lang === "ru" && <>Заходите в гости.</>}
              {lang === "en" && <>Come pay us a visit.</>}
              {lang === "lv" && <>Atnāc ciemos.</>}
            </h2>
            <div style={{ display: "flex", gap: 32, marginTop: 22, flexWrap: "wrap", fontSize: 15 }}>
              <ContactItem label={t("section.contacts").toUpperCase()} value={t("address")}/>
              <ContactItem label={lang === "ru" ? "ТЕЛЕФОН" : "PHONE"} value={t("phone1") + " · " + t("phone2")}/>
              <ContactItem label={lang === "ru" ? "ЧАСЫ" : "HOURS"} value={t("hours")}/>
            </div>
            <button className="btn btn-primary" onClick={() => setRoute("contacts")} style={{ marginTop: 24 }}>
              {t("nav.contacts")} <ArrowRight/>
            </button>
          </div>
          <div style={{ gridColumn: "span 6" }} data-reveal>
            <MapBlock/>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "var(--ink-3)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ marginTop: 4 }}>{value}</div>
    </div>
  );
}

function MapBlock() {
  return (
    <div style={{ aspectRatio: "5/4", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--line)", position: "relative", background: "var(--accent-soft)" }}>
      <svg viewBox="0 0 500 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-label="Map placeholder" style={{ display: "block" }}>
        <defs>
          <pattern id="gridP" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(14,26,43,.06)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="var(--accent-soft)"/>
        <rect width="500" height="400" fill="url(#gridP)"/>
        {/* "river" */}
        <path d="M-20 230 C 100 200, 180 280, 280 250 S 460 220, 540 240 L 540 280 C 460 260, 380 320, 280 290 S 100 240, -20 270 Z" fill="rgba(27,176,206,.18)"/>
        {/* "roads" */}
        <path d="M0 120 L 500 140" stroke="rgba(14,26,43,.18)" strokeWidth="2" fill="none"/>
        <path d="M0 320 L 500 300" stroke="rgba(14,26,43,.18)" strokeWidth="2" fill="none"/>
        <path d="M200 0 L 220 400" stroke="rgba(14,26,43,.18)" strokeWidth="2" fill="none"/>
        <path d="M380 0 L 360 400" stroke="rgba(14,26,43,.18)" strokeWidth="2" fill="none"/>
        {/* "blocks" */}
        {Array.from({length:20}).map((_,i) => {
          const x = 30 + (i%5)*95;
          const y = 30 + Math.floor(i/5)*90;
          return <rect key={i} x={x} y={y} width="56" height="40" rx="3" fill="rgba(14,26,43,.05)"/>;
        })}
        {/* marker */}
        <g transform="translate(260,210)">
          <circle r="32" fill="rgba(27,176,206,.18)"/>
          <circle r="16" fill="var(--accent)"/>
          <circle r="6" fill="#fff"/>
        </g>
      </svg>
      <div style={{ position: "absolute", left: 18, bottom: 16, background: "var(--paper)", padding: "10px 14px", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".06em", boxShadow: "var(--shadow-2)" }}>
        Dzeņu 7/1-97 · Rīga
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
  return (
    <>
      <PageHero eyebrow={t("services.eyebrow")} title={t("services.title")} lead={t("services.lead")}/>
      <section style={{ padding: "32px 0 96px" }}>
        <div className="container-wide">
          <div className="grid grid-12" style={{ gap: 32, alignItems: "start" }}>
            <aside style={{ gridColumn: "span 4", position: "sticky", top: 88 }} data-reveal>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 14 }}>· {t("nav.services")}</div>
              <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--line)" }}>
                {SERVICES.map((s, i) => {
                  const sel = active === s.id;
                  return (
                    <button key={s.id} onClick={() => setActive(s.id)}
                      style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "16px 0", borderBottom: "1px solid var(--line)",
                        color: sel ? "var(--ink)" : "var(--ink-3)", transition: "color .15s" }}>
                      <span style={{ display: "flex", gap: 14 }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".08em" }}>0{i+1}</span>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontStyle: sel ? "italic" : "normal" }}>{s[lang].name}</span>
                      </span>
                      {sel && <ArrowRight size={14}/>}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div style={{ gridColumn: "span 8" }} data-reveal key={active}>
              <span className="tag">· {svc.icon} · {t("form.from")} {svc.priceFrom} €</span>
              <h2 className="display-2" style={{ marginTop: 14, maxWidth: "20ch" }}>{svc[lang].name}</h2>
              <p style={{ color: "var(--ink-2)", marginTop: 18, fontSize: 18, lineHeight: 1.55, maxWidth: "52ch" }}>{svc[lang].long}</p>

              <div className="img-ph" style={{ aspectRatio: "16/9", marginTop: 28, borderRadius: "var(--radius-lg)" }}>
                <span>[ {svc.id} · 16:9 ]</span>
              </div>

              <div className="grid grid-2" style={{ marginTop: 28, gap: 16 }}>
                {svc[lang].bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: "1px solid var(--line)" }}>
                    <span style={{ width: 28, height: 28, borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={14}/>
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.45 }}>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 36, padding: 24, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div className="eyebrow">· {t("form.priceFrom")}</div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 36, marginTop: 4 }}>{svc.priceFrom} €</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-ghost" onClick={() => setRoute("pricing")}>{t("cta.viewPricing")}</button>
                  <button className="btn btn-primary" onClick={onBook}>{t("cta.book")} <ArrowRight/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============== Page hero (subpage) ============== */
function PageHero({ eyebrow, title, lead }) {
  return (
    <section style={{ paddingTop: 64, paddingBottom: 48 }} data-reveal>
      <div className="container-wide">
        <div className="eyebrow">· {eyebrow}</div>
        <h1 className="display-1" style={{ marginTop: 18, maxWidth: "16ch", fontSize: "clamp(40px, 5.4vw, 84px)" }}>{title}</h1>
        {lead && <p style={{ color: "var(--ink-2)", fontSize: 18, lineHeight: 1.55, marginTop: 22, maxWidth: "52ch" }}>{lead}</p>}
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
      <section style={{ padding: "32px 0 96px" }}>
        <div className="container-wide">
          <div className="grid grid-3" style={{ gap: 32 }} data-reveal>
            {TEAM.map((p, i) => (
              <article key={p.id} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="img-ph" style={{ aspectRatio: "4/5", borderRadius: "var(--radius-lg)" }}>
                  <span>[ {p.id} · 4:5 ]</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".12em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
                  <span>· {p.role[lang]}</span>
                  <span>{2026 - p.since} {t("yearsClinic")}</span>
                </div>
                <h3 className="display-3" style={{ fontSize: 28 }}>{p.name}</h3>
                <p style={{ color: "var(--ink-2)", lineHeight: 1.6 }}>{p.bio[lang]}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em", padding: "4px 10px", border: "1px solid var(--line-2)", borderRadius: 999 }}>{tag}</span>
                  ))}
                </div>
                <button className="btn btn-secondary btn-sm" onClick={onBook} style={{ alignSelf: "flex-start", marginTop: 4 }}>
                  {t("cta.book")} <ArrowRight size={12}/>
                </button>
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

      <section style={{ padding: "0 0 96px" }}>
        <div className="container-wide">
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
              <input className="input" placeholder={t("search.placeholder")} value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 40 }}/>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-3)" }}>
                <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <button className="btn btn-primary" onClick={onBook}>{t("cta.book")} <ArrowRight/></button>
          </div>

          {/* category chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 32 }}>
            {PRICING.map((c, i) => (
              <button key={i} onClick={() => { setActiveCat(i); document.getElementById("cat-"+i)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid var(--line-2)", background: activeCat === i ? "var(--ink)" : "transparent", color: activeCat === i ? "var(--bg)" : "var(--ink-2)", fontSize: 13, transition: "all .15s" }}>
                {c.cat[lang]}
              </button>
            ))}
          </div>

          <div data-reveal style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {filtered.map((c, i) => (
              <div key={i} id={"cat-"+i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 12, borderBottom: "1px solid var(--ink)", marginBottom: 8 }}>
                  <h3 className="display-3" style={{ fontSize: 30 }}>{c.cat[lang]}</h3>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)" }}>0{i+1} / {PRICING.length}</span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {c.items.map((it, j) => (
                    <li key={j} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--line)", alignItems: "baseline" }}>
                      <span style={{ fontSize: 15.5 }}>{it[lang]}</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>{it.price} €</span>
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

          <div style={{ marginTop: 56, padding: 24, background: "var(--accent-soft)", borderRadius: "var(--radius)", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink)" }}>i</strong> &nbsp; {t("pricing.note")}
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

      <section style={{ padding: "32px 0 96px" }}>
        <div className="container-wide">
          <div className="grid grid-12" style={{ gap: 32 }}>
            <div style={{ gridColumn: "span 5" }} data-reveal>
              <MapBlock/>
              <div style={{ marginTop: 28, display: "grid", gap: 24 }}>
                <ContactRow label={t("section.contacts")} value={t("address")}/>
                <ContactRow label={lang === "ru" ? "Телефоны" : "Phones"} value={
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <a className="ulink" href="tel:+37129113584">{t("phone1")}</a>
                    <a className="ulink" href="tel:+37167520259">{t("phone2")}</a>
                  </div>
                }/>
                <ContactRow label="E-mail" value={<a className="ulink" href="mailto:info@dentalseptini.lv">info@dentalseptini.lv</a>}/>
                <ContactRow label={lang === "ru" ? "Часы работы" : (lang === "en" ? "Hours" : "Darba laiks")} value={t("hours")}/>
                <ContactRow label={lang === "ru" ? "Реквизиты" : (lang === "en" ? "Legal" : "Rekvizīti")} value={
                  <div style={{ fontSize: 13, lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
                    DENTAL SEPTIŅI<br/>
                    Reg. 40203117924<br/>
                    LV28HABA0551044568976
                  </div>
                }/>
              </div>
            </div>

            <div style={{ gridColumn: "span 7" }} data-reveal>
              <div className="card" style={{ padding: 28 }}>
                <h2 className="display-3" style={{ fontSize: 28 }}>
                  {lang === "ru" ? "Напишите нам" : (lang === "en" ? "Write to us" : "Raksti mums")}
                </h2>
                <p style={{ color: "var(--ink-2)", marginTop: 8 }}>
                  {lang === "ru" ? "Ответим в течение одного рабочего дня." : (lang === "en" ? "We'll reply within one business day." : "Atbildēsim viena darba dienas laikā.")}
                </p>

                {done ? (
                  <div style={{ marginTop: 28, padding: "40px 20px", textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Check size={22}/></div>
                    <div className="display-3">{t("form.success")}</div>
                    <button className="btn btn-ghost" type="button" onClick={() => setDone(false)} style={{ marginTop: 18 }}>
                      {lang === "ru" ? "Отправить ещё одно" : (lang === "en" ? "Send another" : "Sūtīt vēlreiz")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div className="grid grid-2">
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: ".08em" }}>
                        {lang === "ru" ? "Или запишитесь сразу:" : (lang === "en" ? "Or book directly:" : "Vai piesakies uzreiz:")}
                      </span>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={onBook}>{t("cta.bookShort")}</button>
                        <button type="submit" className="btn btn-primary">
                          {lang === "ru" ? "Отправить" : (lang === "en" ? "Send" : "Sūtīt")} <ArrowRight/>
                        </button>
                      </div>
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

function ContactRow({ label, value }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, paddingBottom: 16, borderBottom: "1px solid var(--line)", alignItems: "baseline" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 15 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { HomePage, ServicesPage, TeamPage, PricingPage, ContactsPage });
