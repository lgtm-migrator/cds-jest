using {
  managed,
  cuid
} from '@sap/cds/common';

@path : '/person'
@impl : './PersonServiceImpl.js'
service PersonService {

  entity Person : cuid {
    Name                : String(255);
    Age                 : Integer;
    virtual Informations : array of {
      Label             : String(255);
      Value             : String(255);
    }
  }

}
