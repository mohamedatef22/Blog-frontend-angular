import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmsService } from 'src/app/services/confirms.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    private _aRouter: ActivatedRoute,
    private _confirm: ConfirmsService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  confirm() {
    const url = this._aRouter.snapshot.queryParams.url;
    this._confirm.confirm(url).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        this._router.navigate(['']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
