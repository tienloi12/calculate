import { Component, OnInit } from '@angular/core';
import { Calculate } from 'src/models/calculate.models';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as calculateAction from './action/calculate.action'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Calculator';
  currentNumber$: Observable<Calculate>;
  constructor(private store: Store<{ calculate: Calculate }>) {
    this.currentNumber$ = store.select('calculate');
  }
  ngOnInit(): void {
    this.currentNumber$.subscribe((data) => {
      console.log(data);
    });
  }
  enterKey(key: string, type: string) {
    this.store.dispatch(
      calculateAction.EnterKey({ key: key, keyType: type })
    );
  }
}

