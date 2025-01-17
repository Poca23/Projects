const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const projectPath = path.resolve(__dirname);
const backupPath = path.resolve(__dirname, "../backups");

if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath, { recursive: true });
}

const date = new Date();
const backupFolderName =
  "backup_" +
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  date.getDate().toString().padStart(2, "0") +
  "_" +
  date.getHours().toString().padStart(2, "0") +
  "-" +
  date.getMinutes().toString().padStart(2, "0") +
  "-" +
  date.getSeconds().toString().padStart(2, "0");
const currentBackupPath = path.resolve(backupPath, backupFolderName);

exec(
  "cp -r " + projectPath + " " + currentBackupPath,
  (error, stdout, stderr) => {
    if (error) {
      console.error("Erreur lors de la sauvegarde: " + error.message);
      return;
    }
    if (stderr) {
      console.error("Erreur lors de la sauvegarde: " + stderr);
      return;
    }
    console.log("Sauvegarde réussie dans " + currentBackupPath);

    const backups = fs
      .readdirSync(backupPath)
      .filter((folder) => folder.startsWith("backup_"));
    backups.forEach((folder) => {
      const folderPath = path.resolve(backupPath, folder);
      const stats = fs.statSync(folderPath);
      const now = new Date().getTime();
      const endTime =
        new Date(stats.mtime).getTime() + 30 * 24 * 60 * 60 * 1000;

      if (now > endTime) {
        exec("rm -rf " + folderPath, (error, stdout, stderr) => {
          if (error) {
            console.error(
              "Erreur lors de la suppression de la sauvegarde " +
                folder +
                ": " +
                error.message
            );
            return;
          }
          if (stderr) {
            console.error(
              "Erreur lors de la suppression de la sauvegarde " +
                folder +
                ": " +
                stderr
            );
            return;
          }
          console.log("Ancienne sauvegarde supprimée: " + folderPath);
        });
      }
    });
  }
);
