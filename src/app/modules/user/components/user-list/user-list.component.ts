import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  userForm!: FormGroup;
  showDialog = false;
  isEditMode = false;
  selectedUser!: User | null;

  statusOptions = [
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 },
  ];

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      idusuario: [null],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estatus: [1, Validators.required],
      fecharegistro: [{ value: this.getCurrentDate(), disabled: true }],
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
      },
    });
  }

  openNew() {
    this.userForm.reset();
    this.userForm.patchValue({
      fecharegistro: this.getCurrentDate(),
      estatus: 1,
    });
    this.isEditMode = false;
    this.selectedUser = null;
    this.showDialog = true;
  }

  editUser(user: User) {
    this.userForm.patchValue(user);
    this.isEditMode = true;
    this.selectedUser = user;
    this.showDialog = true;
  }

  saveUser() {
    if (this.userForm.valid) {
      const user: User = { ...this.userForm.getRawValue() };

      if (this.isEditMode && user.idUsuario) { 
        this.userService.updateUser(user).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
            this.getUsers();
            this.showDialog = false;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
          },
        });
      } else {
        this.userService.createUser(user).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Usuario creado correctamente.', 'success');
            this.getUsers();
            this.showDialog = false;
          },
          error: () => {
            Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
          },
        });
      }
    }
  }

  deleteUser(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Usuario eliminado correctamente.', 'success');
            this.getUsers();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          },
        });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private getCurrentDate(): string {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }
}
