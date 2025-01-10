const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Définir le chemin de votre projet et du dossier de sauvegarde
const projectPath = path.resolve(__dirname);
const backupPath = path.resolve(__dirname, "../../backups");

// Créer le dossier de sauvegarde s'il n'existe pas
if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
}

// Créer un nom unique pour chaque sauvegarde basée sur la date et l'heure actuelle
const date = new Date();
const backupFolderName = `backup_${date.getFullYear()}-${(date.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}_${date
  .getHours()
  .toString()
  .padStart(2, "0")}-${date.getMinutes().toString().padStart(2, "0")}-${date
  .getSeconds()
  .toString()
  .padStart(2, "0")}`;
const currentBackupPath = path.resolve(backupPath, backupFolderName);

// Commande pour copier tous les fichiers et dossiers du projet dans le dossier de sauvegarde
exec(`cp -r ${projectPath} ${currentBackupPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erreur lors de la sauvegarde: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erreur lors de la sauvegarde: ${stderr}`);
    return;
  }
  console.log(`Sauvegarde réussie dans ${currentBackupPath}`);
});
