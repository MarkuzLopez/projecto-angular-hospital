import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../models/hospital.model';
import { HospitalesService } from '../../../services/hospital/hospitales.service';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../../componentes/modal-img/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital [] = [];
  medico: Medico = new Medico();
  hospital: Hospital = new Hospital('');


  constructor(private serviceHosppital: HospitalesService, 
              private medicoService: MedicoService,
              private router: Router,
              private activatedRouter: ActivatedRoute, 
              public modalService: ModalUploadService
              ) {
               this.activatedRouter.params.subscribe( paramas => {
                 let id = paramas['id'];
                 console.log(id);
                 if ( id !== 'nuevo') {
                   this.getMedico(id);
                 }
               });
              }

  ngOnInit() {
    this.getHospitales();
    this.modalService.notificacion.subscribe(resp => {
      console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  getHospitales() {
    this.serviceHosppital.getHospitales().subscribe((res: any) => {
      this.hospitales = res.hospitales;
    });
  }

  getMedico(id: string) {
    this.medicoService.getMedico(id).subscribe((resp: any) => {
      this.medico = resp.medico;
      this.medico.hospital = resp.medico.hospital;
      console.log(resp.medico);
      console.log(this.medico.hospital);
      this.cambioHospital(this.medico.hospital._id);
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.medicoService.saveMedicos(this.medico).subscribe( (res: any) => {
      this.medico._id =  res._id;
      this.router.navigate(['/medico', res._id]);
      swal.fire('Medico Creado Correctamente', res.nombre , 'success');
    });
  }

  cambioHospital(id: string) {
    this.serviceHosppital.getHospital(id).subscribe((resp: any) => {
      console.log(resp);
      this.hospital = resp.hospital;
      console.log(this.hospital);
    }, error => { console.error(error);
     });
  }

  mostrarModal() {
    this.modalService.mosstrarModal('medicos', this.medico._id);
  }

}
