import { configure, defineRule, ErrorMessage, Field as VeeField, Form as VeeForm } from 'vee-validate'
import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  not_one_of as excluded,
  required
} from '@vee-validate/rules'

export default {
  install(app, options) {
    // options is {foo: 100}

    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('alpha_spaces', alphaSpaces) // allow only alphabetic characters and spaces
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('confirmed', confirmed)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded) // the rule specifically for the particular field

    configure({
      generateMessage: (ctx) => {
        // configuration for error messages
        const messages = {
          required: `This field ${ctx.field} is required`,
          min: `This field ${ctx.field} is too short`,
          max: `This field ${ctx.field} is too long`,
          alpha_spaces: `This field ${ctx.field} can only contain alphabetic characters and spaces`,
          email: `This field ${ctx.field} is not a valid email address`,
          min_value: `This field ${ctx.field} is too low`,
          max_value: `This field ${ctx.field} is too high`,
          confirmed: `This field ${ctx.field} does not match`,
          passwords_mismatch: `Passwords do not match`,
          excluded: `This field ${ctx.field} is not allowed`,
          country_excluded: `Due to restrictions, we do not accept users from this location`,
          tos: `You must accept the terms of service`,
        }

        return messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}
