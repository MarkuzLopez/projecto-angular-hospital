import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../componentes/modal-img/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  Hospitales: [] = [];
  cargando: boolean;
  hospitall: Hospital;
  nombre: string;
  total: number;
// tslint:disable-next-line: variable-name
  constructor(private _serviceHospital: HospitalesService, public modalservice: ModalUploadService) { }

  ngOnInit() {
  this.getHospitales();
  this.modalservice.notificacion.subscribe(resp => { 
      console.log();
      this.getHospitales();
   });
  }

  getHospitales(){
    this._serviceHospital.getHospitales().subscribe( resp => {
       console.log(resp);
       this.Hospitales = resp.hospitales;
       this.cargando = false;
       this.total = resp.total;
    });
  }

  updateHospital(hospital: Hospital) { 
    console.log(hospital);
  this._serviceHospital.updateHospital(hospital).subscribe( (resp: any) => { 
     swal.fire('Hospita actualizado', resp.nombre, 'success');    
  }, error => { console.error('erro al actulizar', error) })
  }

  eliminarHospital(id: string) {
    console.log(id);
    swal.fire({
      title: '¿Estas seguro ?',
      text: "No habra cambio, si se elimina!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
          
      this._serviceHospital.deleteHospital(id).subscribe(resp => {
        console.log(resp);
        this.cargando = false;
        this.getHospitales();
      });
        swal.fire(
          'Hospital!',
          'Eliminado correctamente .',
          'success'
        )
      }
    })
  }

  buscarHospital(palabra: string) { 
    if(palabra.length <= 0 ) { 
      this.getHospitales();
      return;
    }
    this.cargando = true;
    this._serviceHospital.buscarHospital(palabra).subscribe((resp: any) => { 
      console.log(resp);
      this.Hospitales = resp.hospitales;
      this.cargando = false;
    })
  }

  mostrarModalImg(id: string) {
    this.modalservice.mosstrarModal('hospitales', id);
  }

  guardarHospital(nombre: string) { 
    if(nombre !== '' && nombre !== undefined) { 
      console.log('guardar');
      this._serviceHospital.createHospital(nombre).subscribe(resp => { 
        console.log(resp);
        swal.fire('Se Guardo Correctamente', '', 'success');
        this.getHospitales();
      }, error => {console.log('Erro al guardar', error)});
    } else { 
      swal.fire('Ingrese Nombre de Hospital','','error');
      return;
    }
  }

}
