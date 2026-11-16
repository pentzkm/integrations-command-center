const http=require('http'),fs=require('fs'),path=require('path');
const PORT=process.env.PORT||4173;
const partners=['Atlas Scheduling','Beacon Workforce','Cedar Clinical','Delta Connect','Evergreen Health','Frontier Staffing','Granite Systems','Harbor Health','Indigo Network'];
const statuses=['Active','Active','Active','Active','Pipeline','Pipeline','Pipeline','Pipeline','Pipeline'];
const clients=['North Valley Medical','Summit Regional','Clearwater Hospital','Lakeside Health','Pioneer Medical','Westbrook Acute','Riverbend Hospital','Oakridge Medical','Prairie Health','MetroCare'];
let seed=4627;const rand=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);const pick=a=>a[Math.floor(rand()*a.length)];
const records=[];const now=new Date('2026-11-01T00:00:00Z');
for(let i=0;i<1800;i++){
 const p=Math.floor(rand()*4),c=Math.floor(rand()*clients.length),month=Math.floor(rand()*10),day=1+Math.floor(rand()*27);
 const date=`2026-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
 const filled=rand()<[.81,.75,.88,.69][p];const canceled=filled&&rand()<[.08,.13,.06,.17][p];
 const hours=8+Math.floor(rand()*2)*4,rate=58+Math.floor(rand()*27);
 records.push({id:`SH-${String(i+1).padStart(5,'0')}`,partner:partners[p],client:clients[c],date,status:!filled?'Unfilled':canceled?'Canceled':'Completed',hours,rate,revenue:filled&&!canceled?hours*rate:0,timeToFillHours:filled?Math.round(4+rand()*70):null});
}
const partnerData=partners.map((name,i)=>({name,status:statuses[i],launchDate:i<4?['2026-02-12','2026-04-06','2026-06-20','2026-08-11'][i]:null,targetLaunch:i>=4?['2026-12-15','2027-01-20','2027-02-10','2027-03-15','2027-04-01'][i-4]:null,progress:i<4?100:[72,55,41,26,12][i-4],adoption:i<4?[79,63,86,54][i]:null,owner:['Integration Services','Product','Partner Success'][i%3]}));
const json=(res,obj)=>{res.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});res.end(JSON.stringify(obj))};
const csv=(rows)=>{let keys=Object.keys(rows[0]||{});return [keys.join(','),...rows.map(r=>keys.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(','))].join('\n')};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/records')return json(res,records);
 if(url.pathname==='/api/partners')return json(res,partnerData);
 if(url.pathname==='/api/meta')return json(res,{synthetic:true,generated:'2026-11-16',definition:'Revenue is completed-shift gross marketplace value, not recognized company revenue. All figures are fictional.',northStarTarget:30});
 if(url.pathname==='/api/export/shifts.csv'||url.pathname==='/api/export/partners.csv'){
  const data=url.pathname.includes('shifts')?records:partnerData;res.writeHead(200,{'Content-Type':'text/csv','Content-Disposition':`attachment; filename="${url.pathname.includes('shifts')?'synthetic_shifts':'synthetic_partners'}.csv"`});return res.end(csv(data));
 }
 const file=url.pathname==='/'?'index.html':url.pathname.slice(1);if(!['index.html','app.js','styles.css'].includes(file)){res.writeHead(404);return res.end('Not found')}
 fs.readFile(path.join(__dirname,file),(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html'});res.end(data)});
}).listen(PORT,()=>console.log(`Command Center running at http://localhost:${PORT}`));
