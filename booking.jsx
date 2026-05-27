/* DentalSeptiņi v2 — multi-step booking modal */

function genTimeSlots() {
  const out = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2,"0")}:00`);
    if (h !== 18) out.push(`${String(h).padStart(2,"0")}:30`);
  }
  return out;
}
function genDays(n = 14) {
  const out = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}
function fmtDay(d, lang) {
  const months = {
    lv: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec"],
    ru: ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"],
    en: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  };
  const dows = {
    lv: ["Sv","P","O","T","C","Pk","S"],
    ru: ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
    en: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  };
  return { dow: dows[lang][d.getDay()], day: d.getDate(), mo: months[lang][d.getMonth()] };
}

function BookingModal({ open, onClose, initService = "", onSuccess }) {
  const { t, lang } = useI18n();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    service: initService, doctor: "", date: "", time: "",
    name: "", phone: "", email: "", note: "", consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { if (open) { setStep(1); setDone(false); setErrors({}); setData(d => ({ ...d, service: initService || d.service })); } }, [open, initService]);

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const days = useMemo(() => genDays(14), []);
  const times = useMemo(() => genTimeSlots(), []);
  const totalSteps = 4;

  function validateStep(s) {
    const e = {};
    if (s === 1 && !data.service) e.service = t("form.req");
    if (s === 3 && !data.date) e.date = t("form.req");
    if (s === 3 && !data.time) e.time = t("form.req");
    if (s === 4) {
      if (!data.name.trim()) e.name = t("form.req");
      if (!data.phone.trim()) e.phone = t("form.req");
      else if (!/^[+0-9()\-\s]{7,}$/.test(data.phone)) e.phone = t("form.phoneInvalid");
      if (data.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = t("form.emailInvalid");
      if (!data.consent) e.consent = t("form.req");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < totalSteps) setStep(step + 1);
    else submit();
  }
  function back() { if (step > 1) setStep(step - 1); }

  function submit() {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      onSuccess && onSuccess(t("form.success"));
    }, 1100);
  }

  return (
    <Modal open={open} onClose={onClose} ariaLabel={t("cta.book")}>
      <div style={{ padding: "26px 30px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div>
          <div className="eyebrow">{t("cta.book")}</div>
          <div className="h2" style={{ marginTop: 6 }}>{done ? t("form.success") : t("section.book.lead")}</div>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close"><IconClose/></button>
      </div>

      {!done && (
        <div style={{ padding: "16px 30px 0", display: "flex", gap: 6 }}>
          {[1,2,3,4].map(s => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 999,
              background: s <= step ? "var(--brand)" : "var(--brand-soft)", transition: "background .3s" }}></div>
          ))}
        </div>
      )}

      <div style={{ padding: "24px 30px 30px" }}>
        {done ? (
          <SuccessView data={data}/>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500, marginBottom: 16 }}>
              {t("form.step")} {step} {t("form.of")} {totalSteps}
            </div>

            {step === 1 && <Step1 data={data} set={set} errors={errors}/>}
            {step === 2 && <Step2 data={data} set={set}/>}
            {step === 3 && <Step3 data={data} set={set} errors={errors} days={days} times={times}/>}
            {step === 4 && <Step4 data={data} set={set} errors={errors}/>}

            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              {step > 1
                ? <button className="btn btn-secondary" onClick={back}>{t("form.back")}</button>
                : <span></span>}
              <button className="btn btn-primary" onClick={next} disabled={submitting}>
                {submitting && <span className="spinner"></span>}
                {step === totalSteps ? t("form.submit") : t("form.next")}
                {!submitting && <IconArrow size={14}/>}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function PickCard({ selected, onClick, primary, secondary }) {
  return (
    <button onClick={onClick}
      style={{
        textAlign: "left", padding: "14px 16px", borderRadius: "var(--radius-sm)",
        border: "1.5px solid " + (selected ? "var(--brand)" : "var(--line-2)"),
        background: selected ? "var(--brand-soft)" : "#fff",
        color: "var(--ink)",
        transition: "all .15s",
        display: "flex", flexDirection: "column", gap: 4,
        cursor: "pointer",
      }}>
      <div style={{ fontSize: 14.5, fontWeight: 600 }}>{primary}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{secondary}</div>
    </button>
  );
}

function Step1({ data, set, errors }) {
  const { t, lang } = useI18n();
  return (
    <div>
      <div className="h3" style={{ marginBottom: 14 }}>{t("form.selService")}</div>
      <div className="grid grid-2" style={{ gap: 8 }}>
        {SERVICES.map(s => (
          <PickCard key={s.id}
            selected={data.service === s.id}
            onClick={() => set("service", s.id)}
            primary={s[lang].name}
            secondary={`${t("form.from")} ${s.priceFrom} €`}
          />
        ))}
      </div>
      {errors.service && <div className="err-msg" style={{ marginTop: 10 }}>{errors.service}</div>}
    </div>
  );
}

function Step2({ data, set }) {
  const { t, lang } = useI18n();
  return (
    <div>
      <div className="h3" style={{ marginBottom: 14 }}>{t("form.selDoctor")}</div>
      <div className="grid grid-2" style={{ gap: 8 }}>
        <PickCard selected={data.doctor === ""} onClick={() => set("doctor", "")} primary={t("form.any")} secondary="—"/>
        {TEAM.map(p => (
          <PickCard key={p.id}
            selected={data.doctor === p.id}
            onClick={() => set("doctor", p.id)}
            primary={p.name}
            secondary={p.role[lang]}
          />
        ))}
      </div>
    </div>
  );
}

function Step3({ data, set, errors, days, times }) {
  const { t, lang } = useI18n();
  return (
    <div>
      <div className="h3" style={{ marginBottom: 14 }}>{t("form.selWhen")}</div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 18 }}>
        {days.map((d, i) => {
          const key = d.toISOString().slice(0,10);
          const sel = data.date === key;
          const f = fmtDay(d, lang);
          const isWeekend = d.getDay() === 0;
          return (
            <button key={i} onClick={() => set("date", key)} disabled={isWeekend}
              style={{
                flexShrink: 0, padding: "10px 14px", borderRadius: 14,
                border: "1.5px solid " + (sel ? "var(--brand)" : "var(--line-2)"),
                background: sel ? "var(--brand)" : "#fff",
                color: sel ? "#fff" : (isWeekend ? "var(--ink-3)" : "var(--ink)"),
                opacity: isWeekend ? 0.4 : 1,
                cursor: isWeekend ? "not-allowed" : "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 60,
              }}>
              <span style={{ fontSize: 11, opacity: .8, textTransform: "uppercase", letterSpacing: ".05em" }}>{f.dow}</span>
              <span style={{ fontSize: 20, fontWeight: 700 }}>{f.day}</span>
              <span style={{ fontSize: 11, opacity: .7 }}>{f.mo}</span>
            </button>
          );
        })}
      </div>
      {errors.date && <div className="err-msg" style={{ marginBottom: 12 }}>{errors.date}</div>}

      <div className="field-label" style={{ marginBottom: 10 }}>{t("form.time")}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 6 }}>
        {times.map(tt => {
          const sel = data.time === tt;
          return (
            <button key={tt} onClick={() => set("time", tt)}
              style={{
                padding: "9px 8px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                border: "1.5px solid " + (sel ? "var(--brand)" : "var(--line-2)"),
                background: sel ? "var(--brand)" : "#fff",
                color: sel ? "#fff" : "var(--ink)",
              }}>
              {tt}
            </button>
          );
        })}
      </div>
      {errors.time && <div className="err-msg" style={{ marginTop: 10 }}>{errors.time}</div>}
    </div>
  );
}

function Step4({ data, set, errors }) {
  const { t, lang } = useI18n();
  const svc = SERVICES.find(s => s.id === data.service);
  const doc = TEAM.find(p => p.id === data.doctor);
  return (
    <div>
      <div className="h3" style={{ marginBottom: 14 }}>{t("form.contact")}</div>

      <div style={{ background: "var(--bg-soft)", padding: "14px 16px", borderRadius: "var(--radius-sm)", marginBottom: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13.5 }}>
        <div><div style={{ color: "var(--ink-3)", fontSize: 12, marginBottom: 2 }}>{t("form.service")}</div><div style={{ fontWeight: 600 }}>{svc ? svc[lang].name : "—"}</div></div>
        <div><div style={{ color: "var(--ink-3)", fontSize: 12, marginBottom: 2 }}>{t("form.doctor")}</div><div style={{ fontWeight: 600 }}>{doc ? doc.name : t("form.any")}</div></div>
        <div><div style={{ color: "var(--ink-3)", fontSize: 12, marginBottom: 2 }}>{t("form.date")}</div><div style={{ fontWeight: 600 }}>{data.date || "—"}</div></div>
        <div><div style={{ color: "var(--ink-3)", fontSize: 12, marginBottom: 2 }}>{t("form.time")}</div><div style={{ fontWeight: 600 }}>{data.time || "—"}</div></div>
      </div>

      <div className="grid grid-2">
        <Field label={t("form.name") + " *"} error={errors.name}>
          <TextInput value={data.name} onChange={v => set("name", v)} error={errors.name} placeholder="Jānis Bērziņš"/>
        </Field>
        <Field label={t("form.phone") + " *"} error={errors.phone}>
          <TextInput value={data.phone} onChange={v => set("phone", v)} error={errors.phone} placeholder="+371 …" type="tel"/>
        </Field>
        <Field label={t("form.email")} error={errors.email}>
          <TextInput value={data.email} onChange={v => set("email", v)} error={errors.email} placeholder="you@email.com" type="email"/>
        </Field>
        <Field label={t("form.note")}>
          <TextInput value={data.note} onChange={v => set("note", v)} />
        </Field>
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 16, cursor: "pointer", fontSize: 13.5, color: "var(--ink-2)" }}>
        <input type="checkbox" checked={data.consent} onChange={e => set("consent", e.target.checked)}
          style={{ marginTop: 3, accentColor: "var(--brand)", width: 16, height: 16 }}/>
        <span>{t("form.consent")}</span>
      </label>
      {errors.consent && <div className="err-msg" style={{ marginTop: 6 }}>{errors.consent}</div>}
    </div>
  );
}

function SuccessView({ data }) {
  const { t, lang } = useI18n();
  const svc = SERVICES.find(s => s.id === data.service);
  return (
    <div style={{ textAlign: "center", padding: "20px 0 12px" }}>
      <div style={{ width: 68, height: 68, borderRadius: 999, background: "var(--brand-soft)", color: "var(--brand-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <IconCheck size={28}/>
      </div>
      <div className="h2">{t("form.success")}</div>
      <p style={{ marginTop: 12, color: "var(--ink-2)", maxWidth: "44ch", margin: "12px auto 0" }}>
        {svc ? svc[lang].name : ""} · {data.date} · {data.time}
      </p>
      <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--ink-3)" }}>
        {data.name} · {data.phone}
      </p>
    </div>
  );
}

Object.assign(window, { BookingModal });
