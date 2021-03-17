import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MemberService } from 'src/app/member.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/model/member';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'pb-memebers-list',
  templateUrl: './memebers-list.component.html',
  styleUrls: ['./memebers-list.component.css']
})
export class MemebersListComponent implements OnInit {
  title = 'modal2';

  public query = '';
  //Obervables
  members$ = new BehaviorSubject<any[]>([]);
  filteredmembers$ = new BehaviorSubject<any[]>([]);

  //form fields 
  locationControl = new FormControl();
  positionControl = new FormControl();
  genderControl = new FormControl();

  programControls = new FormGroup({
    position: this.positionControl,
    gender: this.genderControl
  });
  //set default filter values
  locationOptions;
  positionOptions = ['Engineer', 'QA Developer'];
  genderOptions = ['Male', 'Female'];
  optiondfd = "";
  editProfileForm: FormGroup;
  get userName() {
    return this.editProfileForm.get('name');
  }

  get userEmail() {
    return this.editProfileForm.get('email');
  }
  public staticLoc = ['India', 'China', 'Germany'];
  public locations: any = [];
  constructor(private memberService: MemberService,
    private fb: FormBuilder, private modalService: NgbModal,
    private activatedroute: ActivatedRoute, private router: Router) { }

  memberList: any = [];

  member: Member = new Member();

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      id: [],
      picture: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
    this.getMembersList();
  }

  openModal(targetModal, member) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      id: member.id,
      picture: member.picture,
      name: member.name,
      email: member.email,
      gender: member.gender,
      phone: member.phone,
      role: member.role,
      location: member.location
    });
  }
  onChange(deviceValue) {
    console.log(deviceValue);
  }
  private setFilters(payload) {
    this.members$.next(payload);
    this.filteredmembers$.next(this.members$.value);
    combineLatest(
      this.members$,
      this.locationControl.valueChanges,
    )
      .subscribe(([members, locationFilter]) => {
        let filteredMembers = [...members];
        if (locationFilter) {
          filteredMembers = filteredMembers.filter(member => member.location === locationFilter);

        }
        this.filteredmembers$.next(filteredMembers)

      });
    //reset
    //this.locationControl.setValue('');
  }
  onSubmit() {
    this.modalService.dismissAll();
    let updatedFormData = this.editProfileForm.getRawValue();
    this.memberService.updateMember(updatedFormData, updatedFormData.id).subscribe((res) => {
      this.member = res;
      //To refresh the Member list
      this.ngOnInit();
    });

  }
  getMembersList() {
    this.memberService.getMemeberListData()
      .subscribe(response => {
        this.memberList = response;
        //console.log('data', this.getMembersList())
        this.setFilters(this.memberList);
        this.getLocationData(this.memberList)
      });
    // console.log('data2', this.getMembersList())
  }
  deleteMember(id: number, member: any) {
    swal("Oops", "Something went wrong!", "error")
    swal({
      title: "Are you sure you want to delete this member?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true

    })
      .then((result: boolean) => {
        if (result == true) {
          swal(member.name + "'s " + "record has been deleted ", {
            icon: "success",
          });
          this.memberService.deleteMemberData(id).subscribe(() => {
            this.ngOnInit();
          });
        }
      });
  }
  getLocationData(members) {
    var memberNames = members.map(function (member) {
      return member.location
    });
    //Set => To remove duplicates
    var filteredLocationSet = [...new Set(memberNames)];
    this.locationOptions = filteredLocationSet;
  }
}
