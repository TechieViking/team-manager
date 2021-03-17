import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Member } from 'src/app/model/member';
import { MemberService } from 'src/app/member.service';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'pb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  member: Member;
  addMemberForm: FormGroup;
  hidden: boolean = true;
  userLoggedIn: any;
  existingUsers: any = [];
  count = 0;
  list = [
    {
      dataStep: 'ref1',
      message: 'Click here to add a new user',
      arrowPosition: 'left',
      elementPosition: 'top',
      elementPositionTop: 0
    },
    {
      dataStep: 'ref2',
      message: 'Footer',
      arrowPosition: 'bottom',
      elementPosition: 'bottom',
      elementPositionBottom: 100
    }
  ];

  get userName() {
    return this.addMemberForm.get('name');
  }

  get userEmail() {
    return this.addMemberForm.get('email');
  }

  constructor(private modalService: NgbModal, private fb: FormBuilder,
    private memberService: MemberService, private authService: AuthService) { }
  isLoggedIn$: Observable<boolean>;
  isFirsttime$: Observable<Object>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isFirsttime$ = this.authService.isFirstTime;
    this.isFirsttime$.subscribe(data => {
      this.isFirstTimeHere(data);
    });
    if (location.pathname === '/profile') {
      let footer = document.getElementsByTagName("footer")[0];
      let isProfilePage = footer.classList.contains("position-relative");
      console.log('isProfilePage', isProfilePage)
      if (!isProfilePage) {
        footer.classList.remove("position-absolute");
        footer.classList.add("position-relative");
      }
    }

    document.addEventListener("click", function (e) {
      if ((e.target as Element).parentNode) {
        let element: any = (e.target as Element).parentNode;
        let elID = element.id;

        if (elID == "tooltip") {
          console.log('if')
          e.stopPropagation();
          e.preventDefault();
        }
        else if (elID == "") {
          let element: any = e.target;
          let elID = element.id;
          console.log(element.id)
          if (element.id == "buttonAction") {
            let el = document.getElementById(element.id).parentNode.parentNode;
            e.stopPropagation();
            e.preventDefault();
          }
          else {
            if (document.getElementById("overlayId")) {
              document.getElementById("overlayId").style.display = "none";
            }

            if (document.getElementById("tooltip")) {
              document.getElementById("tooltip").style.display = "none";
            }

            let l = document.getElementById("ref1");
            if (l) {
              l.classList.remove('highlight');
            }
          }
        }
      }
    });
  }


  isFirstTimeHere(data) {
    var storedUsers = JSON.parse(localStorage.getItem('registerdUsers'));
    storedUsers.forEach((element, index) => {
      if (element.userName == data.userName) {
        if (data.firstTimeUser == true) {
          swal(`Hello ${data.userName} `);
          swal({
            title: `Hello ${data.userName.toUpperCase()} ! Welcome to team manager`,
            text: `I promise I won't show up again. ;)`,
            icon: "success",
          });
          this.walkThrough()
        }
        element.firstTimeUser = false;
        storedUsers[index]['firstTimeUser'] = false;
        localStorage.setItem('registerdUsers', JSON.stringify(storedUsers));
        return;
      }
      else {
        return false;
      }
    });
  }

  openModal(targetModal) {
    if (document.getElementById("overlayId")) {
      document.getElementById("overlayId").style.display = "none";
    }

    if (document.getElementById("tooltip")) {
      document.getElementById("tooltip").style.display = "none";
    }

    if (document.querySelector(".swal-overlay")) {
      document.querySelector(".swal-overlay").remove();
    }

    let l = document.getElementById("ref1");
    if (l) {
      l.classList.remove('highlight');
    }
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.addMemberForm = this.fb.group({
      id: '',
      picture: '',
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  walkThrough() {
    let elemDiv = document.createElement('div');
    elemDiv.setAttribute('class', 'overlay');
    elemDiv.setAttribute('id', 'overlayId');
    document.body.appendChild(elemDiv);
    let styleDiv = elemDiv.style;
    styleDiv.position = 'fixed';
    styleDiv.top = '0';
    styleDiv.left = '0';
    styleDiv.bottom = '0';
    styleDiv.right = '0';
    styleDiv.overflowY = 'auto';
    styleDiv.backgroundColor = 'rgba(0,0,0,.4)';
    styleDiv.zIndex = '10000';
    this.createHTMLContent();
  }

  createHTMLContent() {
    let index;
    index = this.countCheck(this.count);
    console.log(index);

    if (index < this.list.length) {
      let elementId = this.list[index].dataStep;
      let domElement = document.getElementById(elementId);
      domElement.classList.add('highlight')
      let domElementTop = domElement.offsetTop;
      let domElementLeft = domElement.offsetLeft;
      //<a role="button" id="buttonAction" class="introjs-button">Next →</a>
      let optionsDialogBox = `<div class="introjs-tooltip" id="tooltip">
          <div class="introjs-tooltiptext">${this.list[index].message}</div>
          <div class="introjs-arrow ${this.list[index].arrowPosition}" style="display: inherit;"></div>
          <div class="introjs-tooltipbuttons">
          
        </div>
      </div>`;


      //document.body.appendChild(optionsDialogBox);
      document.body.insertAdjacentHTML("beforeend", optionsDialogBox);

      let tooltip = document.querySelector('.introjs-tooltip');
      if (tooltip instanceof HTMLElement) {
        console.log("entered!!!")
        tooltip.style.position = "absolute";
        tooltip.style.top = domElementTop + 20 + 'px';
        tooltip.style.left = domElementLeft + 120 + 'px';
      } else {
        throw new Error("Tooltip not in the page")
      }
      //this.changeButton(index);
      this.nextButton();
      this.backButton();
    }
  }


  countCheck(value) {
    if (value < this.list.length) {
      return value;
    }
    else if (value <= 0) {
      return value = 0;
    } else {
      return value = 0;
    }
  }

  nextButton() {
    let prev = document.querySelector('.introjs-nextbutton')
    if (prev) {
      prev.addEventListener('click', function () {
        this.count++;
        this.clearBox("tooltip");
        document.getElementById(this.list[this.count].dataStep).scrollIntoView({ behavior: 'smooth', block: 'end' });
        var element = document.getElementById(this.list[this.count].dataStep);
        console.log('element', element);
        const offset = 495;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        this.createHTMLContent();
      }.bind(this));
    }
  }

  backButton() {
    let prev = document.querySelector('.introjs-prevbutton')
    if (prev) {
      prev.addEventListener('click', function () {
        if (this.countCheck(this.count)) {
          this.count = 0;
        }
        else {
          this.count--;
        }
        this.clearBox("tooltip");
        document.getElementById(this.list[this.count].dataStep).scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.createHTMLContent();
      }.bind(this));
    }
  }

  changeButton(index) {
    if (index !== null || index !== undefined) {
      var d = document.querySelector('.introjs-button');
      console.log("d", d)
      if (index == 1) {

        d.classList.add("introjs-prevbutton");
        d.textContent = "Prev";
      }
      else {
        d.classList.add("introjs-nextbutton");
        d.textContent = "Next";
      }
    }
  }
  clearBox(elementID) {
    console.log(elementID);
    document.getElementById(elementID).remove();
  }


  onSubmit() {
    console.log('hi')
    this.modalService.dismissAll();
    let updatedFormData = this.addMemberForm.getRawValue();
    this.memberService.addNewContact(updatedFormData)
      .subscribe(contact => {
        swal({
          title: "Wohoo!",
          text: 'Awesome !! ' + contact.name + ' is now part of our team',
          icon: "success",
        });
      });
  }
}
