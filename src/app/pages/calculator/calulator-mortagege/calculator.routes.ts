import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MortgageCalculatorsComponent } from '../../mortgages/mortgage-calculators/mortgage-calculators.component';
import { CalulatorMortagegeComponent } from './calulator-mortagege.component';
import { StampdutyComponent } from '../../mortgages/stampduty/stampduty.component';
import { MortgagesratesComponent } from '../../mortgages/mortgagesrates/mortgagesrates.component';
import { BestbuycalculatorComponent } from '../../mortgages/bestbuycalculator/bestbuycalculator.component';
export const routes: Routes = [
  {
    path: '',
    component: CalulatorMortagegeComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../mortgages/mortgage-calculators/mortgage-calculators.component')
            .then(m => m.MortgageCalculatorsComponent)
      },
      {
        path: 'stampduty-calculator',
        loadComponent: () =>
          import('../../mortgages/stampduty/stampduty.component')
            .then(m => m.StampdutyComponent)
      },
      {
        path: 'repayment-calculator',
        loadComponent: () =>
          import('../../mortgages/mortgagesrates/mortgagesrates.component')
            .then(m => m.MortgagesratesComponent)
      },
      {
        path: 'best-buys',
        loadComponent: () =>
          import('../../mortgages/bestbuycalculator/bestbuycalculator.component')
            .then(m => m.BestbuycalculatorComponent)
      }
    ]
  }
];

