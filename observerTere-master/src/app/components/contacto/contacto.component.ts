import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactoForm: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _contactoService: ContactoService,
    private aRouter: ActivatedRoute
    ) {
    this.contactoForm = this.fb.group({
      asunto: ['', Validators.required],
      correo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  enviarCorreo() {
      const CONTACTO = {
        asunto: this.contactoForm.get('asunto')?.value,
        correo: this.contactoForm.get('correo')?.value,
        nombre: this.contactoForm.get('nombre')?.value,
        descripcion: this.contactoForm.get('descripcion')?.value,
      }
      console.log(CONTACTO)
      if (this.id !== null) {
        this._contactoService.enviarCorreo(CONTACTO).subscribe(data => {
          this.toastr.success('Mensaje enviado con éxito');
          this.router.navigate(['/contacto']);
        }, error => {
          console.log(error);
          this.contactoForm.reset();
        });
      }
    }
  }