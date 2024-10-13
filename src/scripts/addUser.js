const readlineSync = require("readline-sync");
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../../.env");

const loadEnv = () => {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, "");
  }
  const envContent = fs.readFileSync(envPath, "utf-8");
  return envContent;
};

const saveEnv = (newContent) => {
  fs.writeFileSync(envPath, newContent, "utf-8");
  console.log(".env atualizado com sucesso!");
};

const updateEnv = (platform, email) => {
  let envContent = loadEnv();
  let envVar =
    platform === "Github" ? "ALLOWED_GITHUB_EMAILS" : "ALLOWED_GOOGLE_EMAILS";

  const regex = new RegExp(`^${envVar}=(.*)`, "m");
  const match = envContent.match(regex);

  if (match) {
    let existingEmails = match[1].split(",").map((e) => e.trim());
    if (!existingEmails.includes(email)) {
      existingEmails.push(email);
      envContent = envContent.replace(
        regex,
        `${envVar}=${existingEmails.join(",")}`
      );
    } else {
      console.log("O e-mail já está na lista.");
    }
  } else {
    envContent += `\n${envVar}=${email}`;
  }

  saveEnv(envContent);
};

const platforms = ["Github", "Google"];
const platformIndex = readlineSync.keyInSelect(
  platforms,
  "Escolha a plataforma:",
  { cancel: false }
);
const platform = platforms[platformIndex];

const email = readlineSync.questionEMail("Digite o novo e-mail: ");

updateEnv(platform, email);
