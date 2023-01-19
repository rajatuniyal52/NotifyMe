import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-popup',
  templateUrl: './add-popup.component.html',
  styleUrls: ['./add-popup.component.css'],
})
export class AddPopupComponent implements OnInit {
  popupForm: FormGroup = this.fb.group({});
  actionBtn: string = 'Save';
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    @Inject(MAT_DIALOG_DATA) private editCustomer: any,
    private dialogRef: MatDialogRef<AddPopupComponent>
  ) {}

  ngOnInit(): void {
    this.popupForm = this.fb.group({
      name: ['', [Validators.required]],
      contact: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      description: ['', [Validators.required]],
    });
    if (this.editCustomer) {
      this.actionBtn = 'Update';
      this.popupForm.controls['name'].setValue(this.editCustomer.name);
      this.popupForm.controls['contact'].setValue(this.editCustomer.contact);
      this.popupForm.controls['description'].setValue(
        this.editCustomer.description
      );
    }
  }

  get contact(): AbstractControl {
    return this.popupForm.get('contact') as FormControl;
  }
  
  get name(): AbstractControl {
    return this.popupForm.get('name') as FormControl;
  }
  onPopup() {
    if (!this.editCustomer) {
      let data = this.popupForm.value;
      this.authservice.popUp(data).subscribe((res: any) => {
        if (res.status == 200) {
          alert('success');

          this.authservice.subject.next('');
        }
      });
      // console.log(this.popupForm.value);
    } else {
      this.updateCustomer();
    }
  }
  updateCustomer() {
    debugger;
    this.authservice
      .putCustomer(this.popupForm.value, this.editCustomer._id)
      .subscribe({
        next: (res) => {
          if (res.status == 200) {
            alert(res.message);
            this.popupForm.reset();
            this.dialogRef.close('uddate');
          }
          this.authservice.subject.next('');
        },
        error: (res) => {
          alert(res.message);
        },
      });
  }
  onclick() {
    this.dialogRef.close();
  }
}
