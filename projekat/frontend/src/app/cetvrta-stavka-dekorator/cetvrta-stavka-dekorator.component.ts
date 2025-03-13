import { Component, ElementRef, ViewChild } from '@angular/core';
import { VlasnikServiceService } from '../services/vlasnik-service.service';
import { User } from '../model/user';
import { RestoranskaBasta } from '../model/restoranskaBasta';
import { PrivatnaBasta } from '../model/privatnaBasta';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cetvrta-stavka-dekorator',
  templateUrl: './cetvrta-stavka-dekorator.component.html',
  styleUrls: ['./cetvrta-stavka-dekorator.component.css']
})
export class CetvrtaStavkaDekoratorComponent {

  constructor(private vlasnikService: VlasnikServiceService, private router: Router){}

  vlasnik: User = new User();
  @ViewChild('myChart', { static: true }) myChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: true }) pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('histogramChart', { static: true }) histogramChartRef!: ElementRef<HTMLCanvasElement>;

  chart: any;
  pieChart: any;
  histogramChart: any;


  ngOnInit() : void{
    Chart.register(...registerables);

    this.vlasnikService.dohvatiVlasnika(localStorage.getItem('ulogovan')).subscribe(data=>{

      if(data){
        this.vlasnik = data;
        console.log(this.vlasnik)
      }

      this.vlasnikService.dohvatiPosaoPoMesecima(this.vlasnik.username, this.vlasnik.imeFirme).subscribe((data: any) => {
        const canvas = this.myChartRef.nativeElement;
        const ctx = canvas.getContext('2d');
        const labels = Object.keys(data); 
        const values = Object.values(data); 

        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Број послова по месецима',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        this.vlasnikService.dohvatiRaspodeluPoslova(this.vlasnik.imeFirme).subscribe((data: any) => {
          console.log(data)
        
          
          const canvas = this.pieChartRef.nativeElement;
          const ctx = canvas.getContext('2d');
          const labels = Object.keys(data); 
          const values = Object.values(data); 
    
          this.pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                label: 'Расподела послова међу декоратерима',
                data: values,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true
            }
          });
        })
      });

      this.vlasnikService.dohvatiDane(this.vlasnik.imeFirme).subscribe((data: any) => {
        console.log(data)
        const canvas = this.histogramChartRef.nativeElement;
        const ctx = canvas.getContext('2d');

        const labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
        const values = labels.map(label => data[label]);
        this.histogramChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Prosecan broj poslova po danima u nedelji',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });



    })



    



    
  }

  odjavi(){
    localStorage.clear();
    this.router.navigate([''])
  }

}
