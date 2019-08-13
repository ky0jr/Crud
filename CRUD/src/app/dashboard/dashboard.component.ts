import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Policy} from '../shared/policies.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  policies: Policy[];

  selected: Policy = {id: null, number: null, amount: null};

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.read().subscribe((policies: Policy[]) => {
      this.policies = policies;
      console.log(this.policies);
    });
  }

  createOrUpdatePolicy(form) {
    if (this.selected && this.selected.id) {
      form.value.id = this.selected.id;
      this.api.update(form.value).subscribe((policy: Policy) => {
        console.log('Policy updated' , policy);
      });
    } else {

      this.api.create(form.value).subscribe((policy: Policy) => {
        console.log('Policy created, ', policy);
      });
    }

  }

  selectPolicy(policy: Policy) {
    this.selected = policy;
  }

  deletePolicy(id) {
    this.api.delete(id).subscribe((policy: Policy) => {
      console.log('Policy deleted, ', policy);
    });
  }

}
