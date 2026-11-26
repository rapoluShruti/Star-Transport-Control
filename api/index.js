import express from 'express';
const app=express();
app.use(express.json({limit:'1mb'}));
const seed=[{id:'v1',name:'AURORA',status:'IN TRANSIT'},{id:'v2',name:'PIONEER',status:'IN TRANSIT'},{id:'v3',name:'WAYFARER',status:'IN TRANSIT'}];
app.get('/health',(_req,res)=>res.set('Cache-Control','no-store').json({status:'ok',service:'star-transport-express-api',version:'1.0.0',timestamp:new Date().toISOString()}));
app.get('/fleet',(_req,res)=>res.json({fleet:seed,source:'demo-seed',note:'Synthetic telemetry for the operator simulation.'}));
app.post('/fleet',(req,res)=>{const{fleet}=req.body||{};if(!Array.isArray(fleet)||fleet.length>20)return res.status(400).json({error:'fleet must be an array of at most 20 vessels'});return res.json({ok:true,accepted:fleet.length,receivedAt:new Date().toISOString()})});
export default app;