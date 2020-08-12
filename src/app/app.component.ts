import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/service/service.service';


export class ClassModel
{
  EmployeeId:number;
  Name:string;
  Place:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(private service:ServiceService,private valid:FormBuilder){}
  public value:ClassModel[];
  Values:ClassModel=new ClassModel();
  isUpdate:boolean=false;
  model=this.valid.group({
      _id:[''],
      __v:[''],
      EmployeeId:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
      Name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(12)]],
      Place:['',Validators.required]
  })
  Submit(f:NgForm)
  {

    if(!this.isUpdate)
    {
      console.log("The value which we got from form builder is",this.model.value)
      this.service.Create(this.model.value)
      .subscribe();
      f.resetForm();
      this.getAll();

    }
    else{
      console.log(f.value);
      this.service.Update(this.model.value)
      .subscribe();
      this.isUpdate=false;
      f.resetForm();
      this.getAll();
    }
  }

  getAll():void
  {
    this.service.Getall()
    .subscribe(data=>
      {
        console.log(data);
        this.value=data;
      })
  }
  Update(data:any)
  {
    this.isUpdate=true;
    this.service.FindOne(data.EmployeeId)
    .subscribe(resp=>
      {
        console.log(resp);
        console.log(this.Values);
        this.model.setValue(data);
      })
    
    this.getAll();
  }
  // Update(data:any)
  // {
  //   this.isUpdate=true;
  //   this.service.FindOne(data.EmployeeId)
  //   .subscribe(resp=>
  //     {
  //       console.log(resp);
  //       console.log(this.Values);
  //       this.Values=resp;
  //     })
    
  //   this.getAll();
  // }
  Deletedata(data:number)
  {
    console.log(data);
    this.service.Delete(data)
    .subscribe(resp=>
      {
        console.log(JSON.stringify(resp));
        this.getAll();
      })
  }
  get EmployeeId()
  {
    return this.model.get('EmployeeId');
  }
  get Name()
  {
    return this.model.get('Name');
  }
  get Place()
  {
    return this.model.get('Place');
  }
  ngOnInit()
  {
    this.getAll();
  }
}

