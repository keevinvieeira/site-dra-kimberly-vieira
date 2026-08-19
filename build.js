const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

// Limpa ou cria o diretório dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copia arquivos HTML e de configuração
const filesToCopy = [
  'index.html',
  'sobre.html',
  'procedimentos.html',
  'contato.html',
  '.assetsignore'
];

filesToCopy.forEach(file => {
  const src = path.join(srcDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, file));
  }
});

// Copia pasta assets
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const items = fs.readdirSync(source);
  items.forEach(item => {
    const srcPath = path.join(source, item);
    const targetPath = path.join(target, item);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyFolderRecursiveSync(srcPath, targetPath);
    } else {
      fs.copyFileSync(srcPath, targetPath);
    }
  });
}

const assetsSrc = path.join(srcDir, 'assets');
if (fs.existsSync(assetsSrc)) {
  copyFolderRecursiveSync(assetsSrc, path.join(distDir, 'assets'));
}

console.log('✅ Build concluído com sucesso em ./dist');
