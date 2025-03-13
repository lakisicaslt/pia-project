import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminServiceService } from '../services/admin-service.service';
import { Firma } from '../model/firma';
import { VlasnikServiceService } from '../services/vlasnik-service.service';

@Component({
  selector: 'app-druga-stavka-vlasnik',
  templateUrl: './druga-stavka-vlasnik.component.html',
  styleUrls: ['./druga-stavka-vlasnik.component.css']
})
export class DrugaStavkaVlasnikComponent {

  constructor(private router: Router, private userService: UserService, private adminService: AdminServiceService, private vlasnikService: VlasnikServiceService) { }

  firme: Firma[] = [];
  ime: string = "";
  adresa: string = "";
  sortColumn: string = '';
  sortOrder: string = 'asc';
  @ViewChild('canvasElement', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void{
    this.adminService.dohvFirme().subscribe(firme=>{
      this.firme = firme || [];
    })
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  pretraziFirme(){
    this.vlasnikService.pretraziFirme(this.ime, this.adresa).subscribe(firme=>{
      //console.log(this.adresa)
      this.firme = firme;
    })
  }

  sortFirme(column: string): void {
    if (this.sortColumn == column) {
      this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder = 'asc';
    }
    this.sortColumn = column;

    this.firme.sort((a, b) => {
      let compareA = a[column] ? a[column].toString().toLowerCase() : '';
      let compareB = b[column] ? b[column].toString().toLowerCase() : '';

      if (compareA < compareB) return this.sortOrder == 'asc' ? -1 : 1;
      if (compareA > compareB) return this.sortOrder == 'asc' ? 1 : -1;
      return 0;
    });
  }

  detaljiFirme(nazivFirme){

    localStorage.setItem('nazivFirme', nazivFirme);
    this.router.navigate(['/detaljiFirme'])
    
  }

  loadGardenLayout(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const layout = JSON.parse(e.target.result);
      this.drawGarden(layout);
    };
    reader.readAsText(file);
  }

  drawGarden(layout: any): void {
    
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    
    this.ctx.fillStyle = layout.bazen.color;
    this.ctx.fillRect(layout.bazen.x, layout.bazen.y, layout.bazen.width, layout.bazen.height);

    
    this.ctx.fillStyle = layout.fontana.color;
    this.ctx.beginPath();
    this.ctx.arc(layout.fontana.x, layout.fontana.y, layout.fontana.radius, 0, 2 * Math.PI);
    this.ctx.fill();

    
    layout.trava.forEach((patch: any) => {
      this.ctx.fillStyle = patch.color;
      this.ctx.fillRect(patch.x, patch.y, patch.width, patch.height);
    });

    
    layout.stolovi.forEach((table: any) => {
      this.ctx.fillStyle = table.color;
      this.ctx.fillRect(table.x, table.y, table.width, table.height);
    });
  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
