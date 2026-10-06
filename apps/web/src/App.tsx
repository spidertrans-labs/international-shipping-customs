import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Download,
  ExternalLink,
  FileJson,
  FileSpreadsheet,
  Globe2,
  PackageSearch,
  Search,
  ShieldAlert,
  XCircle
} from "lucide-react";
import { countries } from "@spidertrans/data";
import {
  CategorySchema,
  type Category,
  type CountryCode,
  type CustomsItem,
  type RestrictionStatus
} from "@spidertrans/schema";

type Language = "zh" | "en";

const REGISTER_URL =
  "https://spidertrans.cn/register-shipping?utm_source=github&utm_medium=referral&utm_campaign=international_shipping_customs&utm_content=web";

const copy = {
  zh: {
    product: "国际集运海关速查",
    subtitle: "澳大利亚 · 美国 · 加拿大 · 英国",
    recordCount: "条首发规则",
    sourceCount: "个官方来源",
    country: "目的国",
    category: "品类",
    allCategories: "全部品类",
    status: "限制状态",
    allStatuses: "全部状态",
    search: "搜索物品、成分或用途",
    results: "条结果",
    conditions: "运输条件",
    declaration: "申报提示",
    source: "官方来源",
    verified: "核验日期",
    noResults: "没有匹配结果，请更换关键词或筛选条件。",
    duty: "进口税费概览",
    declarationOverview: "申报与清关",
    officialSources: "官方来源",
    disclaimer: "免责声明",
    download: "下载当前结果",
    json: "JSON",
    csv: "CSV",
    register: "注册获取中国仓地址",
    contact: "info@spidertrans.com · +86 185 0105 3570 · 微信 HZZ99119",
    brand:
      "红蜘蛛集运提供专业的国际物流集运服务，注册即可获取仓库地址。",
    language: "切换为英文"
  },
  en: {
    product: "International Shipping Customs",
    subtitle: "Australia · United States · Canada · United Kingdom",
    recordCount: "launch records",
    sourceCount: "official sources",
    country: "Destination",
    category: "Category",
    allCategories: "All categories",
    status: "Restriction status",
    allStatuses: "All statuses",
    search: "Search an item, ingredient, or use",
    results: "results",
    conditions: "Shipping conditions",
    declaration: "Declaration notes",
    source: "Official source",
    verified: "Verified",
    noResults: "No match. Try another keyword or filter.",
    duty: "Duty and tax overview",
    declarationOverview: "Declaration and clearance",
    officialSources: "Official sources",
    disclaimer: "Disclaimer",
    download: "Download results",
    json: "JSON",
    csv: "CSV",
    register: "Register for a China warehouse address",
    contact: "info@spidertrans.com · +86 185 0105 3570 · WeChat HZZ99119",
    brand:
      "Spidertrans provides international consolidation services. Register to receive your warehouse address.",
    language: "Switch to Chinese"
  }
} as const;

const categoryLabels: Record<Category, { zh: string; en: string }> = {
  snacks: { zh: "食品零食", en: "Food and snacks" },
  "meat-dairy": { zh: "肉类乳制品", en: "Meat and dairy" },
  medicine: { zh: "药品", en: "Medicine" },
  supplements: { zh: "保健营养品", en: "Supplements" },
  cosmetics: { zh: "化妆品", en: "Cosmetics" },
  batteries: { zh: "电池", en: "Batteries" },
  electronics: { zh: "电子产品", en: "Electronics" },
  "alcohol-tobacco": { zh: "酒精烟草", en: "Alcohol and tobacco" },
  "seeds-plants": { zh: "种子植物", en: "Seeds and plants" },
  "liquids-aerosols": { zh: "液体喷雾", en: "Liquids and aerosols" }
};

const statusLabels: Record<
  RestrictionStatus,
  { zh: string; en: string; icon: typeof CheckCircle2 }
> = {
  allowed: { zh: "通常允许", en: "Allowed", icon: CheckCircle2 },
  conditional: { zh: "条件允许", en: "Conditional", icon: CircleHelp },
  restricted: { zh: "限制", en: "Restricted", icon: ShieldAlert },
  prohibited: { zh: "禁止", en: "Prohibited", icon: XCircle }
};

