import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-attendance-chart',
  imports: [],
  templateUrl: './attendance-chart.html',
  styleUrl: './attendance-chart.css',
})
export class AttendanceChart {
    ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    new Chart('attendanceChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Attendance',
            data: [6, 9, 7, 8, 6, 10], // static hours or count
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#3b82f6'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Days'
            }
          }
        }
      }
    });
  }
}
