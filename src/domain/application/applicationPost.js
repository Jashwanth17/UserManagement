const t = require('tcomb');
const { compose } = require('ramda');
const {
  cleanData,
  ApplicationNameValidator,
  DescriptionValidator,
} = require('../helper');

// Define the structure for ApplicationPost
const ApplicationPost = t.struct({
  applicationName: ApplicationNameValidator,
  description: DescriptionValidator
});

// Export the composed function
module.exports = compose(cleanData, ApplicationPost);
