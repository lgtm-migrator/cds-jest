using {
  managed,
  cuid
} from '@sap/cds/common';

@path : '/person'
service PersonService {

  entity Person : cuid {
    Name : String(255);
    Age  : Integer;
  }

}
