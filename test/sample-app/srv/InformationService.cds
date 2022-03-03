using {
  managed,
  cuid
} from '@sap/cds/common';

@path : '/info'
service InformationService {


  entity Information : cuid, managed {

    PersonID : UUID;
    Label    : String(255);
    Value    : String(255);

  }

}
