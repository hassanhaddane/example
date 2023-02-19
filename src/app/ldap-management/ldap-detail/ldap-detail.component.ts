import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
//import { UsersService } from '../service/users.service';
//import { UserLdap } from '../model/user-ldap';
import { FormBuilder } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordValidator } from './passwords-validator.directive';
import { UserLdap } from 'src/app/model/user-ldap';

// TODO verifier le @inject dans cette situation si tout est ok ?
@Inject({
})

export abstract class LdapDetailComponent {
  user: UserLdap;
  processLoadRuning = false;
  processValidateRunning = false;
  // placeholder password pour edition
  passwordPlaceHolder: string;
  // initialisation variable pour message erreur
  errorMessage = "";

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  userForm = this.fb.group({
    login: [''], //valeur vide au départ
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordValidator }),
    mail: {value: '', disabled: true},
  });

  protected constructor(
    public addForm: boolean,
    //private usersService: UsersService, 
    //private route: ActivatedRoute,
    // A voir => protected route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    ) {
      this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
    }

  protected ngOnInit() :void {
    //this.getUser();
  }

  isFormValid(): boolean {
    return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void;

  private formGetValue(name: string): any { 
    return this.userForm.get(name).value;
  }

  goToLdap() : void {
    this.router.navigate(['/users/list']);
  }

  onSubmitForm() {
    this.validateForm();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom')
      + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase()
      + '@epsi.lan');
    }
  }

  protected copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);
    /*
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
    */
  }

  protected getUserFormFormControl(): UserLdap {
    return {
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      // valeur devant être reprise depuis le formulaire
      employeNumero: 1, // this.userForm.get('employeNumero').value,
      employeNiveau: 1, // this.userForm.get('employeNiveau').value,
      dateEmbauche: '2020-04-24', // this.userForm.get('dateEmbauche').value,
      publisherId: 1, // this.userForm.get('publisherId').value,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }
}
