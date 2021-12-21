import { Handler } from '@netlify/functions'

type FormFields = 'name' | 'favoriteHexCode'

const isHexCode = (str: string) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(str)

export type Response = {
  message: string;
  name?: string;
  favoriteHexCode?: string;
  invalidFields?: Partial<Record<FormFields, string>>;
}

export const handler: Handler = async (event) => {
  const { name, favoriteHexCode } = JSON.parse(event.body ?? '')

  let invalidFields: Response['invalidFields'] = {}
  if (typeof name !== 'string' || !name.length) {
    invalidFields.name = 'The name cannot be left blank'
  }
  if (typeof favoriteHexCode !== 'string' || !isHexCode(favoriteHexCode)) {
    invalidFields.favoriteHexCode = 'Should be a valid hexcode. Ex: #CCC or #CCCDDD'
  }

  if (Object.keys(invalidFields).length) {
    const response: Response = {
      invalidFields,
      message: 'Some of this form data was malformed. Please try again.'
    }
    return {
      statusCode: 400,
      body: JSON.stringify(response)
    }
  }

  const response: Response = {
    name,
    favoriteHexCode,
    message: `My name is ${name} and my favorite color is ${favoriteHexCode}`
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}