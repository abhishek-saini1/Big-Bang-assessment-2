import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService, Doctor } from '../doctor.service';

@Component({
  selector: 'app-doctordetails',
  templateUrl: './doctordetails.component.html',
  styleUrls: ['./doctordetails.component.css']
})
export class DoctordetailsComponent implements OnInit {
  doctors: Doctor[] = [];
  currentDoctor: Doctor = { dId: 0, dName: '', dSpecialization: '', dStatus: '', dAddress: '', dMobileNumber: '' };
  isAddFormVisible = true;

  constructor(private doctorService: DoctorService, private router: Router) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  toggleAddForm(): void {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  addDoctor(): void {
    this.doctorService.createDoctor(this.currentDoctor).subscribe(() => {
      this.loadDoctors();
      this.currentDoctor = { dId: 0, dName: '', dSpecialization: '', dStatus: '', dAddress: '', dMobileNumber: '' }; // Reset the currentDoctor object
      this.isAddFormVisible = false; // Hide the add form after successfully adding a doctor
      alert('Doctor added successfully!'); // Display the success message
      this.router.navigate(['/home']); // Navigate to the home page
    });
  }
}
