using {
  managed,
  cuid
} from '@sap/cds/common';

@path : '/person'
@impl : './PersonService.js'
service PersonService {

  entity Person : cuid {
    Name : String(255);
    Age  : Integer;
  }

}
