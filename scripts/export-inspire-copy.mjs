import fs from "node:fs";
import parser from "next/dist/compiled/babel/parser.js";

const { parse } = parser;

const sourcePath = new URL("../app/inspire/page.js", import.meta.url);
const source = fs.readFileSync(sourcePath, "utf8");
const ast = parse(source, { sourceType: "module", plugins: ["jsx"] });
const strings = [];

function visit(node, parentType = "") {
  if (!node || typeof node !== "object") return;
  if (node.type === "StringLiteral" && parentType !== "ImportDeclaration") {
    const value = node.value.replace(/\s+/g, " ").trim();
    if (
      value.length > 2 &&
      /[A-Za-zĀ-žА-Яа-яЁё]/.test(value) &&
      !value.startsWith("/") &&
      !value.startsWith("./") &&
      !value.includes("@/") &&
      !value.includes(".jpeg") &&
      !value.includes(".jpg") &&
      !value.includes(".png") &&
      !value.includes("mailto:") &&
      !value.includes("http")
    ) {
      strings.push({ line: node.loc.start.line, value });
    }
  }
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => visit(child, node.type));
    else if (value && typeof value === "object" && value.type) visit(value, node.type);
  }
}

visit(ast.program);
const unique = [...new Map(strings.map((item) => [`${item.line}:${item.value}`, item])).values()];
console.log("# Art Studio Inspire copy inventory");
console.log(`# ${unique.length} source strings from app/inspire/page.js\n`);
for (const { line, value } of unique) console.log(`${line}\t${value}`);
