import express from 'express';
const app=express();
app.use(express.json({limit:'1mb'}));
const seed=[{id:'v1',name:'AURORA',status:'IN TRANSIT'},{id:'v2',name:'PIONEER',status:'IN TRANSIT'},{id:'v3',name:'WAYFARER',status:'IN TRANSIT'}];
app.use((req,res)=>{
 const route=String(req.query.route||req.path.split('/').filter(Boolean).pop()||'health').toLowerCase();
 if(route==='health'&&req.method==='GET')return res.set('Cache-Control','no-store').json({status:'ok',service:'star-transport-express-api',version:'1.0.0',timestamp:new Date().toISOString()});
 if(route==='fleet'&&req.method==='GET')return res.json({fleet:seed,source:'demo-seed',note:'Synthetic telemetry for the operator simulation.'});
 if(route==='fleet'&&req.method==='POST'){const{fleet}=req.body||{};if(!Array.isArray(fleet)||fleet.length>20)return res.status(400).json({error:'fleet must be an array of at most 20 vessels'});return res.json({ok:true,accepted:fleet.length,receivedAt:new Date().toISOString()})}
 return res.status(404).json({error:'Unknown API route',available:['health','fleet']});
});
export default app;