import { db } from "./SQLite";

export function criaTabela() {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS Notas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);",
        [],
        () => {
          resolve("Tabela criada com sucesso!");
        },
        (_, error) => {
          console.log(`ocorreu um erro ao criar a tabela nota: ${error}`)
          reject(error);
        }
      );
    });
  });
}

export function adicionaNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "INSERT INTO Notas (titulo, categoria, texto) VALUES (?, ?, ?);",
        [nota.titulo, nota.categoria, nota.texto],
        () => {
          console.log("Nota adicionada com sucesso!");
          resolve("Nota adicionada com sucesso!");
        },
        (_, error) => {
          console.log(`erro ao adicionar a nota: ${error}`);
          reject(error);
          
        }
      );
    });
  });
}



export function atualizarNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "UPDATE Notas set titulo = ?, categoria = ?, texto = ? where id = ?;",
        [nota.titulo, nota.categoria, nota.texto,nota.id],
        () => {
          console.log("Nota atualizada com sucesso!");
          resolve("Nota atualizada com sucesso!");
        },
        (_, error) => {
          console.log(`erro ao atualizar a nota: ${error}`);
          reject(error);
          
        }
      );
    });
  });
}

export function removerNota(nota) {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM Notas where id = ?;",
        [nota.id],
        () => {
          console.log("Nota removida com sucesso!");
          resolve("Nota removida com sucesso!");
        },
        (_, error) => {
          console.log(`erro ao removida a nota: ${error}`);
          reject(error);
          
        }
      );
    });
  });
}


export async function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql('Select * FROM Notas;',
        [], (transaction, resultado) => {
          resolve(resultado.rows._array)
        })
    })
  })  
}

export async function buscaNotasPorCategoria(categoria) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql('Select * FROM Notas WHERE Categoria = ?;',
        [categoria], (transaction, resultado) => {
          resolve(resultado.rows._array)
        })
    })
  })  
}