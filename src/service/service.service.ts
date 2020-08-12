import { Injectable, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {ClassModel } from '../app/app.component';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private readonly URL:string="http://localhost:5000";

  constructor(private http:HttpClient) { }
  Getall():Observable<ClassModel[]>
  {
    return this.http.get<ClassModel[]>(this.URL+'/get');
  }

  Create(data:ClassModel):Observable<ClassModel>
  {
    return this.http.post<ClassModel>(this.URL+'/insert',data);
  }
  FindOne(id:number):Observable<ClassModel>
  {
    console.log(id);
    return this.http.get<ClassModel>(this.URL+'/getbyid/'+id);
  }
  Update(data:ClassModel):Observable<ClassModel>
  {
    console.log(data);
    return this.http.put<ClassModel>(this.URL+'/update',data);
  }
  Delete(id:number):Observable<ClassModel>
  {
    console.log(id);
    return this.http.delete<ClassModel>(this.URL+'/delete/'+id);
  }
  }
