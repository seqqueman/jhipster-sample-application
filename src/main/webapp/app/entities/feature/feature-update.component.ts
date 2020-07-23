import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { IAdvertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from 'app/entities/advertisment/advertisment.service';

@Component({
  selector: 'jhi-feature-update',
  templateUrl: './feature-update.component.html',
})
export class FeatureUpdateComponent implements OnInit {
  isSaving = false;
  advertisments: IAdvertisment[] = [];

  editForm = this.fb.group({
    id: [],
    numberBedrooms: [null, [Validators.required]],
    numberBathroom: [null, [Validators.required]],
    fullKitchen: [],
    elevator: [],
    parking: [],
    airConditionair: [],
    backyard: [],
    pool: [],
    m2: [],
    advertisment: [],
  });

  constructor(
    protected featureService: FeatureService,
    protected advertismentService: AdvertismentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feature }) => {
      this.updateForm(feature);

      this.advertismentService
        .query({ filter: 'feature-is-null' })
        .pipe(
          map((res: HttpResponse<IAdvertisment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAdvertisment[]) => {
          if (!feature.advertisment || !feature.advertisment.id) {
            this.advertisments = resBody;
          } else {
            this.advertismentService
              .find(feature.advertisment.id)
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

  updateForm(feature: IFeature): void {
    this.editForm.patchValue({
      id: feature.id,
      numberBedrooms: feature.numberBedrooms,
      numberBathroom: feature.numberBathroom,
      fullKitchen: feature.fullKitchen,
      elevator: feature.elevator,
      parking: feature.parking,
      airConditionair: feature.airConditionair,
      backyard: feature.backyard,
      pool: feature.pool,
      m2: feature.m2,
      advertisment: feature.advertisment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feature = this.createFromForm();
    if (feature.id !== undefined) {
      this.subscribeToSaveResponse(this.featureService.update(feature));
    } else {
      this.subscribeToSaveResponse(this.featureService.create(feature));
    }
  }

  private createFromForm(): IFeature {
    return {
      ...new Feature(),
      id: this.editForm.get(['id'])!.value,
      numberBedrooms: this.editForm.get(['numberBedrooms'])!.value,
      numberBathroom: this.editForm.get(['numberBathroom'])!.value,
      fullKitchen: this.editForm.get(['fullKitchen'])!.value,
      elevator: this.editForm.get(['elevator'])!.value,
      parking: this.editForm.get(['parking'])!.value,
      airConditionair: this.editForm.get(['airConditionair'])!.value,
      backyard: this.editForm.get(['backyard'])!.value,
      pool: this.editForm.get(['pool'])!.value,
      m2: this.editForm.get(['m2'])!.value,
      advertisment: this.editForm.get(['advertisment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeature>>): void {
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
