const barns=[
  ['Spirit','✦',78,'up'],['Mind','◉',54,'down'],['Character','◇',83,'up'],
  ['Body','♥',46,'down'],['Time','⌛',39,'down'],['Discipline','✓',51,'stable'],
  ['Money','$',67,'up'],['Knowledge','⌁',73,'stable'],['Relationships','♧',62,'stable'],
  ['Work','▦',48,'down'],['Leadership','♙',57,'stable'],['Mission','↗',81,'up']
];
const grid=document.querySelector('#barnGrid');
for(const [name,icon,score,trend] of barns){
  const card=document.createElement('article'); card.tabIndex=0;
  card.className=`barn ${score===39?'alert':''}`;
  card.innerHTML=`<div class="barn-top"><span class="barn-icon">${icon}</span><span class="trend ${trend}">${trend==='up'?'↑':trend==='down'?'↓':'—'} ${trend==='stable'?'steady':trend}</span></div><div class="barn-name">${name}</div><div class="barn-score">${score}<small>%</small></div>`;
  card.addEventListener('click',()=>showToast(`${name} Barn: ${score}% capacity. ${trend==='down'?'This barn needs deliberate attention.':trend==='up'?'Your current rhythm is creating expansion.':'Capacity is holding steady.'}`));
  grid.appendChild(card);
}
const overall=document.createElement('article'); overall.tabIndex=0; overall.className='barn enlargement';
overall.innerHTML='<div><div class="barn-name">✦ Enlargement Barn</div><div class="barn-score">61<small>% overall readiness</small></div></div><span class="trend">↑ growing</span>';
overall.addEventListener('click',()=>showToast('Overall readiness is 61%. Time and Work are the present constraints on enlargement.'));
grid.appendChild(overall);

const toast=document.querySelector('.toast'); let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)}
document.querySelectorAll('.task input').forEach(input=>input.addEventListener('change',()=>{
  input.closest('.task').classList.toggle('done',input.checked);
  const complete=document.querySelectorAll('.task input:checked').length;
  document.querySelector('#taskCount').textContent=`${complete} / 3`;
  if(complete===3)showToast('Daily rhythm complete. You made room for greater capacity today.');
}));
document.querySelector('#focusButton').addEventListener('click',()=>showToast('Today’s focus: protect 60 minutes for the work that carries your mission.'));
document.querySelector('#strengthenButton').addEventListener('click',()=>{document.querySelector('#today').scrollIntoView({behavior:'smooth'});showToast('Time Barn focus added to today’s rhythm.');});
document.querySelector('.menu').addEventListener('click',()=>document.querySelector('.sidebar').classList.toggle('open'));
document.addEventListener('click',e=>{if(innerWidth<760&&!e.target.closest('.sidebar')&&!e.target.closest('.menu'))document.querySelector('.sidebar').classList.remove('open')});
document.querySelectorAll('.period-switch button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.period-switch button').forEach(item=>item.classList.remove('selected'));
  button.classList.add('selected');
  showToast(`${button.textContent} capacity view selected.`);
}));

// Expose BARNS' primary action to browsers that support the WebMCP proposal.
const context=document.modelContext;
if(context?.registerTool){
  const lifecycle=new AbortController();
  Promise.resolve(context.registerTool({
    name:'complete_daily_enlargement',
    title:'Complete a daily enlargement',
    description:'Mark one of today’s three visible enlargement practices complete.',
    inputSchema:{type:'object',properties:{taskNumber:{type:'integer',minimum:1,maximum:3}},required:['taskNumber'],additionalProperties:false},
    annotations:{readOnlyHint:false,untrustedContentHint:false},
    execute(input){
      if(!input||!Number.isInteger(input.taskNumber)||input.taskNumber<1||input.taskNumber>3)throw new Error('taskNumber must be an integer from 1 to 3');
      const inputs=[...document.querySelectorAll('.task input')];
      const selected=inputs[input.taskNumber-1];
      selected.checked=true; selected.dispatchEvent(new Event('change'));
      return {taskNumber:input.taskNumber,status:'complete',completedToday:inputs.filter(item=>item.checked).length};
    }
  },{signal:lifecycle.signal})).catch(()=>{});
}
