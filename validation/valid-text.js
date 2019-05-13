const validText = str => {
  return typeof str === 'string' && str.trim().length > 0; // trim takes spaces off str
}

module.exports = validText;

// makes sure its a string and that its not an empty string or only contains spaces