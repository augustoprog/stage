import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { KeycloakService } from '../../keycloak';
import { Platform } from 'ionic-angular';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  public db: any;

  constructor(public http: HttpClient,
    private sqlite: SQLite,
    public keycloakService: KeycloakService,
    public platform: Platform) {
    this.platform.ready().then(() => {
      this.db = this.sqlite.create({
        name: 'cidadao.db',
        location: 'default'
      });
    });
  }

  public getDB() {
    return this.db;
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);

        //this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {

    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS temas_notifica (id_tema integer NOT NULL, ativo integer NOT NULL, nome_tema TEXT, usuario integer)'],
      ['CREATE TABLE IF NOT EXISTS recebe_notifica (id integer NOT NULL, sn_recebe string NOT NULL, usuario integer)'],
      ['CREATE TABLE IF NOT EXISTS notifica (id integer NOT NULL, ' +
        '                                    titulo string NOT NULL, ' +
        '                                    descricao string NOT NULL, ' +
        '                                    texto string NOT NULL, ' +
        '                                    dataCriacao string NOT NULL, ' +
        '                                    visualizado integer NOT NULL, ' +
        '                                    excluido integer NOT NULL, ' +
        '                                    usuario integer)']
    ])
      .then(() => console.log('tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  public insertNotifica(db: SQLiteObject, notifica) {
    this.keycloakService.getCidadaoLogado()
      .subscribe(cidadao => {
        db.executeSql('insert into notifica (id, titulo, descricao, texto, dataCriacao, visualizado, excluido, usuario)  ' +
          'values (?,?,?,?,?,?,?,?)', [notifica.id, notifica.titulo, notifica.descricao, notifica.texto, notifica.dataCriacao, 0, 0, cidadao ? cidadao.id : null])
          .then(() => console.log('notifica ' + notifica.titulo + ' incluído com sucesso!'))
          .catch(e => console.error('Erro ao incluir o notifica ' + notifica.titulo + e));
      });
  }

  public updateNotificaVisualizado(db: SQLiteObject, notifica) {
    this.keycloakService.getCidadaoLogado()
      .subscribe(cidadao => {
        let query = 'update notifica set visualizado = ? WHERE 1 = 1 AND id = ?'
        let params = [1, notifica.id];
        if (cidadao) {
          query = query + ' AND usuario = ?';
          params.push(cidadao.id);
        } else {
          query = query + ' AND usuario IS NULL';
        }
        db.executeSql(query, params)
          .then(() => console.log('alterado o notifica ' + notifica.id + ' visualizado para 1'))
          .catch(e => console.error('error', e));
      });
  }

  public deleteNotifica(db: SQLiteObject, notifica) {
    db.executeSql('delete from notifica ' +
      'where id = ?', [notifica.id])
      .then(() => console.log('notifica ' + notifica.titulo + ' deletado com sucesso!'))
      .catch(e => console.error('Erro ao deletar o notifica ' + notifica.titulo + e));
  }

  public insertTema(db: SQLiteObject, tema) {
    this.keycloakService.getCidadaoLogado()
      .subscribe(cidadao => {
        db.executeSql('insert into temas_notifica (id_tema, ativo, nome_tema, usuario) values (?,?,?,?)', [tema.id, 1, tema.titulo, cidadao ? cidadao.id : null])
          .then(() => console.log('Tema ' + tema.titulo + ' incluído com sucesso!'))
          .catch(e => console.error('Erro ao incluir o tema ' + tema.titulo + e));
      });
  }

  public deleteTema(db: SQLiteObject, tema) {
    db.executeSql('delete from temas_notifica where id_tema = ?', [tema.id])
      .then(() => console.log('Tema ' + tema.titulo + ' deletado com sucesso!'))
      .catch(e => console.error('Erro ao deletar o tema ' + tema.titulo + e));
  }

  public updateTemaAtivo(db: SQLiteObject, tema) {
    this.keycloakService.getCidadaoLogado()
      .subscribe(cidadao => {
        let query = 'update temas_notifica set ativo = ? where id_tema = ? '
        let params = [tema.ativo ? 1 : 0, tema.id];
        if (cidadao) {
          query = query + ' AND usuario = ?';
          params.push(cidadao.id);
        } else {
          query = query + ' AND usuario IS NULL';
        }
        db.executeSql(query, params)
          .then(() => console.log('alterado o tema ' + tema.id + ' para ' + tema.ativo))
          .catch(e => console.error('error', e));
      });
  }

}