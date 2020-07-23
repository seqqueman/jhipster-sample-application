import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IAdvertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from 'app/entities/advertisment/advertisment.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html',
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;
  advertisments: IAdvertisment[] = [];

  editForm = this.fb.group({
    id: [],
    typeOfVia: [null, [Validators.required]],
    name: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    areaDisctrict: [null, [Validators.required]],
    lat: [],
    lon: [],
    advertisment: [],
  });

  constructor(
    protected addressService: AddressService,
    protected advertismentService: AdvertismentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);

      this.advertismentService
        .query({ filter: 'address-is-null' })
        .pipe(
          map((res: HttpResponse<IAdvertisment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAdvertisment[]) => {
          if (!address.advertisment || !address.advertisment.id) {
            this.advertisments = resBody;
          } else {
            this.advertismentService
              .find(address.advertisment.id)
              .pipe(
                map((subRes: HttpResponse<IAdvertisment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAdvertisment[]) => (this.advertisments = concatRes));
          }
        });
    });
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      typeOfVia: address.typeOfVia,
      name: address.name,
      zipCode: address.zipCode,
      areaDisctrict: address.areaDisctrict,
      lat: address.lat,
      lon: address.lon,
      advertisment: address.advertisment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      typeOfVia: this.editForm.get(['typeOfVia'])!.value,
      name: this.editForm.get(['name'])!.value,
      zipCode: this.editForm.get(['zipCode'])!.value,
      areaDisctrict: this.editForm.get(['areaDisctrict'])!.value,
      lat: this.editForm.get(['lat'])!.value,
      lon: this.editForm.get(['lon'])!.value,
      advertisment: this.editForm.get(['advertisment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IAdvertisment): any {
    return item.id;
  }
}
