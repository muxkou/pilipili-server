import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { regPhone, regNumber } from '../utils/regex';
import { PliHttpStatus } from '../utils/pliCode';

@Injectable()
export class ParsePhonePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (regPhone.test(value) && regNumber.test(value)) {
      return value;
    } else {
      const error = { 
        message: `inValid phone number: ${value}`,
        statusCode: PliHttpStatus.INVALID_PARAMS
      };  
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}