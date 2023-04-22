class Validator {
  static validateData(data) {
    if (data.name && data.id) {
      return false
    } else {
      return true
    }
  }

  static validateID(id){
    if(typeof Number(id) === 'number' && isFinite(id)){
      return false;
    }
    return true;
  }
}

module.exports = Validator
