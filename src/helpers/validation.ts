const messages = {
  required: () => "This field is required",
  pattern: (val: string) => val,
  maxLength: (maxLength: string) => `Max length is ${maxLength}`,
  minLength: (minLength: string) => `Min length is ${minLength}`,
}

type validationType = keyof typeof messages;
type acceptedValueTypes = boolean | number | RegExp;

interface ValidationRules<K extends acceptedValueTypes> {
  value: K;
  message: string;
  _type: validationType
}

export const buildValidation = <K extends acceptedValueTypes>(
  type: validationType,
  val: K,
  message?: string,
): ValidationRules<K> => {
  return {
    value: val,
    message: messages[type](message! ?? val),
    _type: type
  }
}

export const validateField = (validationRules: ValidationRules<acceptedValueTypes>, value: string) => {
  const { _type, message } = validationRules;

  switch (_type) {
    case "required":
      if (validationRules.value && !value.length) return message
      break;
    case "minLength":
      if (typeof validationRules.value === "number" && value.length < validationRules.value) return message
      break;
    case "maxLength":
      if (typeof validationRules.value === "number" && value.length > validationRules.value) return message
      break;
    // case "pattern":
    //   if (validationRules.value instanceof RegExp && !(validationRules.value.test(value))) return message
    //   break;
    default:
      return;
  }
}

interface BodyI {
  [key: string]: string
}
interface RulesI {
  [key: string]: {
    [key: string]: any
  }
}
interface ResultI {
  [key: string]: string | undefined;
}

export const validateHandleFields = (rules: RulesI, body: BodyI) => {
  const result: ResultI = {};
  for (const bodyKey of Object.keys(body)) {
    if (result[bodyKey]) continue;
    const validationParams = rules[bodyKey];

    if (validationParams) {
      for (const ruleKey of Object.keys(validationParams)) {
        const val = validateField(validationParams[ruleKey], body[bodyKey])
        if (val) {
          result[bodyKey] = val
          break;
        }
      }
    }
  }

  if (Object.keys(result).length > 0) return { ...result, code: 401 }
}

const password = {
  required: buildValidation("required", true),
  minLength: buildValidation("minLength", 8)
}
const email = {
  required: buildValidation("required", true),
  maxLength: buildValidation("maxLength", 30),
  pattern: buildValidation("pattern", /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "This isn't an email")
}
const handle = {
  required: buildValidation("required", true),
  pattern: buildValidation("pattern", /^\S+$/g, "This isn't a handle"),
  maxLength: buildValidation("maxLength", 15, "15"),
  minLength: buildValidation("minLength", 3, "3"),
}
const link = {
  required: buildValidation("required", true),
  pattern: buildValidation("pattern", /(https?:\/\/[^\s]+)/g, "This isn't a link"),
}

export const addLinkModalValidation = {
  handle,
  link
}
export const loginValidation = {
  email: {
    ...email,
    pattern: buildValidation("pattern", /^\S+$/g, "This is neither E-mail nor username"),
  },
  password
}
export const registrValidation = {
  username: {
    required: buildValidation("required", true),
    maxLength: buildValidation("maxLength", 10)
  },
  email,
  password
}
export const treeFormValidation = {
  handle,
  title: {
    required: buildValidation("required", true),
    maxLength: buildValidation("maxLength", 12)
  },
  description: {
    required: buildValidation("required", true),
    maxLength: buildValidation("maxLength", 300)
  },
  link
}
