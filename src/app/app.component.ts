import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders = ['male', 'female'];
  submit:boolean = false;
  hobbies: string[] = [];

  signupForm:FormGroup;

  user = {
    username:' ',
    email: ' ',
    gender: ' ',
    
    
  }

  constructor() {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData':new FormGroup({
        'username': new FormControl(null,Validators.required),
        'email': new FormControl(null,[Validators.required,Validators.email])
      }),    
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])
    });

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status)
    });

    this.signupForm.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

  onSubmit(){   
    console.log(this.signupForm);
    this.submit = true;
    this.user.username = this.signupForm.get('userData.username').value;
    this.user.email = this.signupForm.get('userData.email').value;
    this.user.gender = this.signupForm.get('gender').value;
    this.hobbies = this.signupForm.get('hobbies').value;
    this.signupForm.reset();
  }

  onAddHobby(){
    const hobby = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(hobby);
  }

  getHobbies(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onUsername(){
    this.signupForm.patchValue({
      'userData':{
        'username':'Daniel(Simce)'
      }
    });
  }

  onDefault(){
    this.signupForm.setValue({
      'userData':{
        'username':'Daniel Simonovski ',
        'email':'daniel@gmail.com'
      },
      'gender':'male',
      'hobbies':([])
    });
  }

  





}
