import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  total: number;
  medicos: Medico[] = [];
  nombre: string;

// tslint:disable-next-line: variable-name
  constructor(public _serviceMedico: MedicoService) { }

  ngOnInit() {

    this.getMedicos();
  }

  getMedicos(){
    this._serviceMedico.getMedicos().subscribe( (res: any) => { 
      console.log(res);
      this.medicos =  res.medicos;
      this.total = res.total;
    });
  }

  guardarMedico(medico: Medico) {
    this._serviceMedico.saveMedicos(medico).subscribe( (resp: any) => { 
      console.log(resp);
    });

  }

  borrarMedico(medico: Medico) {
    console.log(medico._id);
    this._serviceMedico.deleteMedico(medico._id).subscribe(resp => { 
      console.log(resp);
      this.getMedicos();
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.getMedicos();
      return;
    }

    console.log(termino);
    this._serviceMedico.searchMedico(termino).subscribe( (resp: any) => {      
      this.medicos = resp.medicos;
    });
  }

}
