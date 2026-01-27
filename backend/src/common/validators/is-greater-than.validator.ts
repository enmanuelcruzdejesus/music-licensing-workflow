import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsGreaterThan(
  relatedPropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isGreaterThan",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [relatedPropertyName],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[relatedProperty];

          if (typeof value !== "number" || typeof relatedValue !== "number") {
            return false;
          }

          return value > relatedValue;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return `${args.property} must be greater than ${relatedProperty}`;
        },
      },
    });
  };
}
