/**
 * simple render template with data
 *
 * @param {string} template
 * @param {object} data
 * @returns {string}
 */
function render(template, data) {
  for(var key in data) {
    var reg = new RegExp('{{' + key +'}}', 'g')
    template = template.replace(reg, data[key])
  }

  return template
}


module.exports = render
