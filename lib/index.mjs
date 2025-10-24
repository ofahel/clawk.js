import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho padrão dentro do módulo (global ou node_modules local)
let basePath = path.join(__dirname, "data");

// Verificar se os arquivos NÃO existem nesse local → então tentar fallback no projeto
if (!fs.existsSync(path.join(basePath, "countries.json"))) {
  // 📌 Isso cobre o caso: "node ."
  basePath = path.join(process.cwd(), "node_modules", "clawk.js", "lib", "data");
}

const countriesPath = path.join(basePath, "countries.json");
const languagesPath = path.join(basePath, "languages.json");

// Ler JSON do arquivo usando fs
const countries = JSON.parse(fs.readFileSync(countriesPath, "utf-8"));
const languages = JSON.parse(fs.readFileSync(languagesPath, "utf-8"));

// Converte timestamp Unix em string legível
function toDate(unix) {
  if (!unix || isNaN(Number(unix))) return null;
  const d = new Date(Number(unix) * 1000);
  return d.toISOString().replace("T", " ").split(".")[0];
}

// Helper para extrair valor de uma chave via regex
function extractValueByKey(key, text) {
  // Sub-função para "des-escapar" Unicode (\uXXXX) em caracteres reais
  function unescapeString(str) {
    return str.replace(/\\u([\dA-F]{4})/gi, (_, grp) => String.fromCharCode(parseInt(grp, 16)));
  }

  // Captura valores: strings, números, booleans ou null
  const regex = new RegExp(`"${key}"\\s*:\\s*(?:"([^"]*)"|(\\d+)|true|false|null)`, "i");
  const match = text.match(regex);
  if (!match) return null;

  if (match[1] !== undefined) return unescapeString(match[1]); // string já unescaped
  if (match[2] !== undefined) return Number(match[2]);         // número
  if (/true/i.test(match[0])) return true;                    // boolean true
  if (/false/i.test(match[0])) return false;                  // boolean false
  return null;                                                // null
}


// Extrai dados do HTML sem JSON.parse
function extractUserData(html) {
  const scriptMatch = html.match(
    /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">([\s\S]*?)<\/script>/
  );
  if (!scriptMatch) return null;

  const scriptText = scriptMatch[1];

  // Cria objeto manualmente usando regex
  const user = {
    id: extractValueByKey("id", scriptText),
    uniqueId: extractValueByKey("uniqueId", scriptText),
    nickname: extractValueByKey("nickname", scriptText),
    signature: extractValueByKey("signature", scriptText),
    avatarLarger: extractValueByKey("avatarLarger", scriptText),
    verified: extractValueByKey("verified", scriptText),
    secUid: extractValueByKey("secUid", scriptText),
    privateAccount: extractValueByKey("privateAccount", scriptText),
    secret: extractValueByKey("secret", scriptText),
    createTime: extractValueByKey("createTime", scriptText),
    uniqueIdModifyTime: extractValueByKey("uniqueIdModifyTime", scriptText),
    nickNameModifyTime: extractValueByKey("nickNameModifyTime", scriptText),
    language: extractValueByKey("language", scriptText),
  };

  const stats = {
    followerCount: extractValueByKey("followerCount", scriptText),
    followingCount: extractValueByKey("followingCount", scriptText),
    heartCount: extractValueByKey("heartCount", scriptText),
    heart: extractValueByKey("heart", scriptText),
    videoCount: extractValueByKey("videoCount", scriptText),
    diggCount: extractValueByKey("diggCount", scriptText),
    friendCount: extractValueByKey("friendCount", scriptText),
  };

  return { user, stats };
}

// Função principal
export async function getUserInfo(username) {
  if (!username) throw new Error("Username is required.");
  username = username.replace(/^@/, "");

  const url = `https://www.tiktok.com/@${username}?lang=en`;
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.google.com/"
  };

  const res = await fetch(url, { headers, redirect: "follow" });
  if (!res.ok) throw new Error(`TikTok returned HTTP ${res.status}`);

  const html = await res.text();

  const data = extractUserData(html);
  if (!data) throw new Error("Could not extract user data via regex.");

  return data;
}