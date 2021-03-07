import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { finalize } from "rxjs/operators";
import { Admin } from 'src/app/shared/models/admin';
import { Track } from 'src/app/shared/models/track';
import { AdminUploadService } from '../admin-upload/admin-upload.service';

@Component({
  selector: 'app-admin-upload',
  templateUrl: './admin-upload.component.html',
  styleUrls: ['./admin-upload.component.css']
})
export class AdminUploadComponent implements OnInit {

    isSubmitted=false;
    trackUpdateForm: FormGroup;
    track:File ;
    trackUrl:string ;
    trackName: string ;
    image: File ; 
    imageUrl: string ;
    album: string ;
    artists: string[] ;
    trackToAdd: any;
    admin: Admin;
    errorMessage: string = "";
    message: string = "";
  
    
  constructor( private storage: AngularFireStorage, private formBuilder: FormBuilder, private adminUploadService:AdminUploadService) { }

  ngOnInit(): void {
    this.createForm();
    this.trackToAdd =new Track();
    const adminJson=sessionStorage.getItem("admin")
    this.admin = adminJson!=null? JSON.parse(adminJson) : new Admin();
  }

  
  createForm(){
    this.trackUpdateForm= this.formBuilder.group({
      track: ['', Validators.required],
      trackName: ['', Validators.required],
      image: ['', Validators.required],
      album: ['', Validators.required],
      genre: ['', Validators.required],
      artists: ['', Validators.required],
      performedBy: ['', Validators.required],
      writtenBy: ['', Validators.required],
      producedBy: ['', Validators.required],
      source: ['', Validators.required]
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
        this.trackToAdd.name= this.trackUpdateForm.value.trackName;
        this.trackToAdd.genre = this.trackUpdateForm.value.genre;
        this.trackToAdd.artists = this.trackUpdateForm.value.artists;
        this.trackToAdd.performedBy = this.trackUpdateForm.value.performedBy;
        this.trackToAdd.writtenBy = this.trackUpdateForm.value.writtenBy;
        this.trackToAdd.producedBy = this.trackUpdateForm.value.producedBy;
        this.trackToAdd.source = this.trackUpdateForm.value.source;
        this.trackToAdd.adminEmailId=this.admin.emailId;
       console.log(this.trackToAdd.name)
        
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

              ////////////////
              this.storage.upload(imageFilePath, this.image).snapshotChanges().pipe(
                finalize(()=>{
                  imageFileRef.getDownloadURL().subscribe((url) => {
                    this.imageUrl=url;
                    console.log( this.imageUrl)
                   this.trackToAdd.trackUrl = this.trackUrl
                    this.trackToAdd.imageUrl = this.imageUrl
                    this.adminUploadService.addTrack(this.trackToAdd)
                        .subscribe((response) => {
                          console.log(response)
                          this.message = response.successMessage
                          this.isSubmitted=true;
                        },
                          error => this.errorMessage = <any>error
                        )
                   
                  })
                })
              ).subscribe();
              ////////////////////
            })
          })
        ).subscribe();

        /////////////////////
       

       
       }
  }

  
  
  resetForm(){
    this.trackUpdateForm.reset();
    // this.trackUpdateForm.setValue({
    //   name:'',
    //   genre:'',
    //   trackUrl:'',
    //   imageUrl:'',
    //   artists:'',
    //   performedBy:'',
    //   writtenBy:'',
    //   producedBy:'',
    //   source:''

    // });

    this.isSubmitted=false;
    this.message='';
    this.errorMessage='';
  }
 
}
