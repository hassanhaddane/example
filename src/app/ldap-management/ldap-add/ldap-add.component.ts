import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';
import { LdapDetailComponent } from '../ldap-detail/ldap-detail.component';


@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.scss']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit {
  constructor(private usersService: UsersService,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar) {
  super(true, fb, router);
}

ngOnInit(): void {
    super.ngOnInit();
}

validateForm(): void {
  console.log('LdapAddComponent - validateForm');
  this.processValidateRunning = true;
  this.usersService.addUser(this.getUserFormFormControl()).subscribe(
    data => {
      this.processValidateRunning = false;
      this.errorMessage = '';
      this.snackBar.open('Utilisateur créé avec succés', 'X');
    },
    error => {
      this.processValidateRunning = false;
      this.errorMessage = 'L\'utilisateur n\'a pas pu être ajouté !';
      this.snackBar.open('Erreur lors de la création de l\'utilisateur !', 'X');
    }
  );
}
}
