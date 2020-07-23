import { IAdvertisment } from 'app/shared/model/advertisment.model';
import { ViaType } from 'app/shared/model/enumerations/via-type.model';
import { AreaDisctrict } from 'app/shared/model/enumerations/area-disctrict.model';

export interface IAddress {
  id?: number;
  typeOfVia?: ViaType;
  name?: string;
  zipCode?: string;
  areaDisctrict?: AreaDisctrict;
  lat?: number;
  lon?: number;
  advertisment?: IAdvertisment;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public typeOfVia?: ViaType,
    public name?: string,
    public zipCode?: string,
    public areaDisctrict?: AreaDisctrict,
    public lat?: number,
    public lon?: number,
    public advertisment?: IAdvertisment
  ) {}
}
