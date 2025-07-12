import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { NavbarAdministradorComponent } from '../../../../Componentes/navbar-administrador/navbar-administrador.component';
import { User, UsersService } from '../../../../services/usuarios.service';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

declare var $: any;
declare var Swal: any;

//HttpClient
@Component({
  selector: 'app-consultar',
  imports: [ CommonModule, FormsModule, NavbarAdministradorComponent, ReactiveFormsModule],
  templateUrl: './consultar.component.html',
  //standalone: true,
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent implements OnInit{

  error: String|null= null;
  loading: Boolean= false

  todos: User[] =[]
  todos_editar:any ;

ActualizarUserForm: FormGroup;
  
  constructor (private userService: UsersService, private act_usuario: FormBuilder){


    this.ActualizarUserForm = this.act_usuario.group({//requerido, valores nulos,       expresiones regulares, mínimo y máximo
    v_nombre: ['', [Validators.required,  Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
    v_apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]{3,30}$')]],
    v_documento: ['', [Validators.required,Validators.pattern('^[0-9]{6,12}$')]],
    v_telefono: ['', [Validators.required,Validators.pattern('^[0-9]{7,10}$')]],
    v_usuario: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
  //v_nombre: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+)?$')]],
  })


  }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(): void{
    this.userService.getUsers().subscribe(todos =>{ this.todos = todos;
      setTimeout(() => {
      ($('#myTable') as any).DataTable({
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",},
            order: []
        }); ;

      // Destruye DataTable si ya existe
      
    }, 1  );
    });
    
  }

  v_id: number=0
   mostrarPrimero = true;
  editar(id: number ){
    this.v_id=id;
      this.mostrarPrimero = false;
      const R_usuario={id}

     this.userService.getUser(R_usuario).subscribe({
    next:(todos)=>{
       this.todos_editar = todos;
       console.log(this.todos_editar)

      this.ActualizarUserForm.patchValue({
    v_nombre: this.todos_editar.nombre,
    v_apellido: this.todos_editar.apellido,
    v_documento: this.todos_editar.documento,
    v_telefono: this.todos_editar.telefono,
    v_usuario: this.todos_editar.usuario
    
  });

 
    },error: (error)=>{
      console.log(error)
    } 
        
  });
  
    
  }


  actualizar(){
    console.log("Se va actualizar la id", this.v_id)
    const id= this.v_id
     const nombre= String(this.ActualizarUserForm.value.v_nombre);
  const apellido= String(this.ActualizarUserForm.value.v_apellido);
  const documento= String(this.ActualizarUserForm.value.v_documento);
  const telefono= String(this.ActualizarUserForm.value.v_telefono);
  const usuario= String(this.ActualizarUserForm.value.v_usuario);
 const estado=Boolean(1);
  const id_rol= Number(2);
       const R_usuario={
    nombre,  apellido, documento, telefono,usuario, id, estado, id_rol
  }

       this.userService.UpdateUser(R_usuario).subscribe({
    next:(todos)=>{
       this.todos_editar = todos;
       console.log(this.todos_editar)

        

    
Swal.fire({
  title: "Usuario actualizado",
  icon: "success",
  draggable: true
});

    },error: (error)=>{
      console.log(error)
    } 
        
  });


  }

  //  ngAfterViewInit(): void {
  //     ($('#myTable') as any).DataTable();

   
  // }
  
}
