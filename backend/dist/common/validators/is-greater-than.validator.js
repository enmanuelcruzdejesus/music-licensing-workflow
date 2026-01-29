"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGreaterThan = IsGreaterThan;
const class_validator_1 = require("class-validator");
function IsGreaterThan(relatedPropertyName, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: "isGreaterThan",
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [relatedPropertyName],
            validator: {
                validate(value, args) {
                    const [relatedProperty] = args.constraints;
                    const relatedValue = args.object[relatedProperty];
                    if (typeof value !== "number" || typeof relatedValue !== "number") {
                        return false;
                    }
                    return value > relatedValue;
                },
                defaultMessage(args) {
                    const [relatedProperty] = args.constraints;
                    return `${args.property} must be greater than ${relatedProperty}`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-greater-than.validator.js.map