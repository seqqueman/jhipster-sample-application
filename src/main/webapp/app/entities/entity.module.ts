import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.JhipsterSampleApplicationAddressModule),
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.JhipsterSampleApplicationCompanyModule),
      },
      {
        path: 'image',
        loadChildren: () => import('./image/image.module').then(m => m.JhipsterSampleApplicationImageModule),
      },
      {
        path: 'user-registered',
        loadChildren: () => import('./user-registered/user-registered.module').then(m => m.JhipsterSampleApplicationUserRegisteredModule),
      },
      {
        path: 'feature',
        loadChildren: () => import('./feature/feature.module').then(m => m.JhipsterSampleApplicationFeatureModule),
      },
      {
        path: 'advertisment',
        loadChildren: () => import('./advertisment/advertisment.module').then(m => m.JhipsterSampleApplicationAdvertismentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterSampleApplicationEntityModule {}
