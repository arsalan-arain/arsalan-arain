// Renders stats.svg and langs.svg for the profile README from the GitHub GraphQL API.
// Runs in GitHub Actions with GITHUB_TOKEN; no third-party service involved.
import { mkdirSync, writeFileSync } from "node:fs";

const login = process.env.GH_LOGIN || "arsalan-arain";
const token = process.env.GITHUB_TOKEN;
const out = process.env.OUT_DIR || "dist";

const q = `query($login:String!){ user(login:$login){
  followers{ totalCount } pullRequests{ totalCount } issues{ totalCount }
  contributionsCollection{ totalCommitContributions restrictedContributionsCount contributionCalendar{ totalContributions } }
  repositories(ownerAffiliations:OWNER, first:100, isFork:false){ totalCount nodes{ stargazerCount languages(first:10, orderBy:{field:SIZE, direction:DESC}){ edges{ size node{ name color } } } } }
}}`;

const res = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: { authorization: `bearer ${token}`, "content-type": "application/json", "user-agent": "profile-stats" },
  body: JSON.stringify({ query: q, variables: { login } }),
});
const json = await res.json();
if (!json.data?.user) { console.error(JSON.stringify(json)); process.exit(1); }
const u = json.data.user;

const stars = u.repositories.nodes.reduce((s, r) => s + r.stargazerCount, 0);
const commits = u.contributionsCollection.totalCommitContributions + u.contributionsCollection.restrictedContributionsCount;
const langs = {};
for (const r of u.repositories.nodes) for (const e of r.languages.edges) {
  langs[e.node.name] = langs[e.node.name] || { size: 0, color: e.node.color || "#8397B5" };
  langs[e.node.name].size += e.size;
}
const total = Object.values(langs).reduce((s, l) => s + l.size, 0) || 1;
const top = Object.entries(langs).sort((a, b) => b[1].size - a[1].size).slice(0, 6);

const BG = "#060B14", LINE = "#182740", CYAN = "#37E5FF", TEXT = "#DCE6F5", MUTED = "#8397B5", DIM = "#4E6082";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const frame = (w, h, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
<style>.t{font-family:ui-sans-serif,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif}.m{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}</style>
<rect width="${w}" height="${h}" rx="6" fill="${BG}" stroke="${LINE}"/>
<path d="M10 22V10H22M${w-10} 22V10H${w-22}M10 ${h-22}V${h-10}H22M${w-10} ${h-22}V${h-10}H${w-22}" fill="none" stroke="${CYAN}" stroke-width="1.2"/>
<text x="24" y="30" fill="${CYAN}" class="m" font-size="12" letter-spacing="1.5">${esc(title)}</text>
${body}</svg>`;

// stats card
const rows = [
  ["contributions, last year", u.contributionsCollection.contributionCalendar.totalContributions],
  ["of which in private repos", u.contributionsCollection.restrictedContributionsCount],
  ["pull requests", u.pullRequests.totalCount],
  ["issues", u.issues.totalCount],
  ["public repositories", u.repositories.totalCount],
  ["stars · followers", `${stars} · ${u.followers.totalCount}`],
];
const statsBody = rows.map(([k, v], i) => {
  const y = 62 + i * 21;
  return `<text x="24" y="${y}" fill="${MUTED}" class="t" font-size="13">${esc(k)}</text><text x="${470}" y="${y}" fill="${TEXT}" class="m" font-size="13" font-weight="600" text-anchor="end">${esc(v)}</text><line x1="24" y1="${y+6}" x2="470" y2="${y+6}" stroke="${LINE}"/>`;
}).join("");
mkdirSync(out, { recursive: true });
writeFileSync(`${out}/stats.svg`, frame(495, 195, "$ git log --author=arsalan --stat", statsBody));

// languages card
let x = 24; const barW = 446;
const bars = top.map(([n, l]) => { const w = Math.max(2, (l.size / total) * barW); const r = `<rect x="${x}" y="46" width="${w}" height="8" fill="${l.color}"/>`; x += w; return r; }).join("");
const legend = top.map(([n, l], i) => {
  const col = i % 2, row = Math.floor(i / 2), lx = 24 + col * 223, ly = 84 + row * 24;
  return `<rect x="${lx}" y="${ly-9}" width="9" height="9" rx="2" fill="${l.color}"/><text x="${lx+16}" y="${ly}" fill="${TEXT}" class="t" font-size="13">${esc(n)}</text><text x="${lx+205}" y="${ly}" fill="${DIM}" class="m" font-size="12" text-anchor="end">${((l.size/total)*100).toFixed(1)}%</text>`;
}).join("");
writeFileSync(`${out}/langs.svg`, frame(495, 165, "$ tokei --top 6", `<rect x="24" y="46" width="${barW}" height="8" fill="${LINE}"/>${bars}${legend}`));
console.log("wrote", `${out}/stats.svg`, `${out}/langs.svg`, { stars, commits, top: top.map((t) => t[0]) });
