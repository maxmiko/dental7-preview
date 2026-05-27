/* DentalSeptiņi — App root: router + lang + booking + tweaks */

function App() {
  const [route, setRoute] = useState(() => {
    const h = (window.location.hash || "").replace("#/", "");
    return ["home","services","team","pricing","contacts"].includes(h) ? h : "home";
  });
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem("ds7_lang");
    return ["lv","ru","en"].includes(stored) ? stored : "lv";
  });
  const [booking, setBooking] = useState(false);
  const [bookingService, setBookingService] = useState("");
  const [toastNode, setToast] = useToast();

  /* hash sync */
  useEffect(() => { window.location.hash = "/" + route; }, [route]);
  useEffect(() => {
    const fn = () => {
      const h = (window.location.hash || "").replace("#/", "");
      if (["home","services","team","pricing","contacts"].includes(h)) setRoute(h);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);

  /* lang persist + html attr */
  useEffect(() => {
    localStorage.setItem("ds7_lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  /* t helper */
  const t = (k) => (STRINGS[lang] && STRINGS[lang][k]) || k;

  /* tweaks */
  const tweaksDefaults = /*EDITMODE-BEGIN*/{
    "palette": "ocean",
    "density": "default",
    "radius": "default",
    "heroVariant": "split"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = useTweaks(tweaksDefaults);

  /* apply palette/density/radius to body */
  useEffect(() => {
    document.body.setAttribute("data-palette", tweaks.palette);
    document.body.setAttribute("data-density", tweaks.density);
    document.body.setAttribute("data-radius", tweaks.radius);
  }, [tweaks.palette, tweaks.density, tweaks.radius]);

  function openBooking(svcId = "") {
    setBookingService(svcId);
    setBooking(true);
  }

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      <AcuteBanner/>
      <Nav route={route} setRoute={setRoute} onBook={() => openBooking()}/>

      <main data-screen-label={route} key={route /* remount for clean reveal */}>
        {route === "home" && <HomePage onBook={openBooking} setRoute={setRoute}/>}
        {route === "services" && <ServicesPage onBook={openBooking} setRoute={setRoute}/>}
        {route === "team" && <TeamPage onBook={openBooking}/>}
        {route === "pricing" && <PricingPage onBook={openBooking}/>}
        {route === "contacts" && <ContactsPage onBook={openBooking}/>}
      </main>

      <Footer setRoute={setRoute} onBook={() => openBooking()}/>

      <BookingModal
        open={booking}
        initService={bookingService}
        onClose={() => setBooking(false)}
        onSuccess={(msg) => { setToast(msg); setTimeout(() => setBooking(false), 1800); }}
      />

      {toastNode}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Theme">
          <TweakSelect
            label="Palette"
            value={tweaks.palette}
            options={['ocean','mint','rose','graphite']}
            onChange={v => setTweak('palette', v)}
          />
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            options={['compact','default','cozy']}
            onChange={v => setTweak('density', v)}
          />
          <TweakRadio
            label="Card corners"
            value={tweaks.radius}
            options={['sharp','default','soft']}
            onChange={v => setTweak('radius', v)}
          />
        </TweakSection>
        <TweakSection title="Actions">
          <TweakButton onClick={() => openBooking()}>Open booking modal</TweakButton>
          <TweakButton onClick={() => { setLang(lang === 'lv' ? 'ru' : lang === 'ru' ? 'en' : 'lv'); }}>
            Cycle language ({lang.toUpperCase()})
          </TweakButton>
        </TweakSection>
      </TweaksPanel>
    </I18nCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
