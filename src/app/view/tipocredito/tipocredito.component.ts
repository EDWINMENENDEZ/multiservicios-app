import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCredito } from 'src/app/model/tipocredito';
import { StorageService } from 'src/app/service/storage.service';
import { WebServices } from 'src/app/service/web.service';

@Component({
  selector: 'app-tipocredito',
  templateUrl: './tipocredito.component.html',
  styleUrls: ['./tipocredito.component.css']
})
export class TipocreditoComponent implements OnInit {

 
  public _datos:TipoCredito[]= [];

  constructor(private service:WebServices,private snackBar: MatSnackBar,private router: Router,public rutaActiva: ActivatedRoute,public storageService: StorageService) { 

    if(storageService.getUserToken().data[0].tipousuario.descripcion != "Administrador"){
      alert("Usuario sin accesos");
      this.router.navigate(['/principal']);
    } }

  ngOnInit(): void {
    this.buscar();
  }


  buscar(){

      this.service.getTipoCredito().subscribe(data => {
        this._datos=data 
      });

  }

  grabar(){
    this.router.navigate(['./tipocreditotecleo',0], { relativeTo: this.rutaActiva });
  }

  modificar(data:TipoCredito){
    this.router.navigate(['./tipocreditotecleo',data.id], { relativeTo: this.rutaActiva });
  }

  eliminar(data:TipoCredito){
    const respuesta = confirm("¿Esta seguro que desea eliminar el registro?. Ya no podra recuperarlo.");
    if (respuesta) {
      
      this.service.deleteTipoCredito(data).subscribe(()=>{
        this.buscar()
      })
    }
  }

}
