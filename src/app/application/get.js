const { ApplicationGet } = require('../../domain/application')

module.exports = ({ applicationRepository }) => {
  const get = async (id) => {
    try {
      console.log(id)
      const validatedid = await ApplicationGet({id}) 
      const application = await applicationRepository.get(
        validatedid.id,
      )
      return application
    } catch (error) {
      console.error('Error occurred in get:', error)
      throw error
    }
  }

  return {
    get
  }
}
