import express from 'express';
const app=express();
app.use(express.json({limit:'1mb'}));
// Vercel rewrite forwards /api/:path* as /api?route=:path*.
app.use((req,_res,next)=>{if(req.path==='/api'&&typeof req.query.route==='string')req.url='/api/'+req.query.route;next();});
const seed=[
{id:'v1',name:'AURORA',call:'VSL-01',progress:28,speed:78,fuel:82,temp:71,hull:96,route:'PRIMARY',status:'IN TRANSIT'},
{id:'v2',name:'PIONEER',call:'VSL-02',progress:51,speed:69,fuel:66,temp:84,hull:88,route:'PRIMARY',status:'IN TRANSIT'},
{id:'v3',name:'WAYFARER',call:'VSL-03',progress:73,speed:70,fuel:74,temp:79,hull:93,route:'PRIMARY',status:'IN TRANSIT'}
];
let fleet=seed.map(v=>({...v}));
const clone=()=>fleet.map(v=>({...v}));
app.get('/api/health',(_req,res)=>res.set('Cache-Control','no-store').json({status:'ok',service:'star-transport-express-api',version:'1.1.0',timestamp:new Date().toISOString()}));
app.get('/api/fleet',(_req,res)=>res.set('Cache-Control','no-store').json({fleet:clone(),count:fleet.length,source:'in-memory'}));
app.post('/api/fleet',(req,res)=>{
 const incoming=req.body?.fleet;
 if(!Array.isArray(incoming)||incoming.length<1||incoming.length>20)return res.status(400).json({error:'INVALID_FLEET',message:'fleet must be an array containing 1 to 20 vessels'});
 const required=['id','name','progress','speed','fuel','temp','hull','route','status'];
 for(let i=0;i<incoming.length;i++){
  const v=incoming[i];
  if(!v||required.some(k=>v[k]===undefined)||!['PRIMARY','ECHO'].includes(v.route)||![v.progress,v.speed,v.fuel,v.temp,v.hull].every(n=>Number.isFinite(Number(n))))
   return res.status(422).json({error:'INVALID_VESSEL',message:'Each vessel requires id, name, numeric telemetry, route and status',index:i});
 }
 fleet=incoming.map(v=>({...v}));
 return res.status(200).json({ok:true,count:fleet.length,fleet:clone(),updatedAt:new Date().toISOString(),source:'in-memory'});
});
app.use((_req,res)=>res.status(404).json({error:'NOT_FOUND',message:'Route not found',available:['GET /api/health','GET /api/fleet','POST /api/fleet']}));
export default app;