function currentItems(code: CountryCode): CustomsItem[] {
  return countries.find((entry) => entry.country.code === code)?.items ?? [];
}

function csvEscape(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}

function downloadFile(name: string, type: string, content: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export function App() {
  const [language, setLanguage] = useState<Language>("zh");
  const [countryCode, setCountryCode] = useState<CountryCode>("AU");
  const [category, setCategory] = useState<Category | "all">("all");
  const [status, setStatus] = useState<RestrictionStatus | "all">("all");
  const [query, setQuery] = useState("");

  const t = copy[language];
  const dataset = countries.find(
    (entry) => entry.country.code === countryCode
  )!;

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return dataset.items.filter((item) => {
      if (category !== "all" && item.category !== category) {
        return false;
      }
      if (status !== "all" && item.status !== status) {
        return false;
      }
      if (!normalized) {
        return true;
      }
      return [
        item.itemZh,
        item.itemEn,
        ...item.aliasesZh,
        ...item.aliasesEn,
        item.conditionsZh,
        item.conditionsEn
      ]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalized);
    });
  }, [category, dataset.items, query, status]);

  const sourceCount = new Set([
    ...countries.flatMap((entry) => entry.country.sourceUrls),
    ...countries.flatMap((entry) => entry.items.map((item) => item.sourceUrl))
  ]).size;

  function downloadJson() {
    downloadFile(
      `${countryCode.toLowerCase()}-customs.json`,
      "application/json",
      JSON.stringify(filteredItems, null, 2)
    );
  }

  function downloadCsv() {
    const headers = [
      "id",
      "country",
      "category",
      "itemZh",
      "itemEn",
      "status",
      "conditionsZh",
      "conditionsEn",
      "declarationNotesZh",
      "declarationNotesEn",
      "sourceUrl",
      "verifiedAt"
    ];
    const rows = filteredItems.map((item) =>
      headers.map((key) => csvEscape(String(item[key as keyof CustomsItem])))
    );
    downloadFile(
      `${countryCode.toLowerCase()}-customs.csv`,
      "text/csv;charset=utf-8",
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")
    );
  }

  return (
    <div className="site">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="./" aria-label="Spidertrans Customs">
            <span className="brand-mark">ST</span>
            <span>
              <strong>红蜘蛛集运</strong>
              <small>Spidertrans Open</small>
            </span>
          </a>
          <div className="header-actions">
            <a
              className="github-link"
              href="https://github.com/spidertrans-labs/international-shipping-customs"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ExternalLink size={15} aria-hidden="true" />
            </a>
            <button
              className="language-button"
              type="button"
              onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
              aria-label={t.language}
              title={t.language}
            >
              <Globe2 size={17} aria-hidden="true" />
              {language === "zh" ? "EN" : "中文"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="tool-intro">
          <div className="intro-inner">
            <div>
              <div className="eyebrow">
                <PackageSearch size={16} aria-hidden="true" />
                {t.subtitle}
              </div>
              <h1>{t.product}</h1>
            </div>
            <div className="intro-stats" aria-label="Dataset summary">
              <div>
                <strong>40</strong>
                <span>{t.recordCount}</span>
              </div>
              <div>
                <strong>{sourceCount}</strong>
                <span>{t.sourceCount}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="country-band" aria-label={t.country}>
          <div className="country-inner">
            {countries.map(({ country, items }) => (
              <button
                className={country.code === countryCode ? "country-tab active" : "country-tab"}
                type="button"
                key={country.code}
                onClick={() => setCountryCode(country.code)}
                aria-pressed={country.code === countryCode}
              >
                <span className="country-code">{country.code}</span>
                <span>{language === "zh" ? country.nameZh : country.nameEn}</span>
                <small>{items.length}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="filter-band">
          <div className="filter-inner">
            <label className="search-field">
              <Search size={19} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.search}
              />
            </label>
            <label>
              <span className="sr-only">{t.category}</span>
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as Category | "all")
                }
              >
                <option value="all">{t.allCategories}</option>
                {CategorySchema.options.map((value) => (
                  <option value={value} key={value}>
                    {language === "zh"
                      ? categoryLabels[value].zh
                      : categoryLabels[value].en}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">{t.status}</span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as RestrictionStatus | "all")
                }
              >
                <option value="all">{t.allStatuses}</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option value={value} key={value}>
                    {language === "zh" ? label.zh : label.en}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="content-band">
          <div className="content-grid">
            <aside className="country-panel">
              <div className="country-panel-head">
                <span className="country-symbol">{dataset.country.code}</span>
                <div>
                  <h2>
                    {language === "zh"
                      ? dataset.country.nameZh
                      : dataset.country.nameEn}
                  </h2>
                  <p>{dataset.country.authority}</p>
                </div>
              </div>

              <div className="policy-block">
                <h3>{t.duty}</h3>
                <p>
                  {language === "zh"
                    ? dataset.country.dutyThresholdZh
                    : dataset.country.dutyThresholdEn}
                </p>
                <p>
                  {language === "zh"
                    ? dataset.country.taxNotesZh
                    : dataset.country.taxNotesEn}
                </p>
              </div>

              <div className="policy-block">
                <h3>{t.declarationOverview}</h3>
                <p>
                  {language === "zh"
                    ? dataset.country.declarationNotesZh
                    : dataset.country.declarationNotesEn}
                </p>
              </div>

              <div className="policy-block">
                <h3>{t.officialSources}</h3>
                <div className="source-links">
                  {dataset.country.sourceUrls.map((url) => (
                    <a href={url} target="_blank" rel="noreferrer" key={url}>
                      {new URL(url).hostname}
                      <ChevronRight size={14} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="disclaimer">
                <CircleAlert size={16} aria-hidden="true" />
                <span>
                  <strong>{t.disclaimer}: </strong>
                  {language === "zh"
                    ? dataset.country.disclaimerZh
                    : dataset.country.disclaimerEn}
                </span>
              </p>
            </aside>

            <div className="results-area">
              <div className="results-head">
                <div>
                  <strong>{filteredItems.length}</strong>
                  <span>{t.results}</span>
                </div>
                <div className="download-actions">
                  <span>{t.download}</span>
                  <button type="button" onClick={downloadJson} title="JSON">
                    <FileJson size={16} aria-hidden="true" />
                    {t.json}
                  </button>
                  <button type="button" onClick={downloadCsv} title="CSV">
                    <FileSpreadsheet size={16} aria-hidden="true" />
                    {t.csv}
                  </button>
                  <Download size={18} aria-hidden="true" className="download-icon" />
                </div>
              </div>

              {filteredItems.length === 0 ? (
                <div className="empty-state">
                  <Search size={28} aria-hidden="true" />
                  <p>{t.noResults}</p>
                </div>
              ) : (
                <div className="items-grid">
                  {filteredItems.map((item) => {
                    const statusMeta = statusLabels[item.status];
                    const StatusIcon = statusMeta.icon;
                    return (
                      <article className="item-card" key={item.id}>
                        <div className="item-card-top">
                          <span
                            className={`status-badge status-${item.status}`}
                          >
                            <StatusIcon size={15} aria-hidden="true" />
                            {language === "zh"
                              ? statusMeta.zh
                              : statusMeta.en}
                          </span>
                          <span className="item-category">
                            {language === "zh"
                              ? categoryLabels[item.category].zh
                              : categoryLabels[item.category].en}
                          </span>
                        </div>
                        <h2>
                          {language === "zh" ? item.itemZh : item.itemEn}
                        </h2>
                        <p className="secondary-name">
                          {language === "zh" ? item.itemEn : item.itemZh}
                        </p>
                        <div className="item-detail">
                          <h3>{t.conditions}</h3>
                          <p>
                            {language === "zh"
                              ? item.conditionsZh
                              : item.conditionsEn}
                          </p>
                        </div>
                        <div className="item-detail">
                          <h3>{t.declaration}</h3>
                          <p>
                            {language === "zh"
                              ? item.declarationNotesZh
                              : item.declarationNotesEn}
                          </p>
                        </div>
                        <div className="item-footer">
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {t.source}
                            <ExternalLink size={14} aria-hidden="true" />
                          </a>
                          <span>
                            {t.verified}: {item.verifiedAt}
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <strong>红蜘蛛集运 / Spidertrans</strong>
            <p>{t.brand}</p>
          </div>
          <div className="footer-actions">
            <a className="register-button" href={REGISTER_URL}>
              {t.register}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <span>{t.contact}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
