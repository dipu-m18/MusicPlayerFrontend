import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  isSubmitted=false;
  formValue:any;
  song:any;
  songName:any;
  firebaseUrl:any;
  formTemplate =new FormGroup({
    song:new FormControl('')
    // title: new FormControl(''),
    // artist: new FormControl(''),
    // album: new FormControl(''),
    // tag: new FormControl(''),
    // description: new FormControl(''),
    // url: new FormControl(''),
    // image: new FormControl(''),
    // uploaded_by: new FormControl('')
  })
  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  onSubmit(formValue:any){
    //console.log(formValue.song)
    this.isSubmitted=true;
    if(this.formTemplate.valid){
      var filePath=this.songName;
      const fileRef=this.storage.ref(filePath);
      this.storage.upload(filePath, this.song).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url) => {
            this.firebaseUrl=url;
            this.resetForm();
            console.log(this.firebaseUrl)
          })
        })
      ).subscribe();
    }
  }

  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      song: ''
    });
    this.song=null;
    this.isSubmitted=false;
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      this.song=event.target.files[0];
      this.songName=event.target.files[0].name;
      console.log(this.songName)
    }
  }

  get formControls(){
    return this.formTemplate['controls'];
  }

}
