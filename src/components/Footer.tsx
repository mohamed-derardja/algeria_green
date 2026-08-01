export default function Footer() {
  const footerLinks = [
    { label: "Data Privacy", href: "#privacy" },
    { label: "API Access", href: "#api" },
    { label: "Contact Support", href: "#support" },
    { label: "Open Data Policy", href: "#opendata" },
  ];

  return (
    <footer className="w-full py-12 bg-surface-container-highest dark:bg-inverse-surface border-t border-outline-variant flex flex-col items-center justify-center gap-widget-gap px-container-padding">
      <div className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim mb-2 font-black tracking-tight">
        Green Algeria
      </div>
      <p className="text-xs text-on-surface-variant max-w-md text-center mb-4">
        National Geospatial Vegetation &amp; Environmental Monitoring Platform
      </p>

      <ul className="flex flex-wrap justify-center gap-6 mb-6">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <a
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors text-sm"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="w-12 h-0.5 bg-outline-variant/50 mb-4"></div>

      <p className="font-body-md text-xs text-on-surface-variant text-center max-w-lg">
        © {new Date().getFullYear()} National Environmental GIS Authority — Green Algeria Initiative
      </p>
    </footer>
  );
}
