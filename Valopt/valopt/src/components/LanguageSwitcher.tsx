// components/LanguageSwitcher.tsx
export default function LanguageSwitcher({ lang }: { lang: string }) {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
    ];
  
    return (
      <div>
        {languages.map((l) => (
          <a key={l.code} href={`/${l.code}/`}>
            {l.name}
          </a>
        ))}
      </div>
    );
  }