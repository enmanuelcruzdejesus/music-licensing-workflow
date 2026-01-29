import { ValidationOptions } from "class-validator";
export declare function IsGreaterThan(relatedPropertyName: string, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
