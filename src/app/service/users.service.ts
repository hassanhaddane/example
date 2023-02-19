import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Liste des utilisateurs (mock file => ldap-mock-data.ts)
  users: UserLdap[] = LDAP_USERS; // ??? TODO : check if 'static' work
  static users: any;  // ??? à tester 


  addUser(user: UserLdap): Observable<UserLdap> {
    UsersService.users.push(user);
    return of(user);
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    // check
    const user = UsersService.users.find( u => u.login === userToUpdate.login );
    if (user) {
      // Modif
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }
    return throwError('Utilisateur non trouvé');
  }

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }

  getUser(login: string): Observable<UserLdap> {
    return of (this.users.find(user => user.login === login));
  }


  constructor() { }
}
