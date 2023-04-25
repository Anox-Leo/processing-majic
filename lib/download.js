// const fs = require('fs-extra')
// const path = require('path')
// const util = require('util')
// const exec = util.promisify(require('child_process').exec)
// pump = util.promisify(require('pump'))

module.exports = async (processingConfig, dir = 'data', axios, log) => {
  await log.step('Téléchargement des données')

  try {
    await log.info('Filtrage des dernières données')
    const json = await axios.get('https://data.economie.gouv.fr/api/datasets/1.0/fichiers-des-locaux-et-des-parcelles-des-personnes-morales')
    const filtre1 = []
    const year = new Date().getFullYear() - 1
    const attachments = json.data.attachments
    for (let i = 0; i < attachments.length; i++) {
      if (attachments[i].id.includes(`${year}`)) {
        if (attachments[i].id.includes('fichier_des_parcelles')) {
          if (attachments[i].id.includes('zip')) {
            filtre1.push(attachments[i].id)
          }
        }
      }
    }
  } catch (err) {
    log.error(JSON.stringify(err, null, 2))
  }
}
