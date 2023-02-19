import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
//import { LDAP_USERS } from '../model/ldap-mock-data';
// nous utilisons désormais le service 'users.service.ts', et non plus le fichier mock
//import { LDAP_USERS } from '../model/ldap-mock-data';
//import { UserLdap } from '../ldap-management/model/user-ldap';
import { UsersService } from 'src/app/service/users.service';
import { UserLdap } from 'src/app/model/user-ldap';
//import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.scss']
})
export class LdapListComponent implements OnInit {//, AfterViewInit {

  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  // Suite à la modification de l'import { LDAP_USERS } ... =>
  //dataSource = new MatTableDataSource<UserLdap>(LDAP_USERS);
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private usersService: UsersService, private router: Router) {
  }
  

  ngOnInit(): void {
    //console.log('Values on ngOnInit() :');
    this.dataSource.paginator = this.paginator;
    //this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    //console.log('Mat Paginator : ', this.paginator);
    this.getUsers();
  }

  filterPredicate(data, filter): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /*
  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit() :');

    console.log('Mat Paginator : ', this.paginator);
  }
  */
  unactiveSelected = false;
  private getUsers(): void {
    /*
    this.dataSource.data = LDAP_USERS;
    if (this.unactiveSelected) {
      this.dataSource.data = this.dataSource.data.filter( user =>
        user.active === false
        );
    }*/
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter( user => user.active ==false);
        } else {
          this.dataSource.data = users
        }
      });
  }

  addUser() {
    this.router.navigate(['/user/add']).then( (e) => {
      if(!e) {
        console.log('Navigation has failed !');
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }
  edit(login: string) {
    this.router.navigate(['/user', login]).then((e) => {
      if(!e) {
        console.log("Navigation has failed");
      }
    });
  }
}
