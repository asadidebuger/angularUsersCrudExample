import { Component, OnInit } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import {ErrorStateMatcher} from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface USER {
  
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  address: {
      country: string,
      city: string,
      street: string,
      alley: string,
      number: number,
      geo: {
        lat: number,
        lng: number
      }
  } 
  phone: string;
  website: string;
  company: string;
}


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})  
export class UserListComponent implements OnInit {
  protected emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  protected requiredFormControl = new FormControl('', [Validators.required]);

  protected matcher = new MyErrorStateMatcher();
  // protected users$:Observable<any>;
  displayedColumns: string[] = ['id', 'name','username','email','phone'];
  protected dataSource :USER[]=[];
  protected selectedUser: USER|null=null;
  // protected selectedElement=null;
  // protected consol=console;
  public profileForm :FormGroup= this.fb.group({ 
    name: [''],
    username: [''],
    email: [''],
    phone: [''],
  });
  
  

  constructor(private fb: FormBuilder, private userService:UserService) {
    this.userService.getUsers().subscribe(r=>{this.dataSource=r});
   }

   deleteUser(){
    this.dataSource.splice(this.dataSource.findIndex(user=>this.selectedUser?.id===user.id),1)
    this.selectedUser=null;
    this.dataSource=new Array(...this.dataSource);
   }
   selectUser(user:USER){

    this.selectedUser=(user==this.selectedUser?null:user);

    if (!this.selectedUser) return;

    setTimeout(() => {

      this.profileForm=this.fb.group({
        name: [this.selectedUser!.name],
        username: [this.selectedUser!.username],
        email: [this.selectedUser!.email],
        phone: [this.selectedUser!.phone],
        // address: this.fb.group({
        //   street: [''],
        //   city: [''],
        //   state: [''],
        //   zip: ['']
        // }),
      });
    }, 0);

   }

   updateUser(){
    console.log(this.profileForm.value)
    this.selectedUser!.name=this.profileForm.value.name;
    this.selectedUser!.email=this.profileForm.value.email;
    this.selectedUser!.username=this.profileForm.value.username;
    this.selectedUser!.phone=this.profileForm.value.phone;
    console.log(this.selectedUser)
    // for(let k in this.profileForm.value){
    //   //
    //   this.selectedUser![k]=this.profileForm.value[k];
    // }
    
    
   }
   createUser(){
    let user={
      username: '',
      id: Math.max(...this.dataSource.map(o => o.id))+1,
      name: '',
      email: '',
      avatar: '',
      password: '',
      address: {
        country: '',
        city: '',
        street: '',
        alley: '',
        number: 0,
        geo: {
          lat: 0,
          lng: 0
        }
      },
      phone: '',
      website: '',
      company: ''
    };
    this.dataSource=new Array(...this.dataSource,user);
    this.selectUser(user);
   }


  ngOnInit(): void {
    
  }

}
 