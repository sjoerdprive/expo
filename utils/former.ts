export default function former(form: HTMLFormElement) {
  const data = new FormData(form);

  const [...fields] = data.entries();

  const obj = fields.reduce((prev, [key, val]) => {
    return { ...prev, ...{ [key]: val as string } }
  }, {} as Record<string, any>)

  return obj

}
