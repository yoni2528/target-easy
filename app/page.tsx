"use client";

import { useState, useMemo, useCallback } from "react";
import { Crosshair, Menu, X, Sun, Moon, Settings, LogIn, Megaphone, UserPlus, Info, Share2, Phone, Globe, ShieldCheck, BarChart3, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/modules/auth";
import { MOCK_INSTRUCTORS, SearchBar, InstructorCard, FeaturedInstructor } from "@/modules/instructors";
import { BottomNav } from "@/components/BottomNav";
import { type Filters, DEFAULT_FILTERS } from "@/modules/instructors/components/SearchBar";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState(50);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS });
  const [sidebarPanel, setSidebarPanel] = useState<string | null>(null);
  const [lang, setLang] = useState<"he" | "en">("he");
  const user = useAuthStore((s) => s.user);

  // Featured instructor: highest combined ELO + most trainees
  const featuredInstructor = useMemo(() => {
    return [...MOCK_INSTRUCTORS]
      .filter((i) => i.verified && i.available)
      .sort((a, b) => (b.eloShooting + b.eloInstruction + b.trainees) - (a.eloShooting + a.eloInstruction + a.trainees))[0];
  }, []);

  // Map filter IDs to training types for filtering
  const CATEGORY_TRAINING_MAP: Record<string, string[]> = {
    "new": ["מתחמש חדש"],
    "refresh": ["רענון"],
    "renewal": ["חידוש"],
    "train": ["ירי מקצועי", "סדנת ירי"],
    "special": ["ערכות הסבה", "כוונות השלכה", "אימון נשים", "אימון לילה"],
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
    "train:single": ["ירי מקצועי"],
    "train:single:beginner": ["ירי מקצועי"],
    "train:single:advanced": ["ירי מקצועי"],
    "train:single:expert": ["ירי מקצועי"],
    "train:single:champion": ["ירי מקצועי"],
    "train:workshop": ["סדנת ירי"],
    "train:workshop:2": ["סדנת ירי"],
    "train:workshop:3": ["סדנת ירי"],
    "train:workshop:combat": ["סדנת ירי"],
    "train:workshop:legal": ["סדנת ירי"],
    "special:conversion": ["ערכות הסבה"],
    "special:sights": ["כוונות השלכה"],
    "special:women": ["אימון נשים"],
    "special:night": ["אימון לילה"],
  };

  // ELO ranges for single training skill levels
  const ELO_FILTER_MAP: Record<string, { min: number; max: number }> = {
    "train:single:beginner": { min: 1200, max: 1399 },
    "train:single:advanced": { min: 1400, max: 1599 },
    "train:single:expert": { min: 1600, max: 1799 },
    "train:single:champion": { min: 1800, max: 9999 },
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
      // Apply ELO range filter for skill level categories (from filter tree)
      const eloRange = ELO_FILTER_MAP[selectedCategory];
      if (eloRange) {
        results = results.filter((i) => i.eloShooting >= eloRange.min && i.eloShooting <= eloRange.max);
      }
    }
    // Apply level picker ELO filter (shown for train/special categories)
    if (selectedLevel) {
      const levelRanges: Record<string, { min: number; max: number }> = {
        beginner: { min: 1200, max: 1399 },
        advanced: { min: 1400, max: 1599 },
        expert: { min: 1600, max: 1799 },
        champion: { min: 1800, max: 9999 },
      };
      const range = levelRanges[selectedLevel];
      if (range) {
        results = results.filter((i) => i.eloShooting >= range.min && i.eloShooting <= range.max);
      }
    }
    // Filter panel filters
    if (filters.city) {
      results = results.filter((i) => i.city === filters.city);
    }
    if (filters.verifiedOnly) {
      results = results.filter((i) => i.verified);
    }
    if (filters.availableOnly) {
      results = results.filter((i) => i.available);
    }
    if (filters.maxPrice) {
      const priceMaxMap = { "₪": 200, "₪₪": 350, "₪₪₪": 9999 };
      const maxVal = priceMaxMap[filters.maxPrice];
      results = results.filter((i) => i.priceFrom <= maxVal);
    }
    if (filters.trainingLevel) {
      const eloRanges: Record<string, { min: number; max: number }> = {
        beginner: { min: 1200, max: 1399 },
        advanced: { min: 1400, max: 1599 },
        expert: { min: 1600, max: 1799 },
        champion: { min: 1800, max: 9999 },
      };
      const range = eloRanges[filters.trainingLevel];
      if (range) {
        results = results.filter((i) => i.eloShooting >= range.min && i.eloShooting <= range.max);
      }
    }
    if (filters.specialTraining) {
      results = results.filter((i) => i.trainingTypes.includes(filters.specialTraining!));
    }
    if (filters.minStars) {
      results = results.filter((i) => i.stars >= filters.minStars!);
    }
    if (filters.countsAsRefresh !== null) {
      results = results.filter((i) => (i.countsAsRefresh ?? false) === filters.countsAsRefresh);
    }
    if (filters.rangeType) {
      results = results.filter((i) => i.rangeType?.includes(filters.rangeType as "מטווח סגור" | "מטווח פתוח"));
    }
    if (filters.deal) {
      results = results.filter((i) => i.deals?.includes(filters.deal as "כוחות ביטחון" | "סטודנטים" | "גמלאים"));
    }
    if (filters.day) {
      results = results.filter((i) => i.availableDays?.includes(filters.day!) ?? false);
    }
    if (filters.dateFrom || filters.dateTo) {
      // Date range filter: only show available instructors in the date range
      results = results.filter((i) => i.available);
    }
    // Sort
    if (sortMode < 40) {
      results = [...results].sort((a, b) => b.eloInstruction - a.eloInstruction);
    } else if (sortMode > 60) {
      results = [...results].sort((a, b) => a.city.localeCompare(b.city));
    }
    return results;
  }, [query, selectedCategory, selectedLevel, sortMode, filters]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
  };

  const handleShare = async () => {
    const data = { title: "EasyTarget", text: "מצא את מדריך הירי המושלם עבורך", url: window.location.origin };
    if (navigator.share) { await navigator.share(data); }
    else { await navigator.clipboard.writeText(window.location.origin); alert("הקישור הועתק!"); }
  };

  const t = lang === "en" ? {
    search: "Search", quiz: "Level Quiz", favorites: "Favorites", history: "History",
    results: "results", bookTraining: "Book Training", verifiedLabel: "Verified Instructor",
    ratingLabel: "How Ratings Work", lightMode: "Light Mode", darkModeLabel: "Dark Mode",
    settings: "Settings", instructorLogin: "Instructor Login", promote: "Promote on EasyTarget",
    join: "Join EasyTarget", about: "About EasyTarget", share: "Share EasyTarget", contact: "Contact",
    filterResults: "Filter Results", clearAll: "Clear All",
  } : {
    search: "חיפוש", quiz: "שאלון רמה", favorites: "מועדפים", history: "היסטוריה",
    results: "תוצאות", bookTraining: "קבע אימון", verifiedLabel: "מה זה מדריך מאומת?",
    ratingLabel: "כיצד נקבע הדירוג?", lightMode: "תצוגה בהירה", darkModeLabel: "תצוגה כהה",
    settings: "הגדרות", instructorLogin: "התחברות למדריכים", promote: "קידום ממומן ב-EasyTarget",
    join: "הצטרפות ל-EasyTarget", about: "אודות EasyTarget", share: "שתפו את EasyTarget עם חברים",
    contact: "יצירת קשר", filterResults: "סינון תוצאות", clearAll: "נקה הכל",
  };

  const sidebarItems = [
    { icon: darkMode ? Sun : Moon, label: darkMode ? t.lightMode : t.darkModeLabel, onClick: toggleTheme },
    { icon: ShieldCheck, label: t.verifiedLabel, onClick: () => setSidebarPanel(sidebarPanel === "verified" ? null : "verified") },
    { icon: BarChart3, label: t.ratingLabel, onClick: () => setSidebarPanel(sidebarPanel === "rating" ? null : "rating") },
    { icon: Settings, label: t.settings, href: "/settings" },
    { icon: LogIn, label: t.instructorLogin, href: "/login" },
    { icon: Megaphone, label: t.promote, href: "/promote" },
    { icon: UserPlus, label: t.join, href: "/join" },
    { icon: Info, label: t.about, href: "/about" },
    { icon: Share2, label: t.share, onClick: handleShare },
    { icon: Phone, label: t.contact, href: "/contact" },
    { icon: Globe, label: lang === "he" ? "English" : "עברית", onClick: () => setLang(lang === "he" ? "en" : "he") },
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
            {user && (
              <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{user.role === "admin" ? "מנהל מערכת" : "מדריך"}</p>
              </div>
            )}
            <nav className="flex-1 py-2 overflow-y-auto">
              {sidebarItems.map((item, i) => {
                const Icon = item.icon;
                if (item.onClick) {
                  return (
                    <button key={i} onClick={() => { item.onClick(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors">
                      <Icon className="w-5 h-5 text-[var(--text-muted)]" />
                      {item.label}
                      {(item.label === t.verifiedLabel || item.label === t.ratingLabel) && (
                        <ChevronDown className={`w-4 h-4 mr-auto text-[var(--text-muted)] transition-transform ${sidebarPanel === (item.label === t.verifiedLabel ? "verified" : "rating") ? "rotate-180" : ""}`} />
                      )}
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

              {/* Verified Instructor Explanation */}
              {sidebarPanel === "verified" && (
                <div className="mx-4 mb-3 p-4 bg-[var(--bg-elevated)] border border-[var(--accent-green)]/20 rounded-xl text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[var(--accent-green)]" />
                    <h4 className="font-bold text-[var(--text-primary)]">{lang === "en" ? "What is a Verified Instructor?" : "מה זה מדריך מאומת?"}</h4>
                  </div>
                  {lang === "en" ? (
                    <div className="space-y-2 text-[var(--text-secondary)] leading-relaxed">
                      <p><strong>A verified instructor</strong> has passed our strict 4-step verification process:</p>
                      <div className="space-y-1.5">
                        <p>1. <strong>License check</strong> - Valid instructor license from the Firearms Division</p>
                        <p>2. <strong>Background check</strong> - Clean criminal record and valid security clearance</p>
                        <p>3. <strong>Field test</strong> - Observed during a live training by our team</p>
                        <p>4. <strong>Student reviews</strong> - Minimum 10 verified reviews with 4.0+ average</p>
                      </div>
                      <p className="text-[var(--accent-green)] font-semibold">The green badge means you can train with confidence.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-[var(--text-secondary)] leading-relaxed">
                      <p><strong>מדריך מאומת</strong> עבר תהליך אימות מחמיר בן 4 שלבים:</p>
                      <div className="space-y-1.5">
                        <p>1. <strong>בדיקת רישיון</strong> – רישיון מדריך ירי בתוקף מאגף כלי ירייה</p>
                        <p>2. <strong>בדיקת רקע</strong> – תעודת יושר, אישור ביטחוני ובדיקה פלילית נקייה</p>
                        <p>3. <strong>מבחן שדה</strong> – צוות EasyTarget צופה באימון חי של המדריך</p>
                        <p>4. <strong>ביקורות מתאמנים</strong> – מינימום 10 ביקורות מאומתות עם ממוצע 4.0+</p>
                      </div>
                      <p className="text-[var(--accent-green)] font-semibold">סימן הוי הירוק = אתה יכול להתאמן בראש שקט.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Rating Explanation */}
              {sidebarPanel === "rating" && (
                <div className="mx-4 mb-3 p-4 bg-[var(--bg-elevated)] border border-[var(--accent-amber)]/20 rounded-xl text-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[var(--accent-amber)]" />
                    <h4 className="font-bold text-[var(--text-primary)]">{lang === "en" ? "How Ratings Work" : "כיצד נקבע הדירוג?"}</h4>
                  </div>
                  {lang === "en" ? (
                    <div className="space-y-3 text-[var(--text-secondary)] leading-relaxed">
                      <p>We use an <strong>ELO rating system</strong> — the same system used in chess to rank the best players in the world. It&apos;s mathematical, fair, and impossible to fake.</p>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--accent-amber)]">Shooting Rating (amber badge)</p>
                        <p>Measures the instructor&apos;s <strong>personal shooting skill</strong>. Updated after every scored session at a certified range.</p>
                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                          <span className="bg-[#4ade80]/10 text-[#4ade80] px-2 py-1 rounded">1200+ Beginner</span>
                          <span className="bg-[#60a5fa]/10 text-[#60a5fa] px-2 py-1 rounded">1400+ Advanced</span>
                          <span className="bg-[#fbbf24]/10 text-[#fbbf24] px-2 py-1 rounded">1600+ Expert</span>
                          <span className="bg-[#f87171]/10 text-[#f87171] px-2 py-1 rounded">1800+ Champion</span>
                        </div>
                      </div>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--accent-blue)]">Instruction Rating (blue badge)</p>
                        <p>Measures <strong>teaching quality</strong>. Based on student feedback, course completion rates, and improvement metrics.</p>
                      </div>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--text-primary)]">How ELO works — a simple example:</p>
                        <p>Imagine two instructors competing in a scored drill. If a 1600-rated instructor beats a 1800-rated one, they gain MORE points because they beat someone stronger. If the 1800 beats the 1600, they gain fewer — it was expected.</p>
                        <p>This means every point was <strong>earned</strong>, not given.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-[var(--text-secondary)] leading-relaxed">
                      <p>אנחנו משתמשים ב<strong>שיטת דירוג ELO</strong> — אותה שיטה שמדרגת שחמטאים ברחבי העולם. היא מתמטית, הוגנת, ובלתי אפשרי לזייף אותה.</p>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--accent-amber)]">דירוג ירי (תג כתום) 🎯</p>
                        <p>מודד את <strong>רמת הירי האישית</strong> של המדריך. מתעדכן אחרי כל אימון מדוד במטווח מוסמך.</p>
                        <div className="grid grid-cols-2 gap-1 text-[10px]">
                          <span className="bg-[#4ade80]/10 text-[#4ade80] px-2 py-1 rounded">1200+ מתחילים</span>
                          <span className="bg-[#60a5fa]/10 text-[#60a5fa] px-2 py-1 rounded">1400+ מתקדמים</span>
                          <span className="bg-[#fbbf24]/10 text-[#fbbf24] px-2 py-1 rounded">1600+ מומחים</span>
                          <span className="bg-[#f87171]/10 text-[#f87171] px-2 py-1 rounded">1800+ אלופים</span>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)]">דוגמה: מדריך ברמה 1650 פוגע ב-48 מתוך 50 מטרות → הדירוג עולה. פוגע ב-30 מתוך 50 → הדירוג יורד.</p>
                      </div>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--accent-blue)]">דירוג הדרכה (תג כחול) 📘</p>
                        <p>מודד את <strong>איכות ההוראה</strong>. מבוסס על חוות דעת תלמידים, אחוזי סיום קורסים ומדדי שיפור.</p>
                        <p className="text-[10px] text-[var(--text-muted)]">דוגמה: מדריך שה-תלמידים שלו משתפרים ב-30% בממוצע אחרי 3 אימונים → דירוג הדרכה גבוה.</p>
                      </div>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--text-primary)]">איך ELO עובד — בפשטות:</p>
                        <p>דמיינו שני מדריכים מתחרים בתרגיל ירי מדוד. אם מדריך עם דירוג 1600 מנצח מדריך עם 1800 — הוא מקבל <strong>הרבה</strong> נקודות, כי הוא ניצח מישהו חזק ממנו.</p>
                        <p>אבל אם ה-1800 מנצח את ה-1600 — הוא מקבל מעט נקודות, כי זה היה צפוי.</p>
                        <p className="font-semibold text-[var(--accent-amber)]">כל נקודה בדירוג <strong>הורווחה</strong>, לא ניתנה.</p>
                      </div>
                      <div className="bg-[var(--bg-card)] rounded-lg p-3 space-y-2">
                        <p className="font-bold text-[var(--text-primary)]">⭐ דירוג כוכבים</p>
                        <p>בנוסף ל-ELO, כל מדריך מקבל <strong>כוכבים מ-1 עד 5</strong> על סמך ממוצע הביקורות של המתאמנים. 5 כוכבים = שירות מושלם.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
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
          onCategorySelect={(id) => { setSelectedCategory(id); if (!id) setSelectedLevel(null); }}
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          sortMode={sortMode}
          onSortChange={setSortMode}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      {/* Featured Instructor */}
      {featuredInstructor && !query && !filters.city && (
        <div className="px-4 mt-4 max-w-2xl mx-auto">
          <FeaturedInstructor instructor={featuredInstructor} />
        </div>
      )}

      {/* Results count */}
      <div className="px-4 mt-4 max-w-2xl mx-auto">
        <span className="text-xs text-[var(--text-muted)]">{filtered.length} תוצאות</span>
      </div>

      {/* Results */}
      <div className="px-4 mt-3 max-w-2xl mx-auto space-y-3">
        {filtered.map((instructor, i) => (
          <InstructorCard key={instructor.id} instructor={instructor} index={i} />
        ))}
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/972558816868"
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
