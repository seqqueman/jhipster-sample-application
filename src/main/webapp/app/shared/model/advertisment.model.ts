import { Moment } from 'moment';
import { IImage } from 'app/shared/model/image.model';
import { IUser } from 'app/core/user/user.model';
import { IAddress } from 'app/shared/model/address.model';
import { IFeature } from 'app/shared/model/feature.model';
import { TypeAdvertisment } from 'app/shared/model/enumerations/type-advertisment.model';
import { PropertyType } from 'app/shared/model/enumerations/property-type.model';

export interface IAdvertisment {
  id?: number;
  description?: string;
  createAt?: Moment;
  modifiedAt?: Moment;
  typeAd?: TypeAdvertisment;
  propertyType?: PropertyType;
  active?: boolean;
  price?: number;
  reference?: string;
  images?: IImage[];
  user?: IUser;
  address?: IAddress;
  feature?: IFeature;
}

export class Advertisment implements IAdvertisment {
  constructor(
    public id?: number,
    public description?: string,
    public createAt?: Moment,
    public modifiedAt?: Moment,
    public typeAd?: TypeAdvertisment,
    public propertyType?: PropertyType,
    public active?: boolean,
    public price?: number,
    public reference?: string,
    public images?: IImage[],
    public user?: IUser,
    public address?: IAddress,
    public feature?: IFeature
  ) {
    this.active = this.active || false;
  }
}
