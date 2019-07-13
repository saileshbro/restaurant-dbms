const router = require('express').Router;
const { contactValidator } = require("../middlewares/contactvalidator");
const { credentialsValidator } = require("../middlewares/credentialvalidator");
const importController = require('../controllers/importController');
router.post('/import/addcompany', contactValidator, importController.addImportCompany);
router.get('/import/getcompanies', importController.getImportCompanies);
router.patch('/import/updatecompany/:import_company_id', contactValidator, importController.updateImportCompany);
router.delete('/import/deletecompany/:import_company_id', importController.deleteImportCompany);
module.exports = router;
