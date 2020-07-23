import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdvertisment, Advertisment } from 'app/shared/model/advertisment.model';
import { AdvertismentService } from './advertisment.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-advertisment-update',
  templateUrl: './advertisment-update.component.html',
})
export class AdvertismentUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  createAtDp: any;
  modifiedAtDp: any;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    createAt: [],
    modifiedAt: [],
    typeAd: [null, [Validators.required]],
    propertyType: [null, [Validators.required]],
    active: [],
    price: [null, [Validators.required]],
    reference: [],
    user: [],
  });

  constructor(
    protected advertismentService: AdvertismentService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ advertisment }) => {
      this.updateForm(advertisment);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(advertisment: IAdvertisment): void {
    this.editForm.patchValue({
      id: advertisment.id,
      description: advertisment.description,
      createAt: advertisment.createAt,
      modifiedAt: advertisment.modifiedAt,
      typeAd: advertisment.typeAd,
      propertyType: advertisment.propertyType,
      active: advertisment.active,
      price: advertisment.price,
      reference: advertisment.reference,
      user: advertisment.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const advertisment = this.createFromForm();
    if (advertisment.id !== undefined) {
      this.subscribeToSaveResponse(this.advertismentService.update(advertisment));
    } else {
      this.subscribeToSaveResponse(this.advertismentService.create(advertisment));
    }
  }

  private createFromForm(): IAdvertisment {
    return {
      ...new Advertisment(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      createAt: this.editForm.get(['createAt'])!.value,
      modifiedAt: this.editForm.get(['modifiedAt'])!.value,
      typeAd: this.editForm.get(['typeAd'])!.value,
      propertyType: this.editForm.get(['propertyType'])!.value,
      active: this.editForm.get(['active'])!.value,
      price: this.editForm.get(['price'])!.value,
      reference: this.editForm.get(['reference'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdvertisment>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
