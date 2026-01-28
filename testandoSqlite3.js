import pkg from 'sqlite3';
const sqlite3 = pkg.verbose();

const db = new sqlite3.Database(':memory:');

db.get('SELECT sqlite_version() AS version', (err, row) => {
  if (err) {
    console.error('Erro ao consultar a versão do SQLite:', err);
    return;
  }
  console.log('Versão do SQLite:', row.version);
  db.close();
});