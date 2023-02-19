import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';
//import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapEditComponent extends LdapDetailComponent implements OnInit {

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar) {
  super(false, fb, router);
  }
  ngOnInit(): void {
    super.ngOnInit();
    // récupération de l'utilisateur
    this.getUser();
  }

  validateForm(): void {
    console.log('LdapEditComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFormFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur modifié avec succés !', 'X');
      },
      error => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue lors de la modification';
        this.snackBar.open('Utilisateur non modifié !', 'X');
      }
    )
  }

  private getUser(): void {
  const login = this.route.snapshot.paramMap.get('id');
  //console.log("getUser : " + login)
  //this.usersService.getUser(login).subscribe(
  //  user => { this.user = user; console.log("LdapDetail getUser : "); console.log(user); }
  //);
  this.processLoadRuning = true;
  this.usersService.getUser(login).subscribe(
    user => {
      this.user = user;
      this.copyUserToFormControl();
      this.processLoadRuning = false;
    },
    error => {
      this.processLoadRuning = false;
      this.errorMessage = 'L\'utilisateur n\'existe pas !';
      this.snackBar.open('Utilisateur non trouvé !', 'X');
    }
    );
  }
}
