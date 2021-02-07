import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  isSubmitted=false;
  trackUpdateForm: FormGroup=new FormGroup({});

  track:File | undefined;
  trackUrl:string | undefined;
  trackName: string | undefined;
  image: File | undefined; 
  imageUrl: string | undefined;
  album: string | undefined;
  artists: string[] | undefined;

  
  constructor(private storage: AngularFireStorage, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.createForm();
  }

  createForm(){
    this.trackUpdateForm= this.formBuilder.group({
      track: ['', Validators.required],
      trackName: ['', Validators.required],
      image: ['', Validators.required],
      album: ['', Validators.required],
      artists: ['', Validators.required]
    })
  }

  showPreviewTrack(event: any){
    if(event.target.files && event.target.files[0]){
      this.track=event.target.files[0];
      this.trackName=event.target.files[0].name;
      //console.log(this.trackName)
    }
  }

  showPreviewImage(event: any){
    if(event.target.files && event.target.files[0]){
      this.image=event.target.files[0];
      //console.log(this.trackName)
    }
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.trackUpdateForm!= undefined && this.trackUpdateForm.valid){
        console.log(this.trackUpdateForm);
        //storage path
        var trackFilePath= 'tracks/'+this.trackName
        //reference to storage path
        const trackFileRef = this.storage.ref(trackFilePath)
        var imageFilePath='images/'+this.trackName
        const imageFileRef= this.storage.ref(imageFilePath)
        this.storage.upload(trackFilePath, this.track).snapshotChanges().pipe(
          finalize(()=>{
            trackFileRef.getDownloadURL().subscribe((url) => {
              this.trackUrl=url;
              console.log( this.trackUrl)
            })
          })
        ).subscribe();

        /////////////////////
        this.storage.upload(imageFilePath, this.image).snapshotChanges().pipe(
          finalize(()=>{
            imageFileRef.getDownloadURL().subscribe((url) => {
              this.imageUrl=url;
              this.resetForm();
              console.log( this.imageUrl)
            })
          })
        ).subscribe();

       }
  }

  resetForm(){
    this.trackUpdateForm.reset();
    this.trackUpdateForm.setValue({
      track: '',
      trackName: '',
      image: '',
      album: '',
      artists: ''
    });

    this.isSubmitted=false;
  }

}
