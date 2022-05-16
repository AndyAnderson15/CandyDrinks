import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo='Crear producto';
  id: string | null;

  /*file: File;
  photoSelected: string | ArrayBuffer | null;*/

  constructor(private fb: FormBuilder, private router: Router,
     private toastr: ToastrService,
     private _productoService: ProductoService,
     private aRoute: ActivatedRoute ) {

    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
      precio: ['', Validators.required],
      
    })
    this.id= this.aRoute.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      imagen: this.productoForm.get('imagen')?.value,
      precio: this.productoForm.get('precio')?.value,

    }

      if(this.id!== null){
        //editamos producto

        this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
          this.toastr.success('El producto fue actualizado con exito', 'Producto actualizado');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.productoForm.reset();        
        })

      }else{
        //agregamos producto
        this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
          this.toastr.success('El producto fue registrado con exito', 'Producto registrado');
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
          this.productoForm.reset();
        
        })
      }
  }

  esEditar(){
    if (this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          imagen: data.imagen,
          precio: data.precio,
        })
      })
    }
  }


 /* onPhotoSelected(event: HtmlInputEvent): void {
    if(event.target.files && event.target.files[0]){
    this.file = <File>event.target.files[0];
      //imagen
      const reader =  new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
    
  }*/


}
