"use client";

import { useState, useMemo } from "react";
import { Crosshair, Menu, X, Sun, Moon, Settings, LogIn, Megaphone, UserPlus, Info, Share2, Phone, Globe, MapPin, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/modules/auth";
import { MOCK_INSTRUCTORS, SearchBar, InstructorCard, FeaturedInstructor } from "@/modules/instructors";
import { BottomNav } from "@/components/BottomNav";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState(50);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const user = useAuthStore((s) => s.user);

  const allCities = useMemo(() => {
    const cities = [...new Set(MOCK_INSTRUCTORS.map((i) => i.city))];
    return cities.sort((a, b) => a.localeCompare(b, "he"));
  }, []);

  // Featured instructor: highest combined ELO + most trainees
  const featuredInstructor = useMemo(() => {
    return [...MOCK_INSTRUCTORS]
      .filter((i) => i.verified && i.available)
      .sort((a, b) => (b.eloShooting + b.eloInstruction + b.trainees) - (a.eloShooting + a.eloInstruction + a.trainees))[0];
  }, []);

  // Map filter IDs to training types for filtering
  const CATEGORY_TRAINING_MAP: Record<string, string[]> = {
    // Top level categories
    "new": ["מתחמש חדש"],
    "refresh": ["רענון"],
    "renewal": ["חידוש"],
    "train": ["ירי מקצועי"],
    "special": ["ערכות הסבה", "כוונות השלכה", "אימון נשים", "אימון לילה"],
    // Sub-categories
    "new:training": ["מתחמש חדש"],
    "new:stores": ["מתחמש חדש"],
    "new:help": ["מתחמש חדש"],
    "refresh:annual": ["רענון"],
    "refresh:combo": ["רענון"],
    "refresh:instructor": ["רענון"],
    "renewal:schedule": ["חידוש"],
    "renewal:forms": ["חידוש"],
    "renewal:guide": ["חידוש"],
    "renewal:missed": ["חידוש"],
    "train:pistol": ["ירי מקצועי"],
    "train:rifle": ["ירי מקצועי"],
    "train:dynamic": ["ירי מקצועי"],
    "train:instructor": ["ירי מקצועי"],
    "special:conversion": ["ערכות הסבה"],
    "special:sights": ["כוונות השלכה"],
    "special:women": ["אימון נשים"],
    "special:night": ["אימון לילה"],
  };

  const filtered = useMemo(() => {
    let results = MOCK_INSTRUCTORS;
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (i) => i.name.includes(q) || i.city.includes(q) || i.ranges.some((r) => r.includes(q))
      );
    }
    if (selectedCategory && CATEGORY_TRAINING_MAP[selectedCategory]) {
      const requiredTypes = CATEGORY_TRAINING_MAP[selectedCategory];
      results = results.filter((i) =>
        requiredTypes.some((type) => i.trainingTypes.includes(type))
      );
    }
    if (selectedCity) {
      results = results.filter((i) => i.city === selectedCity);
    }
    if (sortMode < 40) {
      results = [...results].sort((a, b) => b.eloInstruction - a.eloInstruction);
    } else if (sortMode > 60) {
      results = [...results].sort((a, b) => a.city.localeCompare(b.city));
    }
    return results;
  }, [query, selectedCategory, sortMode, selectedCity]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  const handleShare = async () => {
    const data = { title: "EasyTarget", text: "מצא את מדריך הירי המושלם עבורך", url: window.location.origin };
    if (navigator.share) { await navigator.share(data); }
    else { await navigator.clipboard.writeText(window.location.origin); alert("הקישור הועתק!"); }
  };

  const sidebarItems = [
    { icon: darkMode ? Sun : Moon, label: darkMode ? "תצוגה בהירה" : "תצוגה כהה", onClick: toggleTheme },
    { icon: Settings, label: "הגדרות", href: "/settings" },
    { icon: LogIn, label: "התחברות למדריכים", href: "/login" },
    { icon: Megaphone, label: "קידום ממומן ב-EasyTarget", href: "/promote" },
    { icon: UserPlus, label: "הצטרפות ל-EasyTarget", href: "/join" },
    { icon: Info, label: "אודות EasyTarget", href: "/about" },
    { icon: Share2, label: "שתפו את EasyTarget עם חברים", onClick: handleShare },
    { icon: Phone, label: "יצירת קשר", href: "/contact" },
    { icon: Globe, label: "English", href: "/settings" },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <Crosshair className="w-6 h-6 text-[var(--accent-green)]" strokeWidth={1.5} />
            </div>
            <h1 className="text-base font-bold tracking-tight" style={{ fontFamily: "var(--font-rubik)" }}>
              <span className="text-[var(--accent-green)]">Easy</span>
              <span className="text-[var(--text-primary)]">Target</span>
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute top-0 left-0 bottom-0 w-72 bg-[var(--bg-card)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-[var(--accent-green)]" strokeWidth={1.5} />
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-rubik)" }}>
                  <span className="text-[var(--accent-green)]">Easy</span>
                  <span className="text-[var(--text-primary)]">Target</span>
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User info if logged in */}
            {user && (
              <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{user.role === "admin" ? "מנהל מערכת" : "מדריך"}</p>
              </div>
            )}

            {/* Menu items */}
            <nav className="flex-1 py-2 overflow-y-auto">
              {sidebarItems.map((item, i) => {
                const Icon = item.icon;
                if (item.onClick) {
                  return (
                    <button key={i} onClick={() => { item.onClick(); setSidebarOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors">
                      <Icon className="w-5 h-5 text-[var(--text-muted)]" />
                      {item.label}
                    </button>
                  );
                }
                return (
                  <a key={i} href={item.href} onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors">
                    <Icon className="w-5 h-5 text-[var(--text-muted)]" />
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
              <p className="text-[10px] text-[var(--text-muted)] text-center">EasyTarget v1.0 · אחים עם נשק</p>
            </div>
          </div>
        </div>
      )}

      {/* Search + Icons + Slider */}
      <div className="px-4 pt-4 max-w-2xl mx-auto">
        <SearchBar
          onSearch={setQuery}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
          sortMode={sortMode}
          onSortChange={setSortMode}
        />
      </div>

      {/* Featured Instructor */}
      {featuredInstructor && !query && !selectedCity && (
        <div className="px-4 mt-4 max-w-2xl mx-auto">
          <FeaturedInstructor instructor={featuredInstructor} />
        </div>
      )}

      {/* City filter + Results count */}
      <div className="px-4 mt-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[var(--text-muted)]">{filtered.length} תוצאות</span>
          <div className="relative">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${selectedCity ? "border-[var(--accent-green)]/40 bg-[var(--accent-green)]/10 text-[var(--accent-green)]" : "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-secondary)]"}`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {selectedCity || "כל הערים"}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${cityDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {cityDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setCityDropdownOpen(false)} />
                <div className="absolute left-0 top-full mt-1 z-40 w-44 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-xl overflow-hidden">
                  <button
                    onClick={() => { setSelectedCity(null); setCityDropdownOpen(false); }}
                    className={`w-full text-right px-3 py-2.5 text-xs transition-colors ${!selectedCity ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)] font-bold" : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`}
                  >
                    כל הערים
                  </button>
                  {allCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => { setSelectedCity(city); setCityDropdownOpen(false); }}
                      className={`w-full text-right px-3 py-2.5 text-xs transition-colors ${selectedCity === city ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)] font-bold" : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 max-w-2xl mx-auto space-y-3">
        {filtered.map((instructor, i) => (
          <InstructorCard key={instructor.id} instructor={instructor} index={i} />
        ))}
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/972501234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 left-4 z-40 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <BottomNav />
    </div>
  );
}
