import express from 'express'
import widgets from './widgets'

import utils from '../../utils'
utils.logExec(__filename);

var router = express.Router();

router.get('/:appId/:pageLayout/:userId/:filename(context.js|dynamic.html)', (req,res,next)=>{
    utils.setNonCache(res)
    return next();
})

router.get('/:appId/:pageLayout/:userId/:filename(widgets.html)', (req,res,next)=>{
    utils.setMedCache(res)
    return next();
})

router.get('/:appId/:pageLayout/:userId/widgets.html', widgets.getWitgets);
router.get('/:appId/:pageLayout/:userId/context.js', widgets.getContextJs);
router.get('/:appId/:pageLayout/:userId/dynamic.html', widgets.getDynamicHtml);
router.get('/:appId/:pageLayout/:userId/load.js', widgets.getWitgetsJs);


export default